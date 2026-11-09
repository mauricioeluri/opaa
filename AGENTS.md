# OPAA Alegrete — instruções para agentes

Site estático simples da OPAA Alegrete, uma ONG de proteção animal de Alegrete/RS.
Priorizar engajamento, divulgação dos animais e formas de ajudar, com pouca
manutenção. O site não é um sistema de gestão.

## Forma de trabalho

- Priorizar clareza, qualidade e simplicidade. Limitar as mudanças à tarefa e
  preservar arquivos e alterações existentes do usuário. Ler antes de editar.
- Consultas Git são permitidas: status, diff, log, show e outras operações somente
  de leitura. Usá-las para entender o histórico e revisar alterações.
- Não executar operações Git que modifiquem arquivos, índice, histórico, referências
  ou remotos: add, commit, push, pull, fetch, checkout, switch, reset, restore,
  clean, stash, merge, rebase, criação/exclusão de branches e semelhantes. Não abrir
  PRs. As alterações da tarefa devem ser feitas diretamente nos arquivos.
- Não publicar, executar deploy ou alterar configurações do GitHub e Cloudflare.
  O usuário cuida dessas operações; alterações enviadas à main podem publicar
  automaticamente o site.
- Tudo destinado ao usuário deve estar em português: interface, mensagens,
  textos alternativos, metadados, rotas públicas e âncoras de navegação, além da
  comunicação e documentação. Inglês fica restrito ao código, comentários,
  identificadores, arquivos técnicos e campos/valores técnicos da API; o conteúdo
  da API exibido ao usuário também deve estar em português. Arquivos que definem
  rotas seguem o nome público em português. Preservar nomes oficiais e arquivos
  de marca existentes.
- Comentar apenas decisões ou restrições que não sejam evidentes no código.
- Preservar layouts e branding aprovados. Refatorar não autoriza redesenhar a
  interface, criar funcionalidades ou reorganizar trabalho fora do escopo.
- Usar a representação mais simples que expresse a regra. Reutilizar componentes
  e configuração existentes antes de criar helpers, tipos ou abstrações.
- Não criar camadas arquiteturais, injeção de dependências, repositórios genéricos
  ou novos frameworks para necessidades hipotéticas.
- Na entrega, informar alterações, verificações executadas e limitações. Não
  afirmar testes ou validação visual que não tenham sido realizados.

## Stack e organização

Astro com geração estática, TypeScript estrito, CSS e pnpm. Conteúdo local em
JavaScript/JSON e imagens no repositório. Não há consumo de API, autenticação ou
painel administrativo no escopo atual. Este projeto não terá banco de dados nem
acesso direto a ele em nenhuma etapa. Futuramente poderá consumir uma API externa;
a conexão com banco e a persistência pertencem exclusivamente a essa outra camada.

Usar o README.md como guia de configuração e combinados da equipe. Este arquivo
complementa esse guia com restrições específicas para agentes. Conferir o código
e as configurações reais e manter os documentos coerentes ao alterá-los. Usar
pnpm e preservar seu lockfile. Adicionar dependências somente quando necessárias
à tarefa.

| Diretório          | Responsabilidade                                          |
| ------------------ | --------------------------------------------------------- |
| `src/pages/`       | Páginas e endpoints estáticos, incluindo sitemap e robots |
| `src/layouts/`     | Estrutura compartilhada do documento                      |
| `src/components/`  | Componentes Astro reutilizáveis                           |
| `src/data/`        | Conteúdo local em JSON                                    |
| `src/lib/`         | Funções simples de consulta ao conteúdo                   |
| `src/config/`      | Configuração compartilhada, incluindo SEO                 |
| `public/branding/` | Logos oficiais, favicons e ícone Apple                    |
| `public/api/`      | Mídias de animais, histórias, blog e produtos do conteúdo |
| `public/images/`   | Imagens próprias do site, incluindo slides, Pix e 404     |
| `public/`          | Arquivos servidos diretamente, sem processamento          |

- Usar PascalCase para componentes e layouts Astro; kebab-case para demais
  arquivos novos e rotas. Seguir convenções existentes em cada área.
- Agrupar componentes específicos em `components/home`, `animals`, `shop` ou
  `notices`; manter componentes compartilhados na raiz de `components`.
- Dois espaços, aspas simples, sem ponto e vírgula e finais de linha LF, seguindo
  `.prettierrc` e `eslint.config.mjs`.
- Manter `astro/tsconfigs/strict`. Não usar `any`, desativar regras ou suprimir
  verificações para esconder defeitos.
- Preferir HTML nativo e CSS local dos componentes Astro. JavaScript no navegador
  apenas para interações que precisem dele. Não adicionar React ou Tailwind por
  padrão.
- Entregar conteúdo relevante no HTML gerado, sem depender exclusivamente de
  carregamento no navegador. Mudanças nos dados locais exigem novo build/deploy.
- A navegação usa `ClientRouter` no layout. Inicializar interações com
  `onPageLoad()` de `src/lib/page-lifecycle.ts`; retornar a limpeza de timers e
  listeners globais para não acumulá-los entre páginas. Preservar links nativos
  e o funcionamento sem JavaScript.
- Separar dados da apresentação quando introduzir conteúdo. Funções simples que
  importam JS/JSON bastam; não criar servidor para ler arquivos locais.
- Preservar configuração de SEO, canonical, barras finais das URLs, sitemap e
  robots ao modificar páginas. Não inventar domínio de produção nem contornar
  validações de ambiente.

## Escopo e conteúdo

- Adoção, associação, voluntariado, lar temporário e encomendas encaminham aos
  contatos confirmados da ONG. Não inventar telefones, endereços ou links.
- Pix usa informações fixas confirmadas. Não simular confirmação de pagamento.
- A seção de doações abre o modal compartilhado com a topbar, com chave Pix e
  QR Code em `public/images/pix-qr-code.webp`. O convite pode ser para uma ajuda
  pontual ou mensal, sem cobrança automática. Não adicionar metas,
  valores arrecadados ou acompanhamento de pagamentos sem nova solicitação.
- Não acrescentar checkout, agendamento, venda de números de rifas, controle
  financeiro, publicação em redes ou telas administrativas sem uma nova solicitação.
- Não apresentar animais, histórias, produtos ou valores demonstrativos como
  reais. Usar conteúdo fornecido e identificar exemplos quando solicitados.
- Reutilizar os arquivos oficiais de `public/branding/`. Não redesenhar nem alterar
  o logo sem pedido específico.

## Segurança

- Preservar arquivos `.env`. Nunca exibir credenciais em logs, código ou documentação.
- Tudo em `public/`, no HTML gerado e nos bundles do navegador é público. Não colocar
  segredos ou dados pessoais privados no conteúdo local ou na configuração pública.
- Não renderizar HTML não confiável diretamente. Preferir interpolação escapada
  normal dos templates.

## Interface

- Nas páginas de listagem, usar `PageHeader.astro`: `label` identifica a página
  na etiqueta pequena, `title` traz uma chamada acolhedora e emocional no título
  grande e `description` explica o conteúdo. Evitar repetir a mesma ideia nos três.
  Passar o ícone por `icon` e ações pelo slot `actions`, quando necessários.
- Seguir obrigatoriamente o [kit de marca](docs/brand-guide.md) em toda criação
  ou alteração visual, sem exigir que o usuário repita essas orientações.
  Consultar o guia e `src/styles/global.css` antes de editar a interface.
- Reutilizar as variáveis de cor de `src/styles/global.css`. Não introduzir novas
  cores, repetir valores hexadecimais nos componentes ou substituir a paleta sem
  solicitação explícita. Ícones devem herdar a cor do texto por `currentColor`.
- Usar Lilita One no peso original 400 para h1/h2 e Nunito Sans para textos,
  navegação, botões e contatos (400), com bold 700 nos destaques e h3. Herdar as
  fontes globais; não adicionar famílias ou negrito artificial à Lilita One.
- Usar Lucide nos ícones de interface e os SVGs locais de `public/icons/` nas
  marcas sociais. Preservar os logos aprovados de `public/branding/` e manter
  espaçamentos consistentes, conforme o guia. O PDF é a versão para compartilhar;
  o guia em Markdown é a referência de implementação e deve acompanhar mudanças
  de identidade solicitadas pelo usuário.
- Manter responsividade, HTML semântico, navegação por teclado, foco visível, links
  descritivos e textos alternativos relevantes nas imagens.
- Não usar ponto final em títulos, chamadas curtas, slogans e botões. Manter a
  pontuação normal em parágrafos, descrições e orientações, além da interrogação
  em perguntas. Não substituir os pontos removidos por exclamações.
  Ao adaptar chamadas com mais de uma frase, reescrevê-las para preservar o
  sentido e a fluidez; não remover mecanicamente pontuação necessária à leitura.
- Preservar proporções de imagens e informar dimensões quando conhecidas para
  evitar deslocamentos de layout.
  Usar `ContentImage.astro` para otimizar fotos locais sem mover os originais
  de `public/api/` ou `public/images/` nem ampliar além da resolução original.
- Usar links para navegação e botões para ações. Não criar links sem destino,
  controles sem função ou mensagens de sucesso sem uma ação concluída.
- Centralizar contatos, Pix, dados institucionais, SEO, endereço e redes
  sociais em `site`, de `src/config/site.ts`, sem cópias na API. `phone` é o número
  internacional usado nos links de chamadas e WhatsApp; `email` e `pixKey` são
  campos separados. Slides ficam em `site.heroSlides`, com imagem, legenda e alt.
  Referenciar logos e ícones diretamente nos componentes. Não incluir mensalidade
  ou QR Code Pix na API. Novos campos exigem necessidade concreta.
- Posts do blog ficam em `posts`, identificados pelo `slug`, sem `public_id` ou
  `expires_at`, com `title`, `body` (texto original com parágrafos),
  `category`, `published_at`, `isPinned` e `image` opcional (caminho de uma foto).
  A home exibe até três.
  A prévia usa o próprio `body`, limitado a três linhas com reticências por CSS.
  Cada post usa no máximo uma imagem, sem carrossel.
  Cards abrem `/publicacoes/slug/`, com texto completo e imagem grande sem cortes.
  Não aplicar essa regra aos identificadores dos animais.
- Animais, posts, comunicados e histórias usam `isPinned` booleano: fixados primeiro,
  depois `published_at` decrescente dentro de cada grupo, antes de limitar a home.
  Usar data e hora ISO 8601 com fuso em `published_at`.
  Só comunicados mostram ícone de fixado. Não fixar registros sem solicitação.
- Produtos usam nanoids de 12 caracteres nos IDs e nomes das fotos WebP.
  Seguir o JSON existente: opções formam variantes com preço e estoque próprios,
  referenciando a galeria compartilhada. Pedidos encaminham ao WhatsApp.
- Histórias ficam em `stories`, sem identificador, com `name`, `description`,
  `published_at`, `isPinned`, `afterImage` obrigatória e `beforeImage` como caminho ou `null`.
  O site gera o alt com nome e foto atual/anterior. A home mostra até seis fotos
  atuais; `/historias-felizes/` reúne todas por data decrescente, sem carrossel ou
  páginas individuais. Preservar o layout de papel aprovado.
- Centralizar textos compartilhados quando reutilizados. Não criar
  sistema de configuração ou editor para cada informação.
