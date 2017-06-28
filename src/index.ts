import * as ArgParse from 'argparse'

import createFonts from './createFonts'
import {
  addArgument,
  createDistDirectory,
  getConfigData,
  getFiles,
  divideAbsolutePath
} from './utils'

const parser = new ArgParse.ArgumentParser({})

addArgument(parser, [
  [ '-c', '--config']
])

const args = parser.parseArgs()
const config = (args.c || args.config)

export const entryCli = async (config: string): Promise<void> => {
  try {
    const { pwd, src, fontName, dist } = await getConfigData(config)

    const files = await getFiles(src)
    const originalFileNames = files.map((file) => {
      const {
        originalFileName, extension, pwd
      } = divideAbsolutePath(file)

      // TODO convert other extension
      if (extension !== 'svg') throw new Error('cannot convert except svg extension')
      return originalFileName
    })

    await createDistDirectory(dist)

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