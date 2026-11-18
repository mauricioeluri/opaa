import type { Animal, AnimalAgeGroup } from './api'

export const animalAgeGroups: Record<AnimalAgeGroup, string> = {
  puppy: 'Filhote',
  adult: 'Adulto',
  senior: 'Idoso',
}

export function getAnimalLabel(
  animal: Pick<Animal, 'name' | 'isMale' | 'ageGroup'>
) {
  const sex = animal.isMale ? 'Macho' : 'Fêmea'

  return [animal.name?.trim(), sex, animalAgeGroups[animal.ageGroup]]
    .filter(Boolean)
    .join(' · ')
}
