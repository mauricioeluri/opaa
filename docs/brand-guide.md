# Kit de marca — OPAA Alegrete

[PDF para compartilhar](../public/docs/opaa-brand-kit.pdf).

Visual acolhedor, claro e legível. Usar verde como destaque e fotos reais dos
animais, sem filtros de IA.

## Marca

- **Nome:** OPAA Alegrete.
- **Nome institucional:** Organização de Proteção Animal do Alegrete – ONG OPAA.
- **Assinatura:** Juntos pela proteção animal.

Usar os arquivos aprovados em `public/branding/`:

| Arquivo                     | Uso                             |
| --------------------------- | ------------------------------- |
| `opaa-logo.svg`             | Logo completo.                  |
| `opaa-icon.svg`             | Patinha e favicon SVG.          |
| `opaa-icon.ico`             | Favicon de compatibilidade.     |
| `opaa-apple-touch-icon.png` | Ícone para dispositivos Apple.  |
| `opaa-social.png`           | Prévia de links compartilhados. |

Preservar proporção, cores e espaço ao redor. Não esticar, recortar, recolorir ou
redesenhar o logo. Preferir fundos claros e uniformes.

## Cores

A implementação usa as variáveis de `src/styles/global.css`; não repetir valores
hexadecimais nos componentes nem criar novas cores sem combinar com a equipe.

| Variável                | Cor       | Uso                         |
| ----------------------- | --------- | --------------------------- |
| `--color-primary`       | `#176B42` | Ações, links e destaques.   |
| `--color-primary-hover` | `#105333` | Hover e estado pressionado. |
| `--color-soft`          | `#EDF4EE` | Fundos suaves e footer.     |
| `--color-background`    | `#FAFAF7` | Fundo da página.            |
| `--color-surface`       | `#FFFFFF` | Cards e texto sobre verde.  |
| `--color-text`          | `#292929` | Texto principal e ícones.   |
| `--color-muted`         | `#626962` | Texto secundário.           |

Bordas usam `--color-border`, derivado da paleta. Garantir contraste: texto branco
sobre verde principal ou escuro; texto escuro sobre fundos claros. O rosa pode
aparecer nas fotos, sem virar outra cor de destaque da interface.

## Fontes

- **Lilita One 400:** h1/h2, sem negrito artificial. Referência: h1 de 32–48 px e
  h2 de 24–32 px; títulos utilitários do footer ficam em 16 px.
- **Nunito Sans 400:** textos (16 px), botões e navegação (15–16 px), contatos
  (14 px) e metadados (12 px). Usar 700 nos destaques e h3 (16–20 px).
- Herdar as fontes globais. Entrelinha próxima de 1,6 nos textos e 1,2 nos títulos.
  As fontes são servidas localmente por Fontsource.

Para materiais externos: [Lilita One](https://fonts.google.com/specimen/Lilita+One)
e [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans).

## Ícones e espaçamento

Usar Lucide para interface e os SVGs de `public/icons/` para marcas sociais.
Todos herdam a cor por `currentColor`; marcas sociais usam máscara CSS.

Manter espaçamentos consistentes, foco visível e alvos fáceis de clicar. No footer,
o espaço visual entre itens é de 20 px. Adaptar colunas para telas pequenas sem
reduzir a legibilidade. O guia em Markdown orienta a implementação; o PDF é a
versão de compartilhamento.
