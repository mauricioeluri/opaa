# OPAA Alegrete

Site estático simples da OPAA Alegrete, uma ONG de proteção animal de Alegrete/RS. Priorizar engajamento, divulgação dos animais e formas de ajudar, com pouca manutenção. O site não é um sistema de gestão. O conteúdo (animais, histórias, comunicados, posts e produtos) vem da API pública da Todapata (`/api/v1`), lida no build por `src/lib/api.ts` com `TODAPATA_API_URL` e `TODAPATA_API_KEY` (obrigatórias; sem elas o build para). `TODAPATA_MEDIA_ORIGIN` libera a otimização das imagens remotas. Para desenvolver contra a Todapata local: `pnpm dev:local` (lê `.env.todapata-local`, gerado por `pnpm site:local-key` na Todapata). Os dados de origem (antigo `api.json` e `public/api/`) foram importados para a Todapata e removidos; só existem no histórico do Git.

## Forma de trabalho

- Priorizar clareza, qualidade e simplicidade. Limitar as mudanças à tarefa e preservar arquivos e alterações existentes do usuário. Ler antes de editar.
- **Git:** commits e push direto na `main` são permitidos (sem linha de coautor do Claude), conforme as tarefas terminam. Sem PRs, branches ou alterações em remotos. Enviar à `main` publica o site na Cloudflare, que precisa das variáveis `TODAPATA_*` e da Todapata no ar; senão o build falha e o site publicado continua como está.
- Não publicar, fazer deploy nem alterar configurações do GitHub e da Cloudflare. O usuário cuida disso; enviar à `main` pode publicar o site automaticamente.
- **Tudo destinado ao usuário em português:** interface, mensagens, textos alternativos, metadados, rotas públicas, âncoras, comunicação e documentação. Inglês só no código, comentários, identificadores, arquivos técnicos e campos técnicos da API. O conteúdo da API exibido ao usuário também deve estar em português. Arquivos que definem rotas seguem o nome público em português. Preservar nomes oficiais e arquivos de marca existentes.
- Comentar apenas decisões ou restrições que não sejam evidentes no código.
- Preservar layouts e branding aprovados. Refatorar não autoriza redesenhar a interface, criar funcionalidades ou reorganizar trabalho fora do escopo.
- Usar a representação mais simples que expresse a regra. Reutilizar componentes e configuração existentes antes de criar helpers, tipos ou abstrações. Não criar camadas arquiteturais, injeção de dependências, repositórios genéricos ou novos frameworks para necessidades hipotéticas.
- Na entrega, informar alterações, verificações executadas e limitações. Não afirmar testes ou validação visual que não tenham sido realizados.

## Stack

Astro com geração estática, TypeScript estrito, CSS e pnpm. Preferir HTML nativo e CSS local dos componentes Astro; JavaScript no navegador só para interações que precisem dele. Não adicionar React nem Tailwind por padrão. Sem banco de dados nem acesso direto a ele em nenhuma etapa: a persistência pertence à API da Todapata. Sem autenticação nem painel neste projeto.

Usar o `README.md` como guia de configuração e combinados da equipe; este arquivo complementa com as restrições para o Claude. Conferir o código e as configurações reais e manter os documentos coerentes ao alterá-los. Usar pnpm, preservar o lockfile e adicionar dependências só quando necessárias.

## Comandos

```sh
pnpm dev                       # http://localhost:4321
pnpm exec astro dev --background   # servidor em segundo plano (status | logs | stop)
```

- **Não executar** `check-all`, lint ou formatação, nem em modo de verificação nem chamando os executáveis direto: o usuário as executa. As instruções do README sobre isso são para a equipe.
- Não rodar build, tipagem global ou suítes amplas como checklist. Usar verificações amplas só para diagnosticar um problema específico ou validar mudança de maior alcance, explicando o motivo e o resultado.
- Verificações direcionadas ao comportamento afetado. Sem framework de testes para mudanças pequenas de conteúdo, marca ou configuração. Alterações só documentais não exigem testes.
- Em mudanças de interface, conferir o fluxo afetado quando viável e informar quando não houver validação visual. Não corrigir código alheio para deixar checks verdes.
- Não editar à mão `.astro/`, `dist/` nem dependências. Não encerrar servidor iniciado pelo usuário.

## Estrutura

| Diretório          | Responsabilidade                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `src/pages/`       | Páginas e endpoints estáticos, incluindo sitemap e robots                                      |
| `src/layouts/`     | Estrutura compartilhada do documento                                                           |
| `src/components/`  | Componentes Astro reutilizáveis (`home`, `animals`, `shop`, `notices`; compartilhados na raiz) |
| `scripts/`         | `dev-local.mjs`: desenvolvimento contra a Todapata local                                       |
| `src/lib/`         | Leitura da API (`api.ts`) e funções compartilhadas                                             |
| `src/config/`      | Configuração compartilhada, incluindo SEO                                                      |
| `public/branding/` | Logos oficiais, favicons e ícone Apple                                                         |
| `public/images/`   | Imagens próprias do site (slides, Pix, 404, `animal-sem-foto.webp`)                            |

