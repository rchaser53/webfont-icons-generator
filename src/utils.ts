import * as fs from 'graceful-fs'
import * as glob from 'glob'
import * as path from 'path'
import * as ArgParse from 'argparse'

import * as AppRootDir from 'app-root-dir'
const rootDir = AppRootDir.get()

export interface FontConfig {
  src: string,
  fontName: string,
  dist: string
}

export interface AbsoluteFilePathData {
  pwd: string,
  originalFileName: string,
  extension: string
}

export interface ArgOptions {
  config: string | null,
  dist: string | null,
  fontName: string | null,
  src: string | null,
}

export const createDistDirectory = (distPath: string): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const absoluteDistPath = `${rootDir}/${distPath}`
    if (fs.existsSync(absoluteDistPath) === false) {
      fs.mkdir(absoluteDistPath, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    } else {
      resolve()
    }
  })
}

export const addArgument = (parser, argumentTuples: [string, string][]) => {
  argumentTuples.forEach((argumentTuple) => {
    parser.addArgument(argumentTuple)
  })
}

export const getConfigData = (argOptions: ArgOptions): Promise<FontConfig> => {
  const {
    src, dist, fontName, config
  } = argOptions

  const actualPath = (config === null) ? './font.config.json' : config
  return new Promise((resolve, reject) => {
    if (src && dist && fontName) {
      resolve({src, dist, fontName})
      return
    }

    fs.readFile(path.resolve(rootDir, actualPath), 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

export const getFiles = (relativePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(rootDir, relativePath)
    glob(absolutePath, (err, files) => {
      if (err) reject(err)
      if (files.length === 0) reject(`${absolutePath} is not a file or directory`)
      resolve(files)
    })
  })
}

export const divideAbsolutePath = (relativePath: string): AbsoluteFilePathData => {
  const extensionMatcherReg = /(?:\.)\w*$/
  let extension = '', originalFileName = ''

  const absolutePath = relativePath.replace(extensionMatcherReg, ((match) => {
    extension = match.replace(/^\./, '')
    return ''
  }))

  const pwd = absolutePath.replace(/(?!\/)\w*$/, (match) => {
    originalFileName = match
    return ''
  })

  return {
    pwd, originalFileName, extension
  }
}

export const createArgOptions = (argParser): ArgOptions => {
  addArgument(argParser, [
    [ '-c', '--config'],
    [ '-d', '--dist'],
    [ '-f', '--fontName'],
    [ '-s', '--src'],
  ])
  const args = argParser.parseArgs()

 return {
  config: (args.c || args.config),
  dist: (args.d || args.dist),
  fontName: (args.f || args.fontName),
  src: (args.s || args.src),
 }
}