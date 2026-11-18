import { defineConfig, envField } from 'astro/config'
import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'

if (existsSync('.env')) loadEnvFile('.env')
const site = process.env.SITE_URL || undefined
if (
  site &&
  (new URL(site).protocol !== 'https:' || new URL(site).pathname !== '/')
) {
  throw new Error(
    'SITE_URL deve ser a origem HTTPS do domínio definitivo, sem subdiretórios.'
  )
}

// Origin that serves the API's images (Supabase Storage). When set, Astro also
// optimizes those remote images; otherwise they are used as they come.
const mediaOrigin = process.env.TODAPATA_MEDIA_ORIGIN
const remotePatterns = []
if (mediaOrigin) {
  const { protocol, hostname, port } = new URL(mediaOrigin)
  remotePatterns.push({
    protocol: protocol.replace(':', ''),
    hostname,
    ...(port ? { port } : {}),
  })
}

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'ignore',
  image: { remotePatterns },
  // Server-only (build time): never reach the browser bundles.
  env: {
    schema: {
      TODAPATA_API_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      TODAPATA_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
})