## Convenções de código

- PascalCase em componentes e layouts Astro; kebab-case nos demais arquivos novos e nas rotas. Seguir as convenções de cada área.
- Dois espaços, aspas simples, sem ponto e vírgula, LF (`.prettierrc` e `eslint.config.mjs`).
- Manter `astro/tsconfigs/strict`. Sem `any`, sem desativar regras nem suprimir verificações para esconder defeitos.
- Entregar o conteúdo relevante no HTML gerado, sem depender só do carregamento no navegador. Mudanças nos dados locais exigem novo build/deploy.
- A navegação usa `ClientRouter` no layout. Inicializar interações com `onPageLoad()` de `src/lib/page-lifecycle.ts`, retornando a limpeza de timers e listeners globais. Preservar links nativos e o funcionamento sem JavaScript.
- Separar dados da apresentação. Funções simples que importam JS/JSON bastam; não criar servidor para ler arquivos locais.
- Preservar SEO, canonical, barras finais das URLs, sitemap e robots ao modificar páginas. Não inventar domínio de produção nem contornar validações de ambiente.

## Escopo e conteúdo

- Adoção, associação, voluntariado, lar temporário e encomendas encaminham aos contatos confirmados da ONG. Não inventar telefones, endereços ou links.
- Pix usa informações fixas confirmadas e não simula confirmação de pagamento. A seção de doações abre o modal compartilhado com a topbar (chave Pix e QR Code em `public/images/pix-qr-code.webp`); o convite pode ser pontual ou mensal, sem cobrança automática. Sem metas, valores arrecadados ou acompanhamento de pagamento.
- Sem checkout, agendamento, venda de números de rifas, controle financeiro, publicação em redes ou telas administrativas sem nova solicitação.
- Não apresentar animais, histórias, produtos ou valores demonstrativos como reais. Usar o conteúdo fornecido e identificar exemplos quando solicitado.
- Reutilizar os arquivos de `public/branding/`. Não redesenhar nem alterar o logo da OPAA sem pedido específico.
- **Rodapé:** traz o crédito "Site feito pela Todapata" com a logo horizontal (`public/branding/todapata-logo-horizontal.svg`, com a fonte embutida). O link aponta para `#` até a Todapata ser hospedada; trocar pelo endereço quando existir.

## Dados (contrato com a API)

O formato é o que a API da Todapata entrega. Os tipos de cada registro (`Animal`, `Post`, `Notice`, `Story`, `Product`) são declarados em `src/lib/api.ts`, o único ponto de acesso ao conteúdo; manter os mesmos campos nos registros. Os limites da home ficam em `homeLimits`. `available` em animais significa "ainda não adotado"; `hasDisability` (booleano, opcional) é um campo novo da API, ainda sem uso no site.

