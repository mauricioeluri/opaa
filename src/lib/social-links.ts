export function getSocialLinks(facebook: string, instagram: string) {
  return [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/${encodeURIComponent(facebook)}`,
    },
    {
      label: 'Instagram',
      href: `https://www.instagram.com/${encodeURIComponent(instagram)}`,
    },
  ]
}
