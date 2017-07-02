import * as fs from 'graceful-fs'
import * as glob from 'glob'
import * as path from 'path'
import * as ArgParse from 'argparse'

import * as AppRootDir from 'app-root-dir'
const rootDir = AppRootDir.get()

export interface FontConfig {
  src: string,
  pwd: string,
  fontName: string,
  dist: string
}

export interface AbsoluteFilePathData {
  pwd: string,
  originalFileName: string,
  extension: string
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

export const getConfigData = (configPath: string): Promise<FontConfig> => {
  // TODO null cannot use default parameter, so need to reimplement
  const actualPath = (configPath === null) ? './font.config.json' : configPath
  return new Promise((resolve, reject) => {
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

export const createArgOptions = (argParser) => {
  addArgument(argParser, [
    [ '-c', '--config'],
    [ '-d', '--dist'],
    [ '-f', '--fontName'],
    [ '-s', '--src'],
  ])
  const args = argParser.parseArgs()

 return {
  argConfig: (args.c || args.config),
  argDist: (args.d || args.dist),
  argFontName: (args.f || args.fontName),
  argSrc: (args.s || args.src),
 }
}