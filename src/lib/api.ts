import data from '../data/api.json'

export async function getOrganization() {
  return data.organization
}

export async function getAllAnimals() {
  return data.animals
}

export async function getSingleAnimal(publicId: string) {
  return data.animals.find((animal) => animal.public_id === publicId) ?? null
}

export async function getAllPosts() {
  return data.posts
}

export async function getSinglePost(publicId: string) {
  return data.posts.find((post) => post.public_id === publicId) ?? null
}

export async function getAllProducts() {
  return data.products
}

export async function getSingleProduct(publicId: string) {
  return data.products.find((product) => product.public_id === publicId) ?? null
}
