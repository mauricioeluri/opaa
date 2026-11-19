// Single seam between the site and its content source. Pages and components read
// content only through the `ContentSource` the middleware puts in `Astro.locals`.
//
// Source: the Todapata public API (`GET {base}/api/v1/...` with
// `Authorization: Bearer <key>`; lists answer `{ data, pagination }`, items
// `{ data }`). Every page view reads it on the server, so what the NGO changes
// in the panel shows on the next visit. The key never reaches the browser.
import { TODAPATA_API_KEY, TODAPATA_API_URL } from 'astro:env/server'

export type AnimalType = 'dog' | 'cat' | 'other'
export type AnimalAgeGroup = 'puppy' | 'adult' | 'senior'
export type PostCategory = 'community' | 'campaign' | 'transparency' | 'care'

/**
 * A photo. The API's photos are absolute URLs with their size (at most 1600 px
 * on the longest side, WebP), so the page reserves their space before they
 * load; the site's own are `/images/...` paths, measured at build time.
 */
export interface Photo {
  src: string
  width?: number
  height?: number
}

interface Publication {
  /** Pinned records come first; each group is ordered by `published_at` desc. */
  isPinned: boolean
  /** ISO 8601 date and time with offset, e.g. `2026-11-04T14:30:00-03:00`. */
  published_at: string
}

export interface Animal extends Publication {
  public_id: string
  name: string | null
  ageGroup: AnimalAgeGroup
  age: string | null
  isAgeApproximate: boolean
  isMale: boolean
  neutered: boolean
  vaccinations: string | null
  description: string
  /** `true` means "not adopted yet" (available for adoption), not stock. */
  available: boolean
  hasDisability?: boolean
  /** Never empty: a placeholder stands in when the animal has no photo. */
  images: Photo[]
  type: AnimalType
}

export interface Post extends Publication {
  slug: string
  title: string
  body: string
  category: PostCategory
  image?: Photo
}

export interface Notice extends Publication {
  title: string
  body: string
}

export interface Story extends Publication {
  name: string
  description: string
  afterImage: Photo
  beforeImage: Photo | null
}

export interface ProductVariant {
  options: Partial<Record<string, string>>
  /** `0` is sold out and `null` means "ask the NGO". */
  stock_quantity: number | null
  /** Cents; overrides the product price. */
  price?: number
  /** Limits the gallery to these `Product.images` ids. */
  image_ids?: string[]
}

export interface Product {
  public_id: string
  name: string
  description: string
  active: boolean
  /** `id` is what `ProductVariant.image_ids` refer to. */
  images: ({ id: string } & Photo)[]
  /** Default unit price in cents. */
  price: number
  variants: ProductVariant[]
}

/** Maximum items shown on the home page for each kind of content. */
export const homeLimits = { animals: 2, posts: 3, notices: 6, stories: 6 }

/**
 * The content could not be read (API down or slow, key revoked, unexpected
 * answer). Pages let it propagate: the visitor gets the "come back soon" page.
 */
export class ContentUnavailableError extends Error {
  override name = 'ContentUnavailableError'
}

/** Content of the NGO, read from the API for one page view. */
export interface ContentSource {
  getAllAnimals(): Promise<Animal[]>
  getAvailableAnimals(): Promise<Animal[]>
  /** An animal up for adoption, or `null` (unknown or already adopted). */
  getAvailableAnimal(publicId: string): Promise<Animal | null>
  getPosts(): Promise<Post[]>
  getPost(slug: string): Promise<Post | null>
  getNotices(): Promise<Notice[]>
  getStories(): Promise<Story[]>
  getProducts(): Promise<Product[]>
  /** An active product, or `null`. */
  getProduct(publicId: string): Promise<Product | null>
}

/** The API's maximum page size: lists come in as few requests as possible. */
const PAGE_SIZE = 100
/** A visitor is waiting: give up instead of hanging the page. */
const REQUEST_TIMEOUT_MS = 8_000
const DEFAULT_ANIMAL_IMAGE: Photo = { src: '/images/animal-sem-foto.webp' }

/** How the API sends a photo: the size is `null` for old files not normalized yet. */
interface ApiImage {
  src: string
  width: number | null
  height: number | null
}

type ApiAnimal = Omit<Animal, 'images'> & { images: ApiImage[] }
type ApiPost = Omit<Post, 'image'> & { image: ApiImage | null }
type ApiStory = Omit<Story, 'afterImage' | 'beforeImage'> & {
  afterImage: ApiImage
  beforeImage: ApiImage | null
}
type ApiProduct = Omit<Product, 'images'> & {
  images: ({ id: string } & ApiImage)[]
}

interface ListEnvelope<T> {
  data: T[]
  pagination: { totalPages: number }
}

function isListEnvelope<T>(body: unknown): body is ListEnvelope<T> {
  const envelope = body as Partial<ListEnvelope<T>> | null
  return (
    Array.isArray(envelope?.data) &&
    typeof envelope.pagination?.totalPages === 'number'
  )
}

function isItemEnvelope<T>(body: unknown): body is { data: T } {
  const envelope = body as { data?: unknown } | null
  return typeof envelope?.data === 'object' && envelope.data !== null
}

const toPhoto = ({ src, width, height }: ApiImage): Photo => ({
  src,
  width: width ?? undefined,
  height: height ?? undefined,
})

