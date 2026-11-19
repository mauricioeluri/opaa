import { defineMiddleware } from 'astro:middleware'
import { ContentUnavailableError, createContentSource } from './lib/api'

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next()

  // One content source per page view: lists read for this visit are shared by
  // its components and never by other visits.
  context.locals.content = createContentSource()

  try {
    return await next()
  } catch (error) {
    if (!(error instanceof ContentUnavailableError)) throw error

    // Routes load their data before rendering, so nothing was sent yet: answer
    // with the "come back soon" page, as a 503 (temporary: browsers and
    // crawlers come back instead of dropping the page), not a broken page.
    console.error(error)
    context.locals.contentError = error
    const page = await context.rewrite('/500')
    const headers = new Headers(page.headers)
    headers.set('Retry-After', '60')
    headers.set('Cache-Control', 'no-store')
    return new Response(page.body, { status: 503, headers })
  }
})
