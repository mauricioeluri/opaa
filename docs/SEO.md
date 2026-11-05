# SEO

O site já tem descrição, metadados de compartilhamento, dados da ONG, sitemap e
robots. Essas informações são geradas no build, sem consultar uma API durante
pesquisas no Google.

## Onde alterar

- `src/config/site.ts`: título, descrição, contatos, endereço, horários e redes sociais.
- `src/config/seo.ts`: indexação e rotas do sitemap.
- Páginas dos animais disponíveis entram automaticamente no sitemap.
- `src/components/SEO.astro`: implementação dos metadados.
- `public/branding/opaa-social.png`: prévia de compartilhamento (1200 × 630).
- Páginas individuais usam a primeira foto do animal na prévia. O WhatsApp decide
  se exibe a imagem; a página e a foto precisam estar acessíveis publicamente.

## Publicação

Use `.env.example` como referência. Configure no ambiente de build da Cloudflare:

| Variável                   | Valor                                                       |
| -------------------------- | ----------------------------------------------------------- |
| `SITE_URL`                 | Domínio HTTPS definitivo, sem caminho. Ainda não informado. |
| `SITE_INDEXABLE`           | `true` na produção pronta; `false` nos previews.            |
| `GOOGLE_SITE_VERIFICATION` | Código do Search Console, se usar meta tag.                 |
| `BING_SITE_VERIFICATION`   | Código do Bing, se usar meta tag.                           |

Os códigos de verificação são opcionais; com verificação por DNS, deixe-os vazios.
Na meta tag, copie somente o valor de `content`. Alterar variáveis exige novo build.
`SITE_URL` também define o domínio do link enviado na mensagem de adoção pelo
WhatsApp. Configure-o antes de publicar; localmente, esse link usa o servidor local.

Antes de ativar a indexação, confirme o conteúdo e confira título, descrição,
canonical, `/robots.txt` e `/sitemap.xml` no domínio publicado. Depois, envie o
sitemap ao Search Console. Sem indexação ativa, o HTML usa `noindex, follow` e o
sitemap fica vazio; isso não torna o site privado.

## Novas páginas

Use `SiteLayout` com título e descrição próprios. Inclua a rota em `indexablePaths`
quando estiver pronta para buscas, preservando a barra final. Páginas com
`noindex` devem ficar fora do sitemap, mas não bloqueadas no robots.
