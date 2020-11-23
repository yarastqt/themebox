import { promises } from 'fs'
import { resolve } from 'path'

const { readdir } = promises

/**
 * Simple implementation glob with generators.
 *
 * @param path - Path of directory
 */
export async function* glob(path: string): AsyncGenerator<string> {
  const dirents = await readdir(path, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(path, dirent.name)
    if (dirent.isDirectory()) {
      yield* glob(res)
    } else {
      yield res
    }
  }
}
