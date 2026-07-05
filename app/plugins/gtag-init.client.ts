/** Defer GA4 until the browser is idle to reduce main-thread work during LCP. */
export default defineNuxtPlugin(() => {
  const { initialize } = useGtag()

  const run = () => {
    initialize()
  }

  if ('requestIdleCallback' in window)
    requestIdleCallback(run, { timeout: 3500 })
  else
    setTimeout(run, 2500)
})
