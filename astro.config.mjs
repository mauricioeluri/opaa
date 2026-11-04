import { defineConfig } from 'astro/config'
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
export default defineConfig({ site, trailingSlash: 'ignore' })
