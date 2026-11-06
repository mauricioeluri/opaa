import { navigate } from 'astro:transitions/client'

export function attachRouteModal(
  dialog: HTMLDialogElement,
  path: string,
  returnPath: string,
  opener?: HTMLElement
) {
  let active = true
  dialog.addEventListener('close', () => {
    if (!active) return
    opener?.focus({ preventScroll: true })
    if (location.pathname !== path) return
    if (history.state?.routeModal) history.back()
    else navigate(returnPath, { history: 'replace' })
  })
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect()
    if (
      event.target === dialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom)
    ) dialog.close()
  })
  if (location.pathname === path) {
    dialog.removeAttribute('open')
    dialog.showModal()
  }
  return () => {
    active = false
    if (dialog.open) dialog.close()
  }
}