// The API sends no photos for an animal without any; the pages need one image.
const toAnimal = (animal: ApiAnimal): Animal => ({
  ...animal,
  images: animal.images.length
    ? animal.images.map(toPhoto)
    : [DEFAULT_ANIMAL_IMAGE],
})

const toPost = (post: ApiPost): Post => ({
  ...post,
  image: post.image ? toPhoto(post.image) : undefined,
})

const toStory = (story: ApiStory): Story => ({
  ...story,
  afterImage: toPhoto(story.afterImage),
  beforeImage: story.beforeImage && toPhoto(story.beforeImage),
})

const toProduct = (product: ApiProduct): Product => ({
  ...product,
  images: product.images.map((image) => ({ id: image.id, ...toPhoto(image) })),
})

function comparePublications(a: Publication, b: Publication) {
  return (
    Number(b.isPinned) - Number(a.isPinned) ||
    Date.parse(b.published_at) - Date.parse(a.published_at)
  )
}

const sorted = <T extends Publication>(items: T[]) =>
  [...items].sort(comparePublications)

function describeStatus(path: string, status: number) {
  if (status === 401) {
    return `A chave de API da Todapata é inválida ou foi revogada (TODAPATA_API_KEY). Falha em ${path}.`
  }

  if (status === 403) {
    return `A Todapata recusou o acesso a ${path} (a chave não permite esta origem).`
  }

  return `A API da Todapata respondeu ${status} em ${path}.`
}

/**
 * Talks to the API: authentication, timeout and error translation. `null`
 * means 404 (an item that does not exist for this NGO).
 */
function createApiClient(url: string | undefined, key: string | undefined) {
  const base = url?.replace(/\/+$/, '')

  return async function get(path: string): Promise<unknown> {
    if (!base || !key) {
      throw new ContentUnavailableError(
        'Defina TODAPATA_API_URL e TODAPATA_API_KEY (veja .env.example). O site lê o conteúdo da API da Todapata.'
      )
    }

    let response: Response

    try {
      response = await fetch(`${base}/api/v1${path}`, {
        headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
    } catch (error) {
      throw new ContentUnavailableError(
        `Não foi possível acessar a API da Todapata em ${base} (${path}).`,
        { cause: error }
      )
    }

    if (response.status === 404) return null
    if (!response.ok) {
      throw new ContentUnavailableError(describeStatus(path, response.status))
    }

    try {
      return await response.json()
    } catch (error) {
      throw new ContentUnavailableError(
        `A API da Todapata enviou uma resposta ilegível em ${path}.`,
        { cause: error }
      )
    }
  }
}

/**
 * The content source for one page view. Each list is fetched at most once per
 * instance, however many components ask for it, and never shared between
 * visits: the middleware creates a new one per request.
 */
export function createContentSource(): ContentSource {
  const get = createApiClient(TODAPATA_API_URL, TODAPATA_API_KEY)
  const lists = new Map<string, Promise<unknown[]>>()

  async function fetchPage<T>(kind: string, page: number) {
    const path = `/${kind}?limit=${PAGE_SIZE}&page=${page}`
    const body = await get(path)

    if (!isListEnvelope<T>(body)) {
      throw new ContentUnavailableError(
        `Resposta inesperada da API da Todapata em ${path}.`
      )
    }

    return body
  }

  /** Every item of a list: the first page says how many more to fetch, in parallel. */
  function list<T>(kind: string): Promise<T[]> {
    let items = lists.get(kind) as Promise<T[]> | undefined

    if (!items) {
      items = fetchPage<T>(kind, 1).then(async (first) => {
        const rest = await Promise.all(
          Array.from({ length: first.pagination.totalPages - 1 }, (_, index) =>
            fetchPage<T>(kind, index + 2)
          )
        )
        return [first, ...rest].flatMap((page) => page.data)
      })
      lists.set(kind, items)
    }

    return items
  }

  async function item<T>(path: string): Promise<T | null> {
    const body = await get(path)
    if (body === null) return null

    if (!isItemEnvelope<T>(body)) {
      throw new ContentUnavailableError(
        `Resposta inesperada da API da Todapata em ${path}.`
      )
    }

    return body.data
  }

  const getAllAnimals = async () =>
    sorted((await list<ApiAnimal>('animals')).map(toAnimal))

  return {
    getAllAnimals,
    getAvailableAnimals: async () =>
      (await getAllAnimals()).filter((animal) => animal.available),
    getAvailableAnimal: async (publicId) => {
      const animal = await item<ApiAnimal>(
        `/animals/${encodeURIComponent(publicId)}`
      )
      return animal?.available ? toAnimal(animal) : null
    },
    getPosts: async () => sorted((await list<ApiPost>('posts')).map(toPost)),
    getPost: async (slug) => {
      const post = await item<ApiPost>(`/posts/${encodeURIComponent(slug)}`)
      return post && toPost(post)
    },
    getNotices: async () => sorted(await list<Notice>('notices')),
    getStories: async () =>
      sorted((await list<ApiStory>('stories')).map(toStory)),
    getProducts: async () =>
      (await list<ApiProduct>('products'))
        .filter((product) => product.active)
        .map(toProduct),
    getProduct: async (publicId) => {
      const product = await item<ApiProduct>(
        `/products/${encodeURIComponent(publicId)}`
      )
      return product?.active ? toProduct(product) : null
    },
  }
}
