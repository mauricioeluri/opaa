# Kit de marca — OPAA Alegrete

[Versão em PDF para compartilhar](../output/pdf/opaa-brand-kit.pdf).

Referência simples para o site e materiais digitais: visual claro, acolhedor e
legível, com verde como destaque e fotos dos animais em evidência.

## Nome e assinatura

- Nome de apresentação: **OPAA Alegrete**.
- Nome institucional: Organização de Proteção Animal do Alegrete – ONG OPAA.
- Assinatura: **Juntos pela proteção animal.**

## Logo e ícones da marca

A versão atual do logo é definitiva e aprovada. Usar os arquivos existentes em
`public/branding/`, preservando a marca em preto e branco.

| Arquivo                     | Uso                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `opaa-logo.svg`             | Logo completo no site e em materiais digitais. Preferir SVG para manter a qualidade em qualquer tamanho. |
| `opaa-icon.svg`             | Símbolo compacto da patinha, especialmente em espaços pequenos e no favicon.                             |
| `opaa-icon.ico`             | Favicon de compatibilidade do navegador.                                                                 |
| `opaa-apple-touch-icon.png` | Ícone ao adicionar o site à tela inicial de dispositivos Apple.                                          |
| `opaa-social.png`           | Prévia de links compartilhados; não substitui o logo principal.                                          |

Não esticar, recortar, recolorir, aplicar sombras ou redesenhar o logo. Preservar
sua proporção e um espaço livre ao redor. Preferir fundos claros e uniformes;
evitar colocá-lo sobre detalhes de uma fotografia que prejudiquem a leitura.

## Cores

Esta é a paleta definida para o site; não representa um manual oficial anterior
da ONG. O verde é inspirado nos materiais enviados pela equipe.

| Cor               | Código    | Aplicação                                             |
| ----------------- | --------- | ----------------------------------------------------- |
| Verde principal   | `#176B42` | Ações principais, links e destaques pontuais.         |
| Verde escuro      | `#105333` | Hover e estado pressionado de ações verdes.           |
| Verde muito claro | `#EDF4EE` | Footer, hover de navegação e fundos suaves de seções. |
| Branco suave      | `#FAFAF7` | Fundo principal da página.                            |
| Branco            | `#FFFFFF` | Cards e texto sobre verde principal ou escuro.        |
| Preto suave       | `#292929` | Títulos, textos e ícones.                             |
| Cinza             | `#626962` | Textos secundários, legendas e informações de apoio.  |

Priorizar áreas claras, texto escuro e verde nas ações. Usar texto branco nos
botões verdes; evitar verde claro ou cinza como fundo de texto branco.
O rosa pode aparecer nas fotos e camisetas da ONG, sem virar uma segunda cor de
destaque da interface. Não recolorir fotografias para fazê-las seguir a paleta.

## Tipografia

Combinar duas famílias, com funções claras:

- **Lilita One:** títulos principais e de seções, incluindo o título dos posts.
  Usar o peso original 400; o desenho já é encorpado, sem negrito artificial.
- **Nunito Sans:** parágrafos, listas, legendas, contatos, navegação e botões.
  Usar regular (400) para leitura e bold (700) para destaques e subtítulos menores.

Em um post, o título usa Lilita One e o corpo usa Nunito Sans. Isso aproxima os
chamados da aparência amigável do logo, preservando a leitura de textos longos.
O logo original permanece intacto.

Obter as fontes para materiais externos no Google Fonts:
[Lilita One](https://fonts.google.com/specimen/Lilita+One) e
[Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans).

| Elemento                                | Fonte       | Tamanho de referência                  | Peso |
| --------------------------------------- | ----------- | -------------------------------------- | ---- |
| Título principal e de post (h1)         | Lilita One  | 32 px no celular; até 48 px no desktop | 400  |
| Título de seção (h2)                    | Lilita One  | 24–32 px                               | 400  |
| Subtítulo menor (h3)                    | Nunito Sans | 16–20 px                               | 700  |
| Texto principal                         | Nunito Sans | 16 px                                  | 400  |
| Navegação e botões                      | Nunito Sans | 15–16 px                               | 400  |
| Contatos e legendas                     | Nunito Sans | 14 px                                  | 400  |
| Metadados curtos, como CNPJ e copyright | Nunito Sans | 12 px                                  | 400  |

Os títulos utilitários do footer permanecem compactos (16 px), usando Lilita One.
Usar entrelinha de aproximadamente 1,5 a 1,6 para textos e 1,2 para títulos.
Preferir títulos em caixa normal, sem textos longos inteiramente em maiúsculas.
Não usar Lilita One em parágrafos ou misturar outras famílias. Ajustar tamanhos
à tela sem cortes ou rolagem horizontal.

## Ícones e apresentação

- **Lucide (`@lucide/astro`)** para ícones de interface, como menu, fechar,
  e-mail e localização.
- **SVGs locais em `public/icons/`** para WhatsApp, Facebook e Instagram.
- Todos os ícones usam a cor do texto por `currentColor`. Nos ícones sociais,
  usar máscara CSS para herdar a mesma cor dos ícones Lucide.
- Preferir ícones de 18–20 px junto ao texto e manter o mesmo tamanho e
  alinhamento dentro de cada grupo. Links e botões precisam de foco visível.
- Manter espaçamentos consistentes entre itens equivalentes. No footer, o espaço
  visual entre os itens é de 20 px.
- Todo o site deve ser responsivo. Em telas pequenas, empilhar blocos quando
  necessário; não reduzir o texto apenas para manter colunas lado a lado.

## Kit público: “Marca da OPAA”

O guia dos desenvolvedores orienta a implementação; a página pública deve ajudar
voluntários e parceiros a divulgar a ONG. Usar o cabeçalho e footer existentes,
com acesso por “Kit de marca” no rodapé. A estrutura prevista é:

1. **Logo para baixar:** introdução “Ajude a divulgar a OPAA”, prévias do logo e
   da patinha e downloads SVG. Explicar que SVG preserva a qualidade ao ampliar.
2. **Nossas cores:** amostras com nome, código e ação para copiar. Destacar verde,
   verde escuro, verde claro, branco e preto; cores auxiliares em segundo plano.
3. **Nossas fontes:** exemplos de títulos em Lilita One e textos em Nunito Sans
   regular e bold, com links para obter as duas famílias.
4. **Como usar:** exemplos simples de proporção, contraste e preservação das
   cores, seguidos do download da imagem de compartilhamento pronta.

Usar os arquivos existentes, sem novas versões de logo, fundos ou formulários.
Empilhar os elementos no celular. O conteúdo público deve usar linguagem simples,
sem detalhes de CSS, pacotes ou estrutura do projeto.

## Aplicação no código

A paleta e as fontes ficam em `src/styles/global.css`, importado pelo layout.
Usar as variáveis `--color-primary`, `--color-primary-hover`, `--color-soft`,
`--color-background`, `--color-surface`, `--color-text` e `--color-muted`.
Bordas usam `--color-border`, um tom suave derivado do verde.

As fontes são servidas localmente: `@fontsource/lilita-one` (400) e
`@fontsource/nunito-sans` (400 e 700), no subconjunto latino. Não há chamadas ao
Google Fonts durante a visita. O CSS aplica Lilita One a h1/h2 e Nunito Sans aos
demais textos; títulos novos devem seguir essa hierarquia.
