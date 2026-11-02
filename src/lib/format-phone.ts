export function formatPhone(phone: string) {
  return phone.replace(/^\+55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}
