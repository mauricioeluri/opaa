import { inferRemoteSize } from 'astro:assets'
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

/**
 * Width and height of any content image. The API sends no dimensions, so a
 * remote photo is measured by reading the start of the file: use it only when
 * the layout depends on the orientation of one image, never for lists.
 */
export async function getImageSize(
  src: string
): Promise<{ width: number; height: number }> {
  if (isRemoteImage(src)) return inferRemoteSize(src)

  const { width, height } = await getLocalImage(src)
  return { width, height }
}
