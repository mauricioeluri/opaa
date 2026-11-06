// List only published pages eligible for search indexing.
export const indexablePaths = [
  '/',
  '/animais/',
  '/comunicados/',
  '/historias-felizes/',
  '/loja/',
]
export const indexingEnabled = import.meta.env.SITE_INDEXABLE === 'true'
