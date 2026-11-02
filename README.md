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

| Ferramenta | Para que serve |
| --- | --- |
| Astro | Monta as páginas e gera HTML estático para publicação. |
| HTML e CSS | Definem a estrutura e a aparência das páginas. |
| JavaScript e TypeScript | Implementam comportamento e dados; TypeScript ajuda a identificar erros de tipos. |
| Node.js | Executa as ferramentas de desenvolvimento no computador. |
| pnpm | Instala dependências e executa os comandos do projeto. |
| Lucide (`@lucide/astro`) | Ícones SVG usados na interface. |
| Prettier e ESLint | Padronizam a formatação e identificam problemas no código. |
| GitHub e Cloudflare | Guardam o código e publicam o site, respectivamente. |

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

## Onde editar

| Caminho | O que contém |
| --- | --- |
| `src/pages/index.astro` | Página inicial; arquivos em `pages` definem as rotas. |
| `src/components/` | Partes reutilizáveis da interface, como `Hero.astro`. |
| `src/layouts/SiteLayout.astro` | Estrutura comum do documento HTML. |
| `src/data/api.json` | Dados da ONG, animais, publicações, produtos e meta. |
| `src/lib/api.ts` | Funções para consultar esse conteúdo. |
| `src/config/seo.ts` | Indexação e lista de páginas para buscadores. |
| `public/branding/` | Logo e ícones oficiais. |
| `public/` | Arquivos públicos; `public/branding/opaa-logo.svg` é acessado como `/branding/opaa-logo.svg`. |

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

Mantemos um exemplo de animal, publicação e produto, além de uma meta mensal.
Animal, produto, preço, data da publicação e valores da meta são demonstrativos;
substitua por dados confirmados antes de exibi-los como reais. Os fatos sobre a
ONG no texto da publicação foram fornecidos pela equipe.

Consulte os dados pelo módulo `src/lib/api.ts`. Exemplo no início de uma página
Astro (entre `---`):

```ts
import { getAllAnimals } from '../lib/api'

const animals = await getAllAnimals()
```

Existem funções `getAllAnimals`, `getAllPosts`, `getAllProducts` e
`getMonthlyGoal`. As funções `getSingleAnimal`, `getSinglePost` e
`getSingleProduct` recebem o `public_id` e retornam um registro ou `null`.
As listas retornam todos os registros; a página decide quais estão disponíveis.
Valores monetários estão em centavos. Imagens usam caminhos públicos como
`/branding/opaa-logo.svg`, sem o prefixo `public/`.

## Comandos do dia a dia

Execute sempre na raiz do projeto:

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Inicia o site para desenvolver localmente. |
| `pnpm format` | Aplica a formatação padrão. |
| `pnpm lint` | Analisa o código e aplica as correções automáticas disponíveis. |
| `pnpm check-all` | Executa lint, formatação e verificação de tipos. |
| `pnpm build` | Gera a versão de publicação em `dist/`. |
| `pnpm preview` | Permite conferir localmente o resultado do build. |

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
- O arquivo `AGENTS.md` contém orientações específicas para assistentes de IA,
  incluindo limites para Git, publicação e execução de verificações.

Para aprender mais, comece pelo
[tutorial oficial do Astro](https://docs.astro.build/pt-br/tutorial/0-introduction/).
