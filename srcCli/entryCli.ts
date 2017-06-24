import * as fs from 'fs'
import * as ArgParse from 'argparse'

import createFonts from './createFonts'
import {
  addArgument,
  getConfigData,
  getFiles,
  divideAbsolutePath
} from './utils'

const parser = new ArgParse.ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse example'
})

addArgument(parser, [
  [ '-t', '--type' ],
  [ '-f', '--file'],
  [ '-c', '--config']
])

const args = parser.parseArgs()

const parseType = (args.t || args.type)
const fileName = (args.f || args.file)
const config = (args.c || args.config)

// TODO need to implement error handling for argument

export const entryCli = async (config: string): Promise<void> => {
  try {
    const { pwd, src, fontName, dist } = await getConfigData(config)
    // TODO need to implement for the case that src is glob

    const files = await getFiles(src)
    const originalFileNames = files.map((file) => {
      const {
        originalFileName, extension, pwd
      } = divideAbsolutePath(file)

      // TODO convert other extension
      if (extension !== 'svg') throw new Error('cannot convert except svg extension')
      return originalFileName
    })

    await createFonts({
      originalFileNames, pwd, fontName, dist
    })

  } catch (err) {
    throw new Error(err)
  }
}

entryCli(config)
  .catch((err) => {
    console.error(err)
  })