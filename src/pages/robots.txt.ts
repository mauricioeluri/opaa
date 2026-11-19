import type { APIRoute } from 'astro'
import { indexingEnabled } from '../config/seo'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
  if (indexingEnabled && !site)
    throw new Error('SITE_URL é obrigatório para indexação.')
  // Allow crawling so search engines can read the noindex directive in HTML.
  const sitemap =
    indexingEnabled && site
      ? `Sitemap: ${new URL('/sitemap.xml', site).href}\n`
      : ''
  return new Response(`User-agent: *\nAllow: /\n${sitemap}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
