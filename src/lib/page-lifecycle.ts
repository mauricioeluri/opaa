export function onPageLoad(setup: () => void | (() => void)) {
  let cleanup: void | (() => void)

  document.addEventListener('astro:page-load', () => {
    if (cleanup) cleanup()
    cleanup = setup()
  })

  document.addEventListener('astro:before-swap', () => {
    if (cleanup) cleanup()
    cleanup = undefined
  })
}
