import type { getAllAnimals } from './api'

export const animalAgeGroups: Record<string, string> = {
  puppy: 'Filhote',
  adult: 'Adulto',
  senior: 'Idoso',
}

export function getAnimalLabel(
  animal: Pick<
    Awaited<ReturnType<typeof getAllAnimals>>[number],
    'name' | 'isMale' | 'ageGroup'
  >
) {
  const sex = animal.isMale ? 'Macho' : 'Fêmea'

  return [animal.name?.trim(), sex, animalAgeGroups[animal.ageGroup]]
    .filter(Boolean)
    .join(' · ')
}
