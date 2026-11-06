import type { APIRoute } from 'astro'
import { indexingEnabled, indexablePaths } from '../config/seo'
import { getAvailableAnimals, getPosts, getProducts } from '../lib/api'

export const GET: APIRoute = async ({ site }) => {
  if (indexingEnabled && !site)
    throw new Error('SITE_URL é obrigatório para indexação.')
  const escape = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  const urls =
    indexingEnabled && site
      ? [
          ...indexablePaths,
          ...(await getAvailableAnimals()).map(
            (animal) => `/animais/${animal.public_id}/`
          ),
          ...(await getProducts()).map(
            (product) => `/loja/${product.public_id}/`
          ),
          ...(await getPosts()).map((post) => `/publicacoes/${post.slug}/`),
        ]
          .map(
            (path) =>
              `<url><loc>${escape(new URL(path, site).href)}</loc></url>`
          )
          .join('')
      : ''
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  )
}
