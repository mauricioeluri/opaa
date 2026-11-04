<p align="center">
  <img src="public/branding/opaa-logo.svg" alt="Logo da OPAA Alegrete" width="140" />
</p>

# OPAA Alegrete

Site da Organização de Proteção Animal do Alegrete, uma ONG de Alegrete/RS.
O objetivo é divulgar animais, apresentar o trabalho da entidade e facilitar
adoções, doações e participação da comunidade.

O projeto está em construção. Começamos com uma página simples e identidade
visual da ONG. O conteúdo será mantido em arquivos locais JS/JSON e imagens no
repositório, sem banco de dados, API ou painel administrativo nesta etapa.

## O que usamos

| Ferramenta               | Para que serve                                                                    |
| ------------------------ | --------------------------------------------------------------------------------- |
| Astro                    | Monta as páginas e gera HTML estático para publicação.                            |
| HTML e CSS               | Definem a estrutura e a aparência das páginas.                                    |
| JavaScript e TypeScript  | Implementam comportamento e dados; TypeScript ajuda a identificar erros de tipos. |
| Node.js                  | Executa as ferramentas de desenvolvimento no computador.                          |
| pnpm                     | Instala dependências e executa os comandos do projeto.                            |
| Lucide (`@lucide/astro`) | Ícones SVG usados na interface.                                                   |
| Prettier e ESLint        | Padronizam a formatação e identificam problemas no código.                        |
| GitHub e Cloudflare      | Guardam o código e publicam o site, respectivamente.                              |

**Estático** significa que as páginas são geradas no build e servidas prontas aos
visitantes. Alterar conteúdo exige gerar e publicar uma nova versão, mas não
precisamos manter um servidor de aplicação ou banco funcionando.

## Como começar

