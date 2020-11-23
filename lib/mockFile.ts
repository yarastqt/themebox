import Module from 'module'
import mockFs from 'mock-fs'

/**
 * Patch resolve filename for module.
 *
 * @param filename - Module filename
 */
function patchResolveFilename(filename: string): void {
  ;(Module as any)._resolveFilename = new Proxy((Module as any)._resolveFilename, {
    apply(target, thisArg, args) {
      if (args[0].startsWith(filename)) {
        return args[0]
      }
      return Reflect.apply(target, thisArg, args)
    },
  })
}

/**
 * Mock file at fs.
 *
 * @param filename - File name
 * @param content - File content
 */
export function mockFile(filename: string, content: string): void {
  patchResolveFilename(`./${filename}`)
  mockFs({ [filename]: content })
  // TODO: Dispose mock and patch.
}
