import { navigate } from 'astro:transitions/client'
import { isBackdropClick } from './dom-events'

type ModalEntry = {
  dialog: HTMLDialogElement
  opener?: HTMLElement
}

const modals = new Map<string, ModalEntry>()
let backgroundUrl = ''
let frozen: { x: number; y: number; style: string | null } | undefined

const currentModal = () => modals.get(location.pathname.replace(/\/?$/, '/'))

function freezePage() {
  if (frozen) return
  frozen = {
    x: scrollX,
    y: scrollY,
    style: document.body.getAttribute('style'),
  }
  Object.assign(document.body.style, {
    position: 'fixed',
    top: `-${frozen.y}px`,
    left: `-${frozen.x}px`,
    width: '100%',
  })
}

function unfreezePage() {
  if (!frozen) return
  const { x, y, style } = frozen
  frozen = undefined
  if (style === null) document.body.removeAttribute('style')
  else document.body.setAttribute('style', style)
  window.scrollTo({ left: x, top: y, behavior: 'instant' })
}

function syncWithUrl() {
  const current = currentModal()
  if (current) freezePage()
  modals.forEach(({ dialog }) => {
    if (dialog !== current?.dialog && dialog.open) dialog.close()
  })
  if (current && !current.dialog.open) {
    current.dialog.scrollTop = 0
    current.dialog.showModal()
  }
  if (!current) unfreezePage()
}

function handleHistory(event: Event) {
  if (currentModal() || location.href === backgroundUrl) {
    event.preventDefault()
    syncWithUrl()
  } else unfreezePage()
}

export function openRouteModal(
  path: string,
  opener?: HTMLElement,
  replace = false
) {
  const entry = modals.get(path)
  if (!entry) return false
  entry.opener = opener ?? (replace ? currentModal()?.opener : entry.opener)
  if (replace) history.replaceState(history.state, '', path)
  else history.pushState({ ...history.state, routeModal: true }, '', path)
  syncWithUrl()
  return true
}

export function attachRouteModal(
  dialog: HTMLDialogElement,
  path: string,
  returnPath: string,
  opener?: HTMLElement
) {
  if (modals.size === 0) {
    backgroundUrl = location.href
    window.addEventListener('route-modal:history', handleHistory)
  }
  const entry = { dialog, opener }
  modals.set(path, entry)
  const controller = new AbortController()
  const { signal } = controller
  dialog.addEventListener(
    'close',
    () => {
      if (currentModal()?.dialog !== dialog) return
      entry.opener?.focus({ preventScroll: true })
      if (history.state?.routeModal) history.back()
      else {
        unfreezePage()
        navigate(returnPath, { history: 'replace' })
      }
    },
    { signal }
  )
  dialog.addEventListener(
    'click',
    (event) => {
      if (isBackdropClick(dialog, event)) dialog.close()
    },
    { signal }
  )
  dialog.removeAttribute('open')
  if (currentModal()?.dialog === dialog) {
    freezePage()
    dialog.showModal()
  }
  return () => {
    controller.abort()
    modals.delete(path)
    if (dialog.open) dialog.close()
    if (modals.size === 0) {
      window.removeEventListener('route-modal:history', handleHistory)
      unfreezePage()
    }
  }
}