1. Instale o [Node.js](https://nodejs.org/) em uma versão compatível com
   `package.json` (atualmente `>=22.23.4`) e o
   [pnpm](https://pnpm.io/installation).
2. Obtenha uma cópia do repositório e abra sua pasta no editor. Recomendamos
   VS Code com as extensões sugeridas pelo projeto: Astro, Prettier e ESLint.
3. Abra o terminal nessa pasta (onde está `package.json`) e execute:

   ```sh
   pnpm install
   pnpm dev
   ```

4. Acesse o endereço informado no terminal, normalmente
   `http://localhost:4321`. Ao salvar alterações, a página é atualizada.
   Use `Ctrl+C` no terminal para encerrar o servidor.

Não é necessário configurar banco, contas externas ou variáveis de ambiente para
começar a desenvolver localmente.

A tipografia combina Lilita One nos títulos principais e de seções com Nunito
Sans nos textos e controles. As duas fontes são servidas pelo próprio site.

## Onde editar

| Caminho                        | O que contém                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`        | Página inicial; arquivos em `pages` definem as rotas.                                         |
| `src/components/`              | Partes reutilizáveis da interface, como `Hero.astro`.                                         |
| `src/layouts/SiteLayout.astro` | Estrutura comum do documento HTML.                                                            |
| `src/data/api.json`            | Dados da ONG, animais, publicações e produtos.                                                |
| `src/lib/api.ts`               | Funções para consultar esse conteúdo.                                                         |
| `src/config/seo.ts`            | Indexação e lista de páginas para buscadores.                                                 |
| `public/branding/`             | Logo e ícones oficiais.                                                                       |
| `public/`                      | Arquivos públicos; `public/branding/opaa-logo.svg` é acessado como `/branding/opaa-logo.svg`. |

Um arquivo `.astro` combina HTML, estilos e, quando necessário, código entre
`---` no início. Esse código prepara a página durante a geração do site; ele não
é automaticamente enviado ao navegador.

`package.json` lista comandos e dependências. `pnpm-lock.yaml` registra as versões
resolvidas e deve acompanhar mudanças de dependências. Não edite manualmente
`node_modules/`, `.astro/` ou `dist/`: são pastas geradas pelas ferramentas.

## Dados locais

O arquivo `src/data/api.json` simula os dados de uma API; não exige servidor.
O objeto `organization` contém telefone, e-mail, redes sociais e chave
Pix (sem QR Code), acessados por `getOrganization()`. O campo `phone` guarda o
número internacional para chamadas e WhatsApp; o site monta os links quando
necessário. Não há um segundo número nem URL de WhatsApp armazenada. Facebook e Instagram
guardam apenas o username, sem `@`; `getSocialLinks()` monta os links para o
footer e o SEO.

Nome, descrição de SEO, endereço e slogan ficam em
`src/config/site.ts`. Cada informação tem uma única fonte. A API não inclui
mensalidade nem campos de apresentação. Os dados são lidos durante o build,
sem consultas à API a cada visita ou pesquisa no Google.

O cadastro da filhote usa informações e fotos fornecidas pela equipe. Publicação,
produto, preço e data da publicação ainda são demonstrativos; substitua por dados
confirmados antes de exibi-los como reais.

A seção de doações mostra um convite para contribuir e a chave Pix, sem metas,
valores arrecadados ou integração bancária. A chave pode ser consultada sem
JavaScript; a cópia automática usa JavaScript.

Consulte os dados pelo módulo `src/lib/api.ts`. Exemplo no início de uma página
Astro (entre `---`):

```ts
import { getAllAnimals } from '../lib/api'

const animals = await getAllAnimals()
```

Existem funções `getAllAnimals`, `getAllPosts` e `getAllProducts`.
As funções `getSingleAnimal`, `getSinglePost` e
`getSingleProduct` recebem o `public_id` e retornam um registro ou `null`.
As listas retornam todos os registros; a página decide quais estão disponíveis.
A landing page exibe os dois animais com `available: true` publicados mais
recentemente, usando `published_at`, e oculta a seção quando não há nenhum.
Esse limite é só da landing page;
`getAllAnimals()` continua retornando todos os cadastros.
Informe `published_at` em ISO 8601 com fuso, como `2026-11-04T12:00:00-03:00`.
As datas atuais dos animais são demonstrativas; substitua pelas datas reais de
publicação. Em caso de empate, mantém-se a ordem do JSON.
Cada cadastro recebe de uma a três imagens prontas no campo
`images`, exibidas em um slider, e usa o contato da ONG.
Os sliders compartilham `PhotoSlider.astro`: navegação por arraste, toque, teclado
ou pontinhos. Apenas o slider da abertura troca fotos automaticamente.

No cadastro do animal, `name` pode ser `null` quando não houver nome. A fonte de
dados fornece `title` e `description` prontos: o título pode ser o nome ou, por
exemplo, “Fêmea · Filhote”. O site não monta títulos nem repete as características
em uma segunda linha. O código `public_id` identifica o animal no contato.
Não invente nomes para preencher o campo.
`age` já chega pronto para exibição, como “Filhote”, “3 anos (estimados)” ou
“8 meses”; o site não calcula idade. `isMale` aceita `true` para macho,
`false` para fêmea ou `null` quando não informado; `neutered` aceita `true`,
`false` ou `null`. Use `null`
também para idade desconhecida. Esses campos ficam disponíveis para a fonte de
dados preparar o título e a descrição; o site não gera selos ou textos a partir
deles. História e cuidados podem ficar em `description`.
`breed` é opcional: informe a raça somente quando confirmada; caso contrário,
use `null` ou omita o campo. A fonte de dados decide se a raça entra no título
ou na descrição.
Use fotos reais dos animais, sem filtros de IA ou artes de publicações.
Quando não houver foto, a fonte de dados deve enviar
`images: ["/animals/default.webp"]`. O site apenas exibe os caminhos recebidos;
não escolhe imagem padrão nem completa a lista de fotos.

Valores monetários estão em centavos. Imagens usam caminhos públicos como
`/branding/opaa-logo.svg`, sem o prefixo `public/`.

## Comandos do dia a dia

Execute sempre na raiz do projeto:

| Comando          | O que faz                                                       |
| ---------------- | --------------------------------------------------------------- |
| `pnpm dev`       | Inicia o site para desenvolver localmente.                      |
| `pnpm format`    | Aplica a formatação padrão.                                     |
| `pnpm lint`      | Analisa o código e aplica as correções automáticas disponíveis. |
| `pnpm check-all` | Executa lint, formatação e verificação de tipos.                |
| `pnpm build`     | Gera a versão de publicação em `dist/`.                         |
| `pnpm preview`   | Permite conferir localmente o resultado do build.               |

Antes de entregar uma alteração, execute `pnpm check-all` e confira o fluxo
alterado no navegador, incluindo uma largura de celular. O comando modifica
arquivos; revise o resultado e corrija os problemas que exigirem intervenção.
Para conferir a versão de publicação, execute `pnpm build` e depois `pnpm preview`.
Não há suíte de testes automatizados configurada neste estágio.

## Configuração e publicação

O repositório já está integrado à Cloudflare: alterações enviadas à branch `main`
podem disparar a publicação. Combine as mudanças com a equipe antes de enviá-las.
O arquivo `wrangler.jsonc` indica que a pasta publicada é `dist/`.

Para configurar os buscadores, copie `.env.example` para `.env`, sem sobrescrever
um arquivo existente. Na Cloudflare, configure as variáveis no ambiente de build:

- `SITE_URL`: origem HTTPS do domínio definitivo, sem subdiretórios.
- `SITE_INDEXABLE`: mantenha `false` durante a construção. Use `true` somente
  quando o site estiver pronto e `SITE_URL` estiver definido.
- `GOOGLE_SITE_VERIFICATION` e `BING_SITE_VERIFICATION`: códigos opcionais de
  verificação fornecidos pelos serviços; podem ficar vazios.

Essas configurações são aplicadas no build. Não envie `.env` com credenciais ao
repositório nem coloque informações privadas em arquivos públicos. A opção de
não indexar orienta buscadores; ela não torna o site privado.

## Combinados da equipe

- Código, identificadores, nomes de arquivos novos e comentários em inglês;
  comunicação, interface, validações e documentação em português. Componentes e
  layouts Astro em PascalCase; outros arquivos novos e rotas em kebab-case.
  Preservar nomes oficiais e arquivos de marca existentes.
- Preferir soluções simples, HTML semântico e CSS local. Reutilizar componentes
  sem criar camadas ou instalar bibliotecas desnecessárias.
- Preservar o logo e usar apenas contatos, fotos e informações confirmados pela ONG.
- Seguir o [kit de marca](docs/brand-guide.md) para logos, cores, fontes e ícones.
- O arquivo `AGENTS.md` contém orientações específicas para assistentes de IA,
  incluindo limites para Git, publicação e execução de verificações.

Para aprender mais, comece pelo
[tutorial oficial do Astro](https://docs.astro.build/pt-br/tutorial/0-introduction/).
