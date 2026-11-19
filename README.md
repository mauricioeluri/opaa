# OPAA Alegrete

Site da ONG para apresentar seu trabalho, divulgar animais para adoção e facilitar
doações. Usa **Astro** renderizando as páginas num **Cloudflare Worker**, **TypeScript**
para verificar o código, **CSS** para os estilos e **pnpm** para instalar dependências e
executar comandos.

O conteúdo (animais, histórias, comunicados, posts e produtos) vem da API pública da
[Todapata](https://github.com/mauricioeluri/todapata). A cada visita, o Worker lê a API no
servidor, com a chave da ONG, e entrega o HTML pronto: o que a ONG muda no painel aparece
na próxima visita, sem novo build. A chave nunca chega ao navegador. Não há banco, checkout
ou painel administrativo neste projeto.

**Como funciona:** `src/middleware.ts` cria, para cada visita, a fonte de conteúdo de
`src/lib/api.ts` (cliente da API com autenticação, tempo limite de 8 s e erros tipados). As
rotas em `src/pages/` buscam tudo de que precisam antes de renderizar e passam os dados aos
componentes por props. Se a API não responder, o visitante recebe a página "volte daqui a
pouco" com status 503 (nunca uma página pela metade); item inexistente responde 404.

## Rodar localmente

Instale Node.js `>=22.23.4` e pnpm. Na pasta do projeto:

```sh
pnpm install
```

O site precisa da API da Todapata, de duas formas:

- **API real (remota):** copie `.env.example` para `.env` e preencha `TODAPATA_API_URL` e
  `TODAPATA_API_KEY` (a chave da ONG, criada pelo administrador da Todapata). Depois rode
  `pnpm dev`.
- **Todapata no seu computador:** na pasta da Todapata, com o Supabase local no ar, rode
  `pnpm dev:local` e, uma vez, `pnpm site:local-key` (cria a ONG de teste e grava
  `.env.todapata-local` aqui). Neste projeto, rode `pnpm dev:local`. O `.env` não é alterado.

Abra o endereço mostrado no terminal, normalmente `http://localhost:4321`. O `pnpm dev`
roda as páginas no mesmo runtime do Cloudflare (workerd). Sem a configuração, ou com a API
fora do ar, as páginas mostram a tela de indisponibilidade com o motivo em letra miúda
(só em desenvolvimento).
No VS Code, instale as extensões recomendadas pelo projeto.

## Onde editar

| Arquivo ou pasta               | Conteúdo                                                   |
| ------------------------------ | ---------------------------------------------------------- |
| `src/pages/`                   | Páginas públicas, rotas de detalhes e página 404.          |
| `src/components/`              | Partes reutilizáveis da interface e suas interações.       |
| `src/layouts/SiteLayout.astro` | Estrutura comum, topbar, footer e SEO.                     |
| `src/config/site.ts`           | Contatos, Pix, informações da ONG, redes sociais e slides. |
| `scripts/dev-local.mjs`        | `pnpm dev:local`: lê o conteúdo da Todapata local.         |
| `src/lib/`                     | Leitura da API e funções compartilhadas.                   |
| `src/styles/global.css`        | Cores, fontes, foco e classe `.button`.                    |
| `public/`                      | Imagens, logos e PDF do kit de marca.                      |

Um arquivo `.astro` reúne HTML, CSS e preparação dos dados entre `---`.
Em `src/components/`, as pastas `home`, `animals`, `shop` e `notices` agrupam os
componentes por área; os compartilhados ficam na raiz.
A navegação usa `ClientRouter` para trocar páginas sem recarregar o site inteiro.
Scripts usam `onPageLoad()` de `src/lib/page-lifecycle.ts`, com limpeza de timers
e listeners globais ao sair. A barra de navegação indica etapas, não bytes baixados.

## Conteúdo e imagens

Conteúdo e fotos de animais, histórias, posts e produtos são cadastrados no painel
da Todapata. A API guarda cada foto pronta para a web (WebP, até 1600 px no lado
maior) e a envia como `{ src, width, height }`: o site a exibe como vem, com largura e
altura no `<img>`, sem medir nada. Imagens próprias do site ficam em `public/images/`;
`animal-sem-foto.webp` é a imagem usada quando um animal não tem foto. Para essas,
`ContentImage.astro` usa o Astro para gerar versões menores, preservando os originais
e suas proporções.

Os slides iniciais são `public/images/slide-1.jpg` e `slide-2.jpg`. Para trocá-los,
substitua os arquivos e confira `src`, `caption` e `alt` em `site.heroSlides`.
Use fotos reais, sem filtros de IA, e informações confirmadas pela ONG.
Animais, histórias, comunicados e posts usam `isPinned`: fixados primeiro e depois
`published_at` decrescente dentro de cada grupo. Só comunicados exibem o ícone de fixado.
Use data e hora ISO 8601 com fuso em `published_at`, como
`2026-11-04T14:30:00-03:00`. Para registros antigos sem hora conhecida, a
conversão usa meia-noite local. A interface exibe apenas a data.

### Animais

A home mostra até dois disponíveis ou oculta a seção quando não houver nenhum.
`/animais/` lista todos, com filtros locais.
Os cards mostram até duas fotos e três linhas de descrição; levam a
`/animais/public_id/`, que abre um modal com todas as fotos, texto completo e WhatsApp.
A mensagem inclui o link do animal.

| Campo                 | Como preencher                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `public_id`           | Identificador usado na URL.                                                              |
| `name`                | Nome ou `null`, sem criar campo `title`.                                                 |
| `type`                | `dog`, `cat` ou `other`.                                                                 |
| `isMale`, `neutered`  | Booleanos obrigatórios, sem `null`.                                                      |
| `ageGroup`            | Obrigatório: `puppy`, `adult` ou `senior`; o site não calcula idade.                     |
| `published_at`        | Data e hora de publicação obrigatórias.                                                  |
| `age`, `vaccinations` | Texto ou `null`; aparecem apenas nos detalhes quando informados.                         |
| `isAgeApproximate`    | `true` para idade estimada; `false` quando não houver estimativa.                        |
| `images`              | Lista de fotos; sem foto, a fonte deve informar `[]`; o site usa `animal-sem-foto.webp`. |

Manter os mesmos campos nos registros: os tipos estão declarados em `src/lib/api.ts`.
O site não escolhe foto padrão nem presume vacinação completa ou castração desconhecida.
Os cards combinam nome, sexo e faixa etária; nos detalhes, o título usa só o nome
ou “Ainda sem nome”.

### Histórias felizes

`stories` contém `name`, `description`, `published_at`, `afterImage` obrigatória e
`beforeImage` com o caminho da foto anterior ou `null`. Não há identificador público.
O site gera os textos alternativos com o nome e a indicação de foto atual ou anterior.
A home mostra até seis fotos atuais; `/historias-felizes/` reúne todas as histórias,
sem páginas individuais ou carrossel.
“Envie sua história” abre o WhatsApp, sem formulário ou envio pelo site.

### Comunicados e posts

`notices` contém apenas `title`, `body`, `published_at` e `isPinned`.
A home mostra até seis.
Sem avisos, a seção desaparece. O texto abre ao clicar, inclusive sem JavaScript.
Não há imagens ou páginas individuais. `/comunicados/` reúne todos os avisos.
Posts ficam em `posts`: `slug`, `title`, `body` (texto original com
parágrafos), `category`, `published_at`, `isPinned` e `image` opcional
(caminho de uma única foto). A home mostra até três.
Categorias: `community`, `campaign`, `transparency` e `care`.
A prévia mostra o próprio texto, limitado a três linhas com reticências.
`/publicacoes/` reúne todos os posts, com uma imagem por artigo e filtros no navegador.
Cada card abre `/publicacoes/slug/`, com texto completo e imagem em tamanho grande.

### Produtos

Em `products`, `price` é o preço unitário padrão em centavos. Informe `price`
na variante quando ela tiver outro preço. Cada variante informa as escolhas
diretamente em `options`, como `{ "Cor": "Rosa", "Tamanho": "M" }`. Use as mesmas
chaves nas variantes de um produto. Em `stock_quantity`, `0` significa esgotado e
`null` significa consultar.
O identificador público e os IDs das fotos são nanoids de 12 caracteres. As fotos
vêm da API como URLs. Use `image_ids` na variante para selecionar
fotos específicas da galeria. Omitir o campo usa a galeria inteira.
Em `/loja/`, o produto abre um modal com opções em estoque, quantidade e pedido pelo WhatsApp.

## Contatos e doações

Telefone, e-mail, chave Pix e redes sociais ficam somente em `src/config/site.ts`.
Topbar e doações abrem o mesmo modal Pix; o QR Code fica em
`public/images/pix-qr-code.webp`. Sem JavaScript, as informações aparecem no fim da página.
O botão “Avisar a OPAA” aparece só na home e encaminha ao WhatsApp.

## Comandos e publicação

| Comando                     | Finalidade                                                     |
| --------------------------- | -------------------------------------------------------------- |
| `pnpm dev`                  | Desenvolvimento local.                                         |
| `pnpm check-all`            | ESLint com correções, formatação e verificação de tipos Astro. |
| `pnpm lint` / `pnpm format` | Executar apenas uma dessas rotinas.                            |
| `pnpm build`                | Gerar o Worker e os arquivos estáticos em `dist/`.             |
| `pnpm preview`              | Rodar o build localmente no runtime da Cloudflare.             |

Antes de entregar, rode `pnpm check-all`, revise as correções e confira no celular.
O Claude segue também os limites do [CLAUDE.md](CLAUDE.md).
O GitHub está integrado à Cloudflare: enviar à `main` pode publicar automaticamente.
O Worker lê dois valores a cada visita (não são variáveis de build): o endereço da API,
`TODAPATA_API_URL`, versionado em `wrangler.jsonc` (`vars`), e a chave da ONG,
`TODAPATA_API_KEY`, um **segredo do Worker** (Settings → Runtime variables and secrets,
tipo Secret). As
imagens próprias do site (slides, foto padrão) são redimensionadas pelo binding
`IMAGES` do Cloudflare Images, configurado automaticamente no deploy.
Combine o envio com a equipe. Para domínio e indexação, consulte `.env.example` e
[docs/SEO.md](docs/SEO.md).

## Combinados da equipe

- Código e comentários em inglês; interface, conteúdo, documentação, rotas e âncoras em português.
  Campos técnicos da API em inglês.
- Preservar layouts aprovados, responsividade, acessibilidade e soluções simples.
- Seguir o [kit de marca](docs/brand-guide.md) e reutilizar cores, fontes e componentes.
- Usar pnpm, preservar o lockfile e não editar arquivos gerados ou dependências.
- Não enviar `.env` com credenciais nem colocar dados privados em `public/` ou no JSON.
