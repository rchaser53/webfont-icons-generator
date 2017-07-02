import * as ArgParse from 'argparse'

import createFonts from './createFonts'
import {
  createArgOptions,
  getConfigData,
  getFiles,
  createDistDirectory,
  divideAbsolutePath,
} from './utils'

const {
  argSrc, argDist, argFontName, argConfig
} = createArgOptions(new ArgParse.ArgumentParser({}))

export const entryCli = async (config: string): Promise<void> => {
  try {
    const { src, fontName, dist } = await getConfigData(config)
    const files = await getFiles(argSrc || src)

    if (files.length === 0) throw new Error('no svg files are found')
    const { pwd } = divideAbsolutePath(files[0])

    const originalFileNames = files.map((file) => {
      const {
        originalFileName, extension
      } = divideAbsolutePath(file)

      // TODO convert other extension
      if (extension !== 'svg') throw new Error('cannot convert except svg extension')
      return originalFileName
    })

    await createDistDirectory(argDist || dist)

    await createFonts({
      originalFileNames,
      pwd,
      fontName: argFontName || fontName,
      dist: argDist || dist
    })

  } catch (err) {
    throw new Error(err)
  }
}

entryCli(argConfig)
  .catch((err) => {
    console.error(err)
  })