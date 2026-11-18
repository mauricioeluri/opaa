/** A left click without modifier keys, i.e. one that should stay in-page. */
export function isPlainClick(event: MouseEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

/** A click on a dialog's backdrop (the dialog element itself, outside its box). */
export function isBackdropClick(dialog: HTMLDialogElement, event: MouseEvent) {
  const bounds = dialog.getBoundingClientRect()
  return (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
}
