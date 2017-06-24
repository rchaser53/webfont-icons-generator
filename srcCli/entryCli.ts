import * as ArgParse from 'argparse'

import {
  addArgument,
  getConfigData
} from './utils'
import createFonts from './createFonts'

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
    const { src, pwd, fontName, dist } = await getConfigData(config)
    // TODO need to implement for the case that src is glob

    await createFonts({
      originalFileName: src,
      pwd, fontName, dist
    })
  } catch (err) {
    throw new Error(err)
  }
}

entryCli(config)