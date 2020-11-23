function createNullProxy(target: any): any {
  return new Proxy(target, {
    apply() {
      return null
    },
  })
}

/**
 * Disable all stdout from console.
 */
export function enableSilentConsole() {
  console.log = createNullProxy(console.log)
  console.warn = createNullProxy(console.warn)
  console.error = createNullProxy(console.error)
}
