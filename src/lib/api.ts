import data from '../data/api.json'

export async function getOrganization() {
  return data.organization
}

export async function getAllAnimals() {
  return data.animals
}