- Animais não têm campo `title`. Sem nome, usar `name: null`. A apresentação
  dos cards combina nome (quando houver), sexo e faixa etária com `getAnimalLabel()`;
  os rótulos das faixas também são usados pelo filtro. A API informa `ageGroup`,
  sem classificação ou cálculo de idade pelo site. Manter os mesmos campos nos
  registros: `age: null` para idade desconhecida e `isAgeApproximate: false`
  quando não houver estimativa informada. Esses campos não entram no cabeçalho
  dos cards. `isMale` e `neutered` são booleanos obrigatórios, sem `null`;
  `ageGroup` e `published_at` também são obrigatórios. Idade e vacinas
  (`vaccinations`, texto ou `null`) só aparecem nos detalhes quando informadas.
  Não presumir vacinação completa nem status de castração desconhecido. Preferir
  a inferência de tipos do JSON. Os cards exibem até duas
  fotos de `images`; o modal permite ver todas. Sem foto, a fonte
  informa `/api/animals/default.webp`. Não escolher imagem
  padrão nem completar dados desconhecidos no site.
- A API informa o tipo em `type`: `dog`, `cat` ou `other`. A interface apresenta
  cães, gatos e outros, sem limitar textos e listagens somente a cães.
- Cards abrem o modal em `/animais/public_id/`, com todas as fotos e descrição
  completa. Na home, o link carrega a listagem com o modal aberto.
  O contato sobre o animal pelo WhatsApp fica nesse modal.
  Seu título usa apenas o nome ou “Ainda sem nome”; sexo e faixa etária ficam nos detalhes.
- Na landing page, mostrar no máximo dois animais disponíveis, respeitando a
  ordenação de fixados e data. Sem disponíveis, ocultar a seção
  inteira. Não limitar a
  consulta compartilhada `getAllAnimals()`, usada pelas demais páginas.
- Comunicados ficam em `notices`, separados dos posts do blog, com apenas `title`,
  `body`, `published_at` e `isPinned` booleano. Não têm imagens, identificadores,
  categorias, prazo de validade ou páginas individuais. Na home, exibir no máximo
  seis: fixados primeiro e data decrescente dentro de cada grupo. Sem comunicados,
  ocultar a seção.
  Exibir o corpo em texto escapado, com abertura nativa por `details`/`summary`.
  Exibir a data de publicação no fuso de São Paulo.

## Comandos e validação

As instruções do README para executar comandos de revisão e publicar são
destinadas à equipe humana; não autorizam o agente a ignorar as restrições abaixo.

- Não executar `check-all`, lint ou formatação, inclusive em modo de verificação
  ou chamando os executáveis diretamente. O usuário executa essas rotinas.
- Não rodar build, tipagem global ou suítes amplas como checklist automático.
  Usar verificações mais amplas apenas para diagnosticar um problema específico
  ou validar mudança de maior alcance; explicar o motivo e o resultado.
- Usar verificações direcionadas ao comportamento afetado. Não adicionar framework
  de testes para mudanças pequenas de conteúdo, marca ou configuração.
- Alterações apenas documentais não exigem testes.
- Em mudanças de interface, conferir o fluxo afetado quando viável. Informar quando
  não houver validação visual. Não corrigir código alheio para deixar checks verdes.
- Não editar manualmente arquivos gerados em `.astro/`, `dist/` ou dependências.
- Quando precisar iniciar servidor de desenvolvimento, usar modo de segundo plano:
  `pnpm exec astro dev --background`. Gerenciar com `pnpm exec astro dev status`,
  `pnpm exec astro dev logs` e `pnpm exec astro dev stop`. Não encerrar servidor
  iniciado pelo usuário.

## Documentação Astro

Consultar o guia oficial pertinente antes de alterar o comportamento relacionado:

- [Componentes](https://docs.astro.build/en/basics/astro-components/)
- [Rotas e endpoints estáticos](https://docs.astro.build/en/guides/routing/)
- [Estilos](https://docs.astro.build/en/guides/styling/)
- [Coleções de conteúdo, quando necessárias](https://docs.astro.build/en/guides/content-collections/)
- [Integrações com frameworks, quando solicitadas](https://docs.astro.build/en/guides/framework-components/)
