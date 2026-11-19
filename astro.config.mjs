import cloudflare from '@astrojs/cloudflare'
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

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'ignore',
  // Pages are rendered on each visit by a Cloudflare Worker, reading the
  // Todapata API (see src/lib/api.ts). Only pages without content are prerendered.
  output: 'server',
  // The site's own images (slides, placeholder) are resized and converted by
  // the Worker's Cloudflare Images binding, once per size (then cached). The
  // API's photos skip it: the Todapata API stores them ready for the web.
  adapter: cloudflare({ imageService: 'cloudflare-binding' }),
  // No sessions: the site has no login and stores nothing per visitor.
  session: false,
  env: {
    schema: {
      // Runtime secrets of the Worker: never reach the browser bundles.
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
