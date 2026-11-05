export const site = {
  name: 'OPAA Alegrete',
  institution: 'Organização de Proteção Animal do Alegrete – ONG OPAA',
  cnpj: '10.825.728/0001-06',
  description:
    'Desde março de 2009, a OPAA atua pela proteção animal em Alegrete, RS, com resgates, castração e vacinação. Ajude como sócio, voluntário ou lar temporário.',
  address: {
    streetAddress: 'Rua Dr. Quintana, 120, sala 01, bairro Centro',
    addressLocality: 'Alegrete',
    addressRegion: 'RS',
    addressCountry: 'BR',
    postalCode: '97541-160',
  },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '13:30',
      closes: '18:00',
    },
    { dayOfWeek: ['Saturday', 'Sunday'] },
  ],
  title: 'OPAA Alegrete | Proteção animal em Alegrete, RS',
  slogan: 'Juntos pela proteção animal',
  facebook: 'ong.opaa',
  instagram: 'ong.opaa',
  heroSlides: [
    {
      src: '/images/slide-1.jpg',
      alt: 'Membros da OPAA reunidos com balões que representam os resultados de 2025',
      caption:
        'Parceria com a Prefeitura: em 2025, foram 981 castrações e 338 adoções.',
    },
    {
      src: '/images/slide-2.jpg',
      alt: 'Grupo reunido durante a realização de um galeto beneficente da OPAA',
      caption:
        'Galeto beneficente: a comunidade reunida para apoiar a proteção animal.',
    },
  ],
}
