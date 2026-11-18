// Single seam between the site and its content source. Pages and components read
// content only through the helpers exported here, never from the source directly.
//
// Source: the Todapata public API (`GET {base}/api/v1/animals|posts|notices|
// stories|products` with `Authorization: Bearer <key>` and `{ data, pagination }`
// envelopes). `TODAPATA_API_URL` and `TODAPATA_API_KEY` are required at build time.
import { TODAPATA_API_KEY, TODAPATA_API_URL } from 'astro:env/server'

export type AnimalType = 'dog' | 'cat' | 'other'
export type AnimalAgeGroup = 'puppy' | 'adult' | 'senior'
export type PostCategory = 'community' | 'campaign' | 'transparency' | 'care'

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
  /** New optional key from the Todapata API. The site does not use it yet. */
  hasDisability?: boolean
  /** Never empty: the loader adds a placeholder when the animal has no photo. */
  images: string[]
  type: AnimalType
}

export interface Post extends Publication {
  slug: string
  title: string
  body: string
  category: PostCategory
  image?: string
}

export interface Notice extends Publication {
  title: string
  body: string
}

export interface Story extends Publication {
  name: string
  description: string
  afterImage: string
  beforeImage: string | null
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
  images: { id: string; src: string }[]
  /** Default unit price in cents. */
  price: number
  variants: ProductVariant[]
}

interface Content {
  animals: Animal[]
  posts: Post[]
  notices: Notice[]
  stories: Story[]
  products: Product[]
}

/** Maximum items shown on the home page for each kind of content. */
export const homeLimits = { animals: 2, posts: 3, notices: 6, stories: 6 }

// Memoized so that the build reads the source once, not once per page. In dev the
// server lives for hours, so the copy expires and edits in the panel show up on reload.
const DEV_CACHE_MS = 2000
let content: Promise<Content> | undefined
let loadedAt = 0

const PAGE_SIZE = 100
const DEFAULT_ANIMAL_IMAGE = '/images/animal-sem-foto.webp'

function describeFailure(kind: string, status: number) {
  if (status === 401) {
    return `A chave de API da Todapata é inválida ou foi revogada (TODAPATA_API_KEY). Falha ao buscar ${kind}.`
  }

  return `A API da Todapata respondeu ${status} ao buscar ${kind}.`
}

/** Reads every page of one kind. Any failure stops the build: never publish a blank site. */
async function fetchAll<T>(
  base: string,
  key: string,
  kind: string
): Promise<T[]> {
  const items: T[] = []

  for (let page = 1, totalPages = 1; page <= totalPages; page++) {
    const url = `${base}/api/v1/${kind}?limit=${PAGE_SIZE}&page=${page}`
    let response: Response

    try {
      response = await fetch(url, {
        headers: { Authorization: `Bearer ${key}` },
      })
    } catch (error) {
      throw new Error(
        `Não foi possível acessar a API da Todapata em ${base}. Ela está no ar?`,
        { cause: error }
      )
    }

    if (!response.ok) throw new Error(describeFailure(kind, response.status))

    const body: unknown = await response.json()
    const envelope = body as {
      data?: unknown
      pagination?: { totalPages?: unknown }
    }

    if (
      !Array.isArray(envelope?.data) ||
      typeof envelope.pagination?.totalPages !== 'number'
    ) {
      throw new Error(
        `Resposta inesperada da API da Todapata ao buscar ${kind}.`
      )
    }

    items.push(...(envelope.data as T[]))
    totalPages = envelope.pagination.totalPages
  }

  return items
}

async function loadFromApi(base: string, key: string): Promise<Content> {
  const [animals, posts, notices, stories, products] = await Promise.all([
    fetchAll<Animal>(base, key, 'animals'),
    fetchAll<Post & { image: string | null }>(base, key, 'posts'),
    fetchAll<Notice>(base, key, 'notices'),
    fetchAll<Story>(base, key, 'stories'),
    fetchAll<Product>(base, key, 'products'),
  ])

  return {
    // The API sends no photos for an animal without any; the pages need one image.
    animals: animals.map((animal) => ({
      ...animal,
      images: animal.images.length ? animal.images : [DEFAULT_ANIMAL_IMAGE],
    })),
    posts: posts.map((post) => ({ ...post, image: post.image ?? undefined })),
    notices,
    stories,
    products,
  }
}

function loadContent() {
  if (!TODAPATA_API_URL || !TODAPATA_API_KEY) {
    throw new Error(
      'Defina TODAPATA_API_URL e TODAPATA_API_KEY (veja .env.example). O site lê o conteúdo da API da Todapata.'
    )
  }

  if (import.meta.env.DEV && Date.now() - loadedAt > DEV_CACHE_MS)
    content = undefined

  if (!content) {
    loadedAt = Date.now()
    content = loadFromApi(
      TODAPATA_API_URL.replace(/\/+$/, ''),
      TODAPATA_API_KEY
    )
  }

  return content
}

function comparePublications(a: Publication, b: Publication) {
  return (
    Number(b.isPinned) - Number(a.isPinned) ||
    Date.parse(b.published_at) - Date.parse(a.published_at)
  )
}

async function getSorted<K extends 'animals' | 'posts' | 'notices' | 'stories'>(
  kind: K
) {
  return [...(await loadContent())[kind]].sort(comparePublications)
}

export const getAllAnimals = () => getSorted('animals')
export const getPosts = () => getSorted('posts')
export const getNotices = () => getSorted('notices')
export const getStories = () => getSorted('stories')

export async function getAvailableAnimals() {
  return (await getAllAnimals()).filter((animal) => animal.available)
}

export async function getProducts() {
  return (await loadContent()).products.filter((product) => product.active)
}
