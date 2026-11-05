import data from '../data/api.json'

export async function getAllAnimals() {
  return data.animals
}

export async function getStories() {
  return [...data.stories].sort(
    (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)
  )
}

export async function getAvailableAnimals() {
  return (await getAllAnimals())
    .filter((animal) => animal.available)
    .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
}

export async function getNotices() {
  return [...data.notices].sort(
    (a, b) =>
      Number(b.isPinned) - Number(a.isPinned) ||
      Date.parse(b.published_at) - Date.parse(a.published_at)
  )
}
