import type { ImageMetadata } from 'astro'

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/public/images/**/*.{jpg,jpeg,png,webp}'
)

/** Photos from the Todapata API come as absolute URLs; the site's own as `/images/...`. */
export const isRemoteImage = (src: string) => /^https?:\/\//.test(src)

/** The site's own image (`/images/...` in `public/`), optimized by `astro:assets`. */
export async function getLocalImage(src: string): Promise<ImageMetadata> {
  const loadImage = images[`/public${src}`]
  if (!loadImage) throw new Error(`Imagem local não encontrada: ${src}`)

  return (await loadImage()).default
}
