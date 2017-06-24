import * as fs from 'fs'
import * as path from 'path'
import * as AppRootDir from 'app-root-dir'

const rootDir = AppRootDir.get()

export interface FontConfig {
  src: string,
  pwd: string,
  fontName: string,
  dist: string
}

export const addArgument = (parser, argumentTuples: [string, string][]) => {
  argumentTuples.forEach((argumentTuple) => {
    parser.addArgument(argumentTuple)
  })
}

export const getConfigData = (configPath: string): Promise<FontConfig> => {
  // TODO null cannot use default parameter, so need to reimplement
  const actualPath = (configPath === null) ? './font.config.json' : configPath
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(rootDir, actualPath), 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}