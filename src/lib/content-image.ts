import type { ImageMetadata } from 'astro'

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/public/{api,images}/**/*.{jpg,jpeg,png,webp}'
)

export async function getContentImage(src: string) {
  const loadImage = images[`/public${src}`]
  if (!loadImage) throw new Error(`Imagem local não encontrada: ${src}`)
  return (await loadImage()).default
}
