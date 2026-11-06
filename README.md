# OPAA Alegrete

Site da ONG para apresentar seu trabalho, divulgar animais para adoção e facilitar
doações. Usa **Astro** para gerar HTML estático, **TypeScript** para verificar o
código, **CSS** para os estilos e **pnpm** para instalar dependências e executar comandos.

O módulo `src/lib/api.ts` consulta `src/data/api.json`, que simula uma API.
Não há servidor de dados, banco, checkout ou painel administrativo neste projeto.
Alterações no conteúdo exigem novo build e publicação.

## Rodar localmente

Instale Node.js `>=22.23.4` e pnpm. Na pasta do projeto:

```sh
pnpm install
pnpm dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:4321`.
Não precisa configurar `.env` para desenvolver. No VS Code, instale as extensões
recomendadas pelo projeto.

## Onde editar

| Arquivo ou pasta               | Conteúdo                                                   |
| ------------------------------ | ---------------------------------------------------------- |
| `src/pages/`                   | Landing page, animais, histórias felizes e página 404.     |
| `src/components/`              | Partes reutilizáveis da interface e suas interações.       |
| `src/layouts/SiteLayout.astro` | Estrutura comum, topbar, footer e SEO.                     |
| `src/config/site.ts`           | Contatos, Pix, informações da ONG, redes sociais e slides. |
| `src/data/api.json`            | Animais, histórias, comunicados, posts e produtos.         |
| `src/lib/`                     | Consultas aos dados e funções compartilhadas.              |
| `src/styles/global.css`        | Cores, fontes, foco e classe `.button`.                    |
| `public/`                      | Imagens, logos e PDF do kit de marca.                      |

Um arquivo `.astro` reúne HTML, CSS e preparação dos dados entre `---`.
A navegação usa `ClientRouter` para trocar páginas sem recarregar o site inteiro.
Scripts usam `onPageLoad()` de `src/lib/page-lifecycle.ts`, com limpeza de timers
e listeners globais ao sair. A barra de navegação indica etapas, não bytes baixados.

## Conteúdo e imagens

Use os registros do JSON como modelo. Mídias do conteúdo ficam em `public/api/`
nas pastas `animals`, `stories`, `blog` e `products`. Imagens próprias do site ficam
em `public/images/`. Os caminhos públicos não incluem `public`, por exemplo:
`/api/animals/foto.webp`.

Os slides iniciais são `public/images/slide-1.jpg` e `slide-2.jpg`. Para trocá-los,
substitua os arquivos e confira `src`, `caption` e `alt` em `site.heroSlides`.
Os registros de animais ainda são demonstrativos.
Use fotos reais, sem filtros de IA, e informações confirmadas pela ONG.

### Animais

A home mostra até dois disponíveis, com fixados primeiro e depois por data, ou oculta a
seção quando não houver nenhum. `/animais/` lista todos, com filtros locais.
Os cards mostram até duas fotos e três linhas de descrição; levam a
`/animais/public_id/`, que abre um modal com todas as fotos, texto completo e WhatsApp.
A mensagem inclui o link do animal.

| Campo                          | Como preencher                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `public_id`                    | Identificador usado na URL.                                                      |
| `name`                         | Nome ou `null`, sem criar campo `title`.                                         |
| `type`                         | `dog`, `cat` ou `other`.                                                         |
| `isMale`, `neutered`           | Booleanos obrigatórios, sem `null`.                                              |
| `ageGroup`                     | Obrigatório: `puppy`, `adult` ou `senior`; o site não calcula idade.             |
| `published_at`                 | Data de publicação obrigatória.                                                  |
| `age`, `breed`, `vaccinations` | Texto ou `null`; aparecem apenas nos detalhes quando informados.                 |
| `isAgeApproximate`             | `true` para idade estimada; `false` quando não houver estimativa.                |
| `images`                       | Lista de fotos; sem foto, a fonte deve informar `["/api/animals/default.webp"]`. |

Manter os mesmos campos nos registros: o TypeScript infere os tipos do JSON.
O site não escolhe foto padrão nem presume vacinação completa ou castração desconhecida.
Os cards combinam nome, sexo e faixa etária; nos detalhes, o título usa só o nome
ou “Ainda sem nome”.

### Histórias felizes

`stories` contém `name`, `description`, `published_at`, `afterImage` obrigatória e
`beforeImage` com o caminho da foto anterior ou `null`. Não há identificador público.
O site gera os textos alternativos com o nome e a indicação de foto atual ou anterior.
A home mostra até seis fotos atuais; `/historias-felizes/` reúne todas as histórias,
com fixados primeiro e depois por data, sem páginas individuais ou carrossel.
“Envie sua história” abre o WhatsApp, sem formulário ou envio pelo site.

### Comunicados e posts

`notices` contém apenas `title`, `body`, `published_at` (`AAAA-MM-DD`) e `isPinned`.
A home mostra até seis: fixados primeiro, por data decrescente dentro de cada grupo.
Sem avisos, a seção desaparece. O texto abre ao clicar, inclusive sem JavaScript.
Não há imagens ou páginas individuais. `/comunicados/` reúne todos os avisos.
Posts ficam em `posts`: `slug`, `title`, `body` (texto original com
parágrafos), `category`, `published_at`, `isPinned` e `images`. A home mostra até três,
com fixados primeiro e depois por data. Categorias: `community`, `campaign`, `transparency` e `care`.
A prévia mostra o próprio texto, limitado a três linhas com reticências.
`/publicacoes/` reúne todos os posts, com uma imagem por artigo e filtros no navegador.
Cada card abre `/publicacoes/slug/`, com texto completo e imagem em tamanho grande.
Animais, histórias e comunicados seguem essa mesma ordenação; só comunicados mostram o ícone de fixado.

### Produtos

Em `products`, opções como cor e tamanho formam variantes com preço unitário em
centavos (`price`) e estoque (`stock_quantity`): `0` esgotado, `null` consultar.
IDs são nanoids de 12 caracteres; fotos ficam em `/api/products/<id>.webp` e podem
ser compartilhadas entre variantes. Use os registros do JSON como modelo.
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
| `pnpm build`                | Gerar o site em `dist/`.                                       |
| `pnpm preview`              | Conferir o build localmente.                                   |

Antes de entregar, rode `pnpm check-all`, revise as correções e confira no celular.
Agentes seguem também os limites do [AGENTS.md](AGENTS.md).
O GitHub está integrado à Cloudflare: enviar à `main` pode publicar automaticamente.
Combine o envio com a equipe. Para domínio e indexação, consulte `.env.example` e
[docs/SEO.md](docs/SEO.md). Alguns links ainda usam `#` até as páginas ficarem prontas.

## Combinados da equipe

- Código e comentários em inglês; interface, conteúdo, documentação, rotas e âncoras em português.
  Campos técnicos da API em inglês.
- Preservar layouts aprovados, responsividade, acessibilidade e soluções simples.
- Seguir o [kit de marca](docs/brand-guide.md) e reutilizar cores, fontes e componentes.
- Usar pnpm, preservar o lockfile e não editar arquivos gerados ou dependências.
- Não enviar `.env` com credenciais nem colocar dados privados em `public/` ou no JSON.
