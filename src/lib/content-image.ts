import { inferRemoteSize } from 'astro:assets'
import type { ImageMetadata } from 'astro'

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/public/images/**/*.{jpg,jpeg,png,webp}'
)

export interface ContentImageSource {
  /** Local image metadata, or the absolute URL of a remote one. */
  src: ImageMetadata | string
  width: number
  height: number
}

// Remote sizes are read once per URL: the same photo shows on several pages.
const remoteSizes = new Map<string, Promise<ContentImageSource>>()

/**
 * Resolves a content image for `astro:assets`. Local files (`/images/...`) come from `public/`; absolute URLs (the Todapata API) are
 * measured from the file itself, because the API does not send dimensions.
 */
export async function getContentImage(src: string): Promise<ContentImageSource> {
  if (/^https?:\/\//.test(src)) {
    let size = remoteSizes.get(src)

    if (!size) {
      size = inferRemoteSize(src).then(({ width, height }) => ({
        src,
        width,
        height,
      }))
      remoteSizes.set(src, size)
    }

    return size
  }

  const loadImage = images[`/public${src}`]
  if (!loadImage) throw new Error(`Imagem local não encontrada: ${src}`)

  const metadata = (await loadImage()).default

  return { src: metadata, width: metadata.width, height: metadata.height }
}
