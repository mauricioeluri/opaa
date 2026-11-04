# OPAA Alegrete

Site da ONG para apresentar seu trabalho, divulgar animais para adoção e
facilitar doações. Usa **Astro, TypeScript, CSS e pnpm**.

Os dados são consultados por `src/lib/api.ts`. Por enquanto, esse módulo lê
`src/data/api.json`, que simula uma API. O site é gerado como HTML estático:
alterações nos dados exigem novo build e publicação.

## Rodar localmente

Instale Node.js `>=22.23.4` e pnpm. Na pasta do projeto:

```sh
pnpm install
pnpm dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:4321`.
Não é necessário configurar `.env` para desenvolver. No VS Code, instale as
extensões recomendadas pelo projeto.

## Onde editar

| Arquivo ou pasta               | Conteúdo                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `src/pages/index.astro`        | Seções da landing page.                                           |
| `src/pages/animais.astro`      | Lista de animais disponíveis e filtros locais.                    |
| `src/components/`              | Partes da página e suas interações.                               |
| `src/layouts/SiteLayout.astro` | Estrutura comum, topbar, footer e SEO.                            |
| `src/data/api.json`            | Contatos, Pix, animais e demais conteúdos.                        |
| `src/lib/api.ts`               | Leitura dos dados.                                                |
| `src/config/site.ts`           | Informações do site, redes sociais, SEO e slides iniciais.        |
| `src/styles/global.css`        | Cores, fontes, foco de teclado e classe `.button` compartilhados. |
| `public/`                      | Fotos, logos e PDF do kit de marca.                               |

Um arquivo `.astro` reúne HTML, CSS e preparação dos dados entre `---`.
Arquivos de `public/` são acessados sem esse prefixo: `/animals/foto.webp`.
As fotos do slider inicial são `public/landing-page/slide-1.jpg` e `slide-2.jpg`.
Para trocá-las, substitua os arquivos mantendo os nomes. Confira também se as
legendas e os textos alternativos em `heroSlides`, no `src/config/site.ts`,
continuam corretos. Cada slide reúne `src` (imagem), `caption` (legenda) e `alt`
(descrição acessível).

## Dados dos animais

- A landing page mostra **até dois disponíveis**, do mais recente para o mais
  antigo por `published_at`. Sem disponíveis, a seção não aparece.
- `/animais/` mostra todos os disponíveis, com filtros no navegador.
  Os cards e sliders são compartilhados com a landing page.
- Não há `title` nos animais. O site apresenta nome (quando houver), sexo e faixa
  etária, como `Mel · Fêmea · Adulto`. A descrição fica limitada a três linhas
  apenas na prévia; o site não calcula idade.
- `images` recebe de uma a três fotos. Sem foto, a fonte deve enviar
  `["/animals/default.webp"]`; o site não escolhe a imagem padrão.
- Sem nome, use `name: null`, em vez de uma string vazia. O contato identifica
  o animal por `public_id`.
  Use `null` para informações desconhecidas e fotos reais, sem filtros de IA.
- `ageGroup` vem pronto: `puppy` (filhote), `adult` (adulto) ou `senior` (idoso).
  `age` recebe um texto, como `2 anos`, ou `null` quando desconhecida.
  `isAgeApproximate` é `true` para uma estimativa e `false` nos demais casos.
  Manter os mesmos campos em todos os registros; o TypeScript infere os tipos
  do JSON. O site não deduz a faixa etária da idade.
- `type` informa o tipo: `dog` (cães), `cat` (gatos) ou `other` (outros).

Consulte os registros existentes no JSON como modelo. As datas de publicação dos
animais e os exemplos de publicação e produto ainda são demonstrativos.
Telefone, e-mail e Pix ficam em `organization` no JSON. Os perfis das redes sociais
ficam em `src/config/site.ts`, compartilhados pelo footer e pelo SEO.

## Comandos

| Comando          | Finalidade                                             |
| ---------------- | ------------------------------------------------------ |
| `pnpm dev`       | Desenvolvimento local.                                 |
| `pnpm check-all` | Lint com correções, formatação e verificação de tipos. |
| `pnpm format`    | Apenas formatação.                                     |
| `pnpm lint`      | Apenas ESLint com correções.                           |
| `pnpm build`     | Gerar o site em `dist/`.                               |
| `pnpm preview`   | Conferir o build localmente.                           |

Antes de entregar mudanças, rode `pnpm check-all`, revise as correções e confira
o resultado também no celular. Essas orientações são para a equipe; agentes
seguem os limites do [AGENTS.md](AGENTS.md).

## Configuração e publicação

O GitHub está integrado à Cloudflare: enviar alterações à `main` pode publicar
automaticamente o site. Combine o envio com a equipe.

As configurações de SEO estão em `.env.example`. Para liberar a indexação,
configure o domínio definitivo e as variáveis na Cloudflare conforme
[docs/SEO.md](docs/SEO.md). Não envie `.env` com credenciais ao repositório.
Alguns links ainda usam `#` enquanto as páginas internas não são implementadas.

## Combinados da equipe

- Código e comentários em inglês; interface e documentação em português.
- Rotas públicas e âncoras de navegação em português; campos técnicos da API em inglês.
- Manter responsividade, acessibilidade e soluções simples. Não há banco de
  dados, checkout ou painel administrativo neste projeto.
- Seguir o [kit de marca](docs/brand-guide.md) e reutilizar as variáveis de cor.
- Usar pnpm, preservar o lockfile e não editar pastas geradas ou dependências.
- Usar somente informações e contatos confirmados pela ONG.
