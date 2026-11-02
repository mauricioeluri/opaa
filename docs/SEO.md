# Manutenção do SEO

Para instalar o projeto e configurar as variáveis de ambiente, consulte o
[README](../README.md#configuração-e-publicação).

## Onde alterar

- `src/config/site.ts`: nome, descrição de SEO, endereço, título e slogan.
- `src/data/api.json`, objeto `organization`: telefone, e-mail, redes
  sociais e chave Pix. O SEO consulta os campos relevantes por `getOrganization()`
  durante o build, nunca a cada pesquisa no Google.
- `src/config/seo.ts`: ativação da indexação e lista de páginas do sitemap.
- `src/components/SEO.astro`: metadados para buscadores e compartilhamento,
  canonical (URL oficial da página) e dados estruturados da ONG em JSON-LD.
- `src/layouts/SiteLayout.astro`: recebe `title`, `description` e `noindex` de cada página.

## Ao criar uma página

1. Use o layout com título e descrição específicos para o conteúdo.
2. Adicione a rota a `indexablePaths` em `src/config/seo.ts` se ela estiver pronta
   para aparecer nas buscas. O sitemap não descobre páginas automaticamente.
3. Para uma página que não deve ser indexada, passe `noindex` ao layout e não
   inclua sua rota no sitemap. Não adicione rascunhos ou redirecionamentos à lista.

O canonical usa o domínio configurado e o caminho da página, sem parâmetros de
consulta. Preserve a convenção de URLs com barra final.

## Antes de liberar a indexação

- Defina o domínio definitivo em `SITE_URL` e ative `SITE_INDEXABLE=true` somente
  no build de produção, quando o conteúdo estiver pronto. Previews devem manter
  `false`. Mudanças nessas variáveis exigem novo build e publicação.
- Confira no resultado publicado o título, a descrição, o canonical,
  `/robots.txt` e `/sitemap.xml`. Verifique se apontam para o domínio correto.
- Valide os dados estruturados no [Schema Markup Validator](https://validator.schema.org/)
  e confira a prévia ao compartilhar links.
- Verifique a propriedade do site no Google Search Console e, se utilizado,
  Bing Webmaster Tools, seguindo o método fornecido pelo serviço. Use apenas
  códigos reais nas variáveis de verificação. Depois, envie `/sitemap.xml`.

Sem indexação ativa, o HTML contém `noindex, follow` e o sitemap fica vazio.
O robots permite rastreamento para que buscadores leiam o `noindex`; isso não
restringe acesso nem torna o site privado.

## Pronto no projeto

Nome, descrição, endereço e horários estão em `src/config/site.ts`; contatos
e perfis vêm de `src/data/api.json`. Cada dado tem uma única fonte.
Não é necessário digitá-los novamente na publicação.

A imagem `public/branding/opaa-social.png` (1200 × 630) já usa o logo definitivo
aprovado e está configurada para Open Graph e Twitter Card grande.

## Dados a preencher na publicação

| Campo na Cloudflare (ambiente de build) | Valor |
| --- | --- |
| `SITE_URL` | Domínio HTTPS definitivo, ainda não informado. |
| `SITE_INDEXABLE` | `true` na produção pronta; `false` nos previews. |
| `GOOGLE_SITE_VERIFICATION` | Código fornecido pelo Search Console, se usar verificação por meta tag. |
| `BING_SITE_VERIFICATION` | Código fornecido pelo Bing, se utilizar esse serviço e método. |

Na verificação por meta tag, copie apenas o valor de `content`, não a tag inteira.
Se a verificação for por DNS, deixe os códigos vazios e cadastre o registro
fornecido pelo serviço no provedor do domínio. Eles não bloqueiam a indexação.
O endereço do sitemap a enviar é o domínio definitivo seguido de `/sitemap.xml`.

O domínio e os códigos dependem da hospedagem e das contas externas; não podem
ser deduzidos dos contatos da ONG. A indexação permanece desligada até o lançamento.
