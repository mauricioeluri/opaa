import data from '../data/api.json'

type PublishedItem = { isPinned: boolean; published_at: string }

function comparePublications(a: PublishedItem, b: PublishedItem) {
  return (
    Number(b.isPinned) - Number(a.isPinned) ||
    Date.parse(b.published_at) - Date.parse(a.published_at)
  )
}

export async function getAllAnimals() {
  return [...data.animals].sort(comparePublications)
}

export async function getProducts() {
  return data.products.filter((product) => product.active)
}

export async function getStories() {
  return [...data.stories].sort(comparePublications)
}

export async function getPosts() {
  return [...data.posts].sort(comparePublications)
}

export async function getAvailableAnimals() {
  return (await getAllAnimals()).filter((animal) => animal.available)
}

export async function getNotices() {
  return [...data.notices].sort(comparePublications)
}
