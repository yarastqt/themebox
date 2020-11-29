import { readFileSync } from 'fs'
import { join, extname, basename } from 'path'
import { Api, InternalApi } from '@yandex/themekit'
import { createStyleDictionaryConfig } from '@yandex/themekit/lib/core/style-dictionary-config'

import { glob } from './glob'
import { mockFile } from './mockFile'

export { version } from '@yandex/themekit/package.json'

// Extends themekit module with internal API.
declare module '@yandex/themekit' {
  export const InternalApi: any
}

type Result = {
  content: string
  fileName: string
  language: string
}

/**
 * Runs themekit build with mocked fs.
 *
 * @param config - Themekit config
 * @param tokens - Tokens object
 */
export async function buildThemekit(config: any, tokens: any): Promise<Result[]> {
  mockFile('tokens.json', JSON.stringify(tokens))

  // TODO: Register this format in themekit.
  Api.registerFormat({
    name: 'json/extended',
    formatter(dictionary) {
      const result: Record<string, any> = {}
      for (const prop of dictionary.allProperties) {
        result[prop.name] = {
          name: prop.name,
          value: prop.value,
          path: prop.path,
          comment: prop.comment,
        }
      }
      return JSON.stringify(result, null, 2)
    },
  })

  InternalApi.extend(
    createStyleDictionaryConfig({
      platform: 'common',
      sources: ['tokens.json'],
      entry: 'default',
      output: config.output,
    }),
  ).buildAllPlatforms()

  const data = []

  for (const key in config.output) {
    const buildPath = config.output[key].buildPath
    for await (const file of glob(buildPath)) {
      const localFileName = join(buildPath, basename(file))
      const extension = extname(file).replace(/^./, '')
      const content = readFileSync(file, 'utf-8')
      data.push({ fileName: localFileName, language: extension, content })
    }
  }

  return data
}
