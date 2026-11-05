# OPAA Alegrete

Site da ONG para apresentar seu trabalho, divulgar animais para adoção e
facilitar doações. Usa **Astro, TypeScript, CSS e pnpm**.

Os dados são consultados por `src/lib/api.ts`. Por enquanto, esse módulo lê
`src/data/api.json`, que simula uma API. O site é gerado como HTML estático:
alterações nos dados exigem novo build e publicação.
O `ClientRouter` do Astro permite navegar entre páginas sem recarregar o site
inteiro. Uma barra no topo acompanha as etapas da navegação nos carregamentos
mais lentos; ela não representa um percentual de bytes baixados.

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
Scripts interativos usam `onPageLoad()` de `src/lib/page-lifecycle.ts` para
inicializar após cada navegação e encerrar timers ou listeners globais ao sair.
Arquivos de `public/` são acessados sem esse prefixo: `/api/animals/foto.webp`.
Mídias da API ficam em `public/api/animals`, `public/api/blog` e `public/api/products`.
Imagens próprias do site ficam juntas em `public/images/`.
As fotos do slider inicial são `public/images/slide-1.jpg` e `slide-2.jpg`.
Para trocá-las, substitua os arquivos mantendo os nomes. Confira também se as
legendas e os textos alternativos em `heroSlides`, no `src/config/site.ts`,
continuam corretos. Cada slide reúne `src` (imagem), `caption` (legenda) e `alt`
(descrição acessível).

Os botões de contribuição abrem `PixModal.astro`, compartilhado entre as páginas.
A chave vem de `organization.pix`; o QR Code fica em
`public/images/pix-qr-code.webp`. Sem JavaScript, os links levam às informações
Pix exibidas no fim da página.

## Dados dos animais

- A landing page mostra **até dois disponíveis**, do mais recente para o mais
  antigo por `published_at`. Sem disponíveis, a seção não aparece.
- `/animais/` mostra todos os disponíveis, com filtros no navegador.
  Os cards e sliders são compartilhados com a landing page.
- Os cards levam a `/animais/public_id/`, com todas as fotos, descrição completa
  e botão de contato pelo WhatsApp. Essas páginas são geradas no build.
- Não há `title` nos animais. Os cards apresentam nome (quando houver), sexo e faixa
  etária, como `Mel · Fêmea · Adulto`. A descrição fica limitada a três linhas
  apenas na prévia; o site não calcula idade.
  Na página individual, o título é só o nome ou “Ainda sem nome”.
- Os cards mostram até duas fotos; a página individual permite ver todas.
  Sem foto, a fonte deve enviar
  `["/api/animals/default.webp"]`; o site não escolhe a imagem padrão.
- Sem nome, use `name: null`, em vez de uma string vazia. `public_id` identifica
  a URL; a mensagem do WhatsApp contém um convite para conversar e o link do animal.
  Use fotos reais, sem filtros de IA.
- `isMale` e `neutered` são booleanos obrigatórios (`true` ou `false`, sem `null`).
  `ageGroup` e `published_at` também são obrigatórios.
- `breed`, `age` e `vaccinations` aceitam texto ou `null`. Informações opcionais
  nulas, vazias ou ausentes não aparecem nos detalhes. Em `vaccinations`, informe
  as vacinas ou doses conhecidas; não presuma que a vacinação está completa.
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

## Comunicados e alertas

Ficam em `posts`, no JSON, com `category: "notice"` e sem imagens (`images: []`).
`isPinned: true` fixa um aviso no topo. A home mostra até quatro: primeiro os
fixados e depois os demais, do mais recente para o mais antigo em cada grupo.
A data aparece na lista e o texto completo abre ao clicar, inclusive sem JavaScript.
O link para ver todos aponta para `#` até a criação da página de comunicados.
As datas dos comunicados usam `AAAA-MM-DD`, sem inventar horários. `expires_at`
permanece `null` nos registros enviados, pois não foi informado prazo de validade.

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
