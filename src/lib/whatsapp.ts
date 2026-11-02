export function getWhatsAppUrl(phone: string, message?: string) {
  const url = new URL('https://api.whatsapp.com/send')
  url.searchParams.set('phone', phone.replace(/\D/g, ''))

  if (message) url.searchParams.set('text', message)

  return url.href
}
