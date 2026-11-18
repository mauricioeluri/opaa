import { spawn } from 'node:child_process'
import { parseEnv } from 'node:util'
import { existsSync, readFileSync } from 'node:fs'

/**
 * Site dev server reading the content from a Todapata running on this
 * computer, whatever `.env` says (it may point to the real API).
 *
 * The values come from `.env.todapata-local`, which the Todapata project
 * writes (in its folder: `pnpm site:local-key`). Values given to the process
 * win over `.env`, so `.env` is never touched.
 *
 * Usage: pnpm dev:local  (with `pnpm dev:local` running in the Todapata too).
 */
const file = '.env.todapata-local'

if (!existsSync(file)) {
  console.error(
    [
      `Faltou o arquivo ${file}.`,
      'Na pasta da Todapata, com o Supabase local no ar, rode: pnpm site:local-key',
      '(ele cria uma ONG de teste e a chave, e grava este arquivo aqui).',
    ].join('\n')
  )
  process.exit(1)
}

const values = parseEnv(readFileSync(file, 'utf-8'))

console.log(`Conteúdo vindo de ${values.TODAPATA_API_URL} (Todapata local)`)

spawn('pnpm', ['exec', 'astro', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, ...values },
})
