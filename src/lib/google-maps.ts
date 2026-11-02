export function getGoogleMapsUrl(address: string) {
  const url = new URL('https://www.google.com/maps/search/')
  url.searchParams.set('api', '1')
  url.searchParams.set('query', address)

  return url.href
}
