import * as ArgParse from 'argparse'

import createFonts from './createFonts'
import {
  createArgOptions,
  getConfigData,
  getFiles,
  createDistDirectory,
  divideAbsolutePath,
  ArgOptions
} from './utils'

const argOptions = createArgOptions(new ArgParse.ArgumentParser({}))

export const entryCli = async (config: ArgOptions): Promise<void> => {
  try {
      const {
        src, dist, fontName
      } = await getConfigData(config)

    const files = await getFiles(src)
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

    await createDistDirectory(dist)

    await createFonts({
      originalFileNames, pwd,
      fontName, dist
    })

  } catch (err) {
    throw new Error(err)
  }
}

entryCli(argOptions)
  .catch((err) => {
    console.error(err)
  })