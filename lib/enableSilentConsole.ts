/**
 * Disable all stdout from console.
 */
export function enableSilentConsole() {
  const nullProxy = new Proxy(console.log, {
    apply() {
      return null
    },
  })

  console.log = nullProxy
  console.warn = nullProxy
  console.error = nullProxy
}
