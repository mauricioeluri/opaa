export const organization = {
  name: 'OPAA Alegrete',
  legalName: 'Organização de Proteção Animal do Alegrete',
  title: 'OPAA Alegrete | Proteção animal em Alegrete, RS',
  description:
    'Desde março de 2009, a OPAA atua pela proteção animal em Alegrete, RS, com resgates, castração e vacinação. Ajude como sócio, voluntário ou lar temporário.',
  socialImage: '/branding/opaa-social.png',
  telephone: '+5555999844045',
  email: 'alegreteongopaa@gmail.com',
  address: {
    streetAddress: 'Rua Dr. Quintana, 120',
    addressLocality: 'Alegrete',
    addressRegion: 'RS',
    addressCountry: 'BR',
  },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '13:30',
      closes: '18:00',
    },
    { dayOfWeek: ['Saturday', 'Sunday'] },
  ],
  sameAs: [
    'https://www.facebook.com/ONG.OPAA',
    'https://www.instagram.com/ong.opaa/',
  ],
}

// List only published pages eligible for search indexing.
export const indexablePaths = ['/']
export const indexingEnabled = import.meta.env.SITE_INDEXABLE === 'true'
