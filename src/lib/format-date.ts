const dateFormatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })
const timestampFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
})

export function formatDate(date: string) {
  const formatter = date.includes('T') ? timestampFormatter : dateFormatter
  return formatter.format(new Date(date))
}
