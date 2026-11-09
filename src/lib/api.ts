import data from '../data/api.json'

type PublishedItem = { isPinned: boolean; published_at: string }
type Post = Omit<(typeof data.posts)[number], 'image'> & { image?: string }
type ProductVariant = {
  options: Partial<Record<string, string>>
  stock_quantity: number | null
  price?: number
  image_ids?: string[]
}
type Product = Omit<(typeof data.products)[number], 'variants'> & {
  variants: ProductVariant[]
}

function comparePublications(a: PublishedItem, b: PublishedItem) {
  return (
    Number(b.isPinned) - Number(a.isPinned) ||
    Date.parse(b.published_at) - Date.parse(a.published_at)
  )
}

export async function getAllAnimals() {
  return [...data.animals].sort(comparePublications)
}

export async function getProducts(): Promise<Product[]> {
  return data.products.filter((product) => product.active)
}

export async function getStories() {
  return [...data.stories].sort(comparePublications)
}

export async function getPosts(): Promise<Post[]> {
  return [...data.posts].sort(comparePublications)
}

export async function getAvailableAnimals() {
  return (await getAllAnimals()).filter((animal) => animal.available)
}

export async function getNotices() {
  return [...data.notices].sort(comparePublications)
}
