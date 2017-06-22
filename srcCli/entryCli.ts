import * as fs from 'fs'
import * as path from 'path'
import * as ArgParse from 'argparse'
import * as AppRootDir from 'app-root-dir'
import createFonts from './createFonts'

const rootDir = AppRootDir.get()

export interface FontConfig {
  src: string,
  pwd: string,
  fontName: string,
  dist: string
}

const parser = new ArgParse.ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse example'
})

parser.addArgument(
  [ '-t', '--type' ],
)

parser.addArgument(
  [ '-f', '--file']
)

parser.addArgument(
  [ '-c', '--config']
)

const args = parser.parseArgs()

const parseType = (args.t || args.type)
const fileName = (args.f || args.file)
const config = (args.c || args.config)

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

getConfigData(config)
  .then((ret) => {
    const { src, pwd, fontName, dist } = ret
    // TODO need to implement for the case that src is glob

    createFonts({
      originalFileName: src,
      pwd, fontName, dist
    }).then((ret) => {})
      .catch((err) => { throw new Error(err) })
  })
  .catch((err) => {
    throw new Error(err)
  })

// TODO need to implement error handling for argument