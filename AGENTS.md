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
- Código, identificadores, arquivos novos e comentários em inglês. Comunicação,
  documentação, interface e mensagens de validação em português. Preservar nomes
  oficiais e nomes existentes dos arquivos de marca.
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
| `public/`          | Arquivos servidos diretamente, sem processamento          |

- Usar PascalCase para componentes e layouts Astro; kebab-case para demais
  arquivos novos e rotas. Seguir convenções existentes em cada área.
- Dois espaços, aspas simples, sem ponto e vírgula e finais de linha LF, seguindo
  `.prettierrc` e `eslint.config.mjs`.
- Manter `astro/tsconfigs/strict`. Não usar `any`, desativar regras ou suprimir
  verificações para esconder defeitos.
- Preferir HTML nativo e CSS local dos componentes Astro. JavaScript no navegador
  apenas para interações que precisem dele. Não adicionar React ou Tailwind por
  padrão.
- Entregar conteúdo relevante no HTML gerado, sem depender exclusivamente de
  carregamento no navegador. Mudanças nos dados locais exigem novo build/deploy.
- Separar dados da apresentação quando introduzir conteúdo. Funções simples que
  importam JS/JSON bastam; não criar servidor para ler arquivos locais.
- Preservar configuração de SEO, canonical, barras finais das URLs, sitemap e
  robots ao modificar páginas. Não inventar domínio de produção nem contornar
  validações de ambiente.

## Escopo e conteúdo

- Adoção, associação, voluntariado, lar temporário e encomendas encaminham aos
  contatos confirmados da ONG. Não inventar telefones, endereços ou links.
- Pix usa informações fixas confirmadas. Não simular confirmação de pagamento.
- A seção de doações mostra apenas o convite e a chave Pix. Não adicionar metas,
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
- Preservar proporções de imagens e informar dimensões quando conhecidas para
  evitar deslocamentos de layout.
- Usar links para navegação e botões para ações. Não criar links sem destino,
  controles sem função ou mensagens de sucesso sem uma ação concluída.
- Usar `organization` em `src/data/api.json`, via `getOrganization()`, como única
  fonte de telefone, e-mail, redes sociais e chave Pix. `phone` é o
  número internacional usado para chamadas e WhatsApp; URLs são montadas pelo site.
  Manter nome, descrição de SEO, endereço, horários, título e slogan em
  `src/config/site.ts`, sem cópias na API. Referenciar logos e ícones diretamente
  nos componentes; não criar configuração para caminhos de arquivos estáticos. Não incluir
  mensalidade ou QR Code Pix na API. Novos campos exigem necessidade concreta.
- Centralizar contatos e textos compartilhados quando reutilizados. Não criar
  sistema de configuração ou editor para cada informação.

## Comandos e validação

As instruções do README para executar comandos de revisão e publicar são
destinadas à equipe humana; não autorizam o agente a ignorar as restrições abaixo.

Scripts disponíveis para o usuário:

| Comando          | Finalidade                                             |
| ---------------- | ------------------------------------------------------ |
| `pnpm dev`       | Iniciar desenvolvimento local                          |
| `pnpm build`     | Gerar o site estático em `dist/`                       |
| `pnpm preview`   | Conferir localmente o site gerado                      |
| `pnpm format`    | Formatar arquivos                                      |
| `pnpm lint`      | Executar ESLint com correções automáticas              |
| `pnpm check-all` | Executar lint, formatação e verificação de tipos Astro |

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