- **Ordenação:** animais, posts, comunicados e histórias usam `isPinned` (booleano): fixados primeiro, depois `published_at` decrescente em cada grupo, antes de limitar a home. `published_at` é data e hora ISO 8601 com fuso. Só comunicados mostram o ícone de fixado. Não fixar registros sem solicitação. As datas exibem-se no fuso de São Paulo.
- **Animais:** sem campo `title`; sem nome, `name: null`. Cards combinam nome (quando houver), sexo e faixa etária com `getAnimalLabel()`; os rótulos das faixas também servem ao filtro. A API informa `ageGroup`; o site não calcula idade. `age: null` para idade desconhecida e `isAgeApproximate: false` sem estimativa. `isMale` e `neutered` são booleanos obrigatórios; `ageGroup` e `published_at` também. Idade e vacinas (`vaccinations`, texto ou `null`) só aparecem nos detalhes quando informadas. Não presumir vacinação completa nem castração desconhecida. `type` é `dog`, `cat` ou `other`: a interface apresenta cães, gatos e outros, sem limitar textos e listagens a cães. Os cards exibem até duas fotos de `images`; o modal mostra todas. Sem foto, a API manda lista vazia e `api.ts` usa `/images/animal-sem-foto.webp`; o site não completa dados desconhecidos.
- **Animais, páginas:** cards abrem o modal em `/animais/public_id/` (todas as fotos, descrição completa, contato pelo WhatsApp). Título do modal: o nome ou "Ainda sem nome"; sexo e faixa etária ficam nos detalhes. Na home, no máximo dois animais disponíveis (sem disponíveis, a seção some); `getAllAnimals()` não é limitada.
- **Posts do blog:** em `posts`, identificados pelo `slug` (sem `public_id` nem `expires_at`), com `title`, `body` (texto original com parágrafos), `category`, `published_at`, `isPinned` e `image` opcional (uma foto, sem carrossel). A home mostra até três; a prévia usa o `body` limitado a três linhas por CSS. Cards abrem `/publicacoes/slug/`, com texto completo e imagem grande sem cortes.
- **Comunicados:** em `notices`, só `title`, `body`, `published_at` e `isPinned`; sem imagens, identificadores, categorias, validade ou páginas individuais. Home: até seis (sem comunicados, a seção some). Corpo em texto escapado, abertura nativa por `details`/`summary`.
- **Histórias:** em `stories`, sem identificador, com `name`, `description`, `published_at`, `isPinned`, `afterImage` obrigatória e `beforeImage` (caminho ou `null`). O site gera o alt com o nome e foto atual/anterior. Home: até seis fotos atuais; `/historias-felizes/` reúne todas por data decrescente, sem carrossel nem páginas individuais. Preservar o layout de papel aprovado.
- **Produtos:** nanoids de 12 caracteres no identificador público e nos IDs e nomes das fotos WebP. Cada variante guarda as escolhas em `options` e o estoque em `stock_quantity` (`0` esgotado, `null` consultar). O `price` (centavos) é do produto e pode ser substituído na variante. `image_ids` limita a galeria à seleção da variante, quando informado. Pedidos encaminham ao WhatsApp.
- Contatos, Pix, dados institucionais, SEO, endereço e redes sociais ficam só em `site` (`src/config/site.ts`), sem cópias na API. `phone` é o número internacional usado nos links de chamada e WhatsApp; `email` e `pixKey` são campos separados. Slides em `site.heroSlides` (imagem, legenda e alt). Mensalidade e QR Code Pix não entram na API. Novos campos exigem necessidade concreta.

## Segurança

- Preservar arquivos `.env`. Nunca exibir credenciais em logs, código ou documentação. A chave de API da Todapata, quando for ligada, fica só no ambiente de build, nunca no repositório nem no navegador.
- Tudo em `public/`, no HTML gerado e nos bundles do navegador é público: sem segredos nem dados pessoais privados.
- Não renderizar HTML não confiável diretamente; preferir a interpolação escapada dos templates.

## Interface

- Seguir o [kit de marca](docs/brand-guide.md) em toda criação ou alteração visual, sem exigir que o usuário repita as orientações; consultar o guia e `src/styles/global.css` antes de editar. O PDF é a versão para compartilhar; o guia em Markdown é a referência e acompanha mudanças de identidade pedidas pelo usuário.
- Reutilizar as variáveis de cor de `src/styles/global.css`; sem novas cores nem hexadecimais repetidos nos componentes. Ícones herdam a cor do texto por `currentColor`.
- Lilita One (400) em h1/h2; Nunito Sans em textos, navegação, botões e contatos (400), com bold 700 nos destaques e h3. Herdar as fontes globais; sem novas famílias nem negrito artificial na Lilita One.
- Lucide nos ícones de interface e SVGs locais de `public/icons/` nas marcas sociais. Preservar os logos aprovados e espaçamentos consistentes.
- Responsividade, HTML semântico, navegação por teclado, foco visível, links descritivos e textos alternativos relevantes.
- Sem ponto final em títulos, chamadas curtas, slogans e botões; pontuação normal em parágrafos e descrições, e interrogação em perguntas. Não trocar os pontos removidos por exclamações; ao adaptar chamadas de mais de uma frase, reescrever preservando o sentido.
- Preservar proporções das imagens e informar dimensões quando conhecidas. Usar `ContentImage.astro` para otimizar fotos locais, sem mover os originais nem ampliar além da resolução original.
- Links para navegação e botões para ações. Sem links sem destino (exceção temporária: o crédito da Todapata, `#`), controles sem função ou mensagens de sucesso sem ação concluída.
- Nas listagens, usar `PageHeader.astro`: `label` na etiqueta pequena, `title` com chamada acolhedora e emocional, `description` explicando o conteúdo, sem repetir a mesma ideia nos três. Ícone por `icon` e ações pelo slot `actions`.
- Centralizar textos compartilhados quando reutilizados, sem sistema de configuração nem editor para cada informação.

## Documentação Astro

Consultar o guia oficial antes de alterar o comportamento relacionado: [componentes](https://docs.astro.build/en/basics/astro-components/), [rotas e endpoints estáticos](https://docs.astro.build/en/guides/routing/), [estilos](https://docs.astro.build/en/guides/styling/) e, quando necessário, [coleções de conteúdo](https://docs.astro.build/en/guides/content-collections/) e [integrações com frameworks](https://docs.astro.build/en/guides/framework-components/).
