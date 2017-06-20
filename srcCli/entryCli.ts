import * as ArgParse from 'argparse'

import svgIconToSvgFont from './svgIconToSvgFont'
import svgFontsToTtf from './svgFontsToTtf'
import ttfToWoff from './ttfToWoff'
import ttfToWoff2 from './ttfToWoff2'

export interface FontInput {
  fileName: string,
  fontCode: string
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

const args = parser.parseArgs()

const parseType = (args.t || args.type)
const fileName = (args.f || args.file)

// TODO need to implement error handling for argument

export const createFonts = async (originalFileName: string, pwd: string) => {
  const {
    fileName, fontCode
  } = createFontInput(originalFileName)
  const relativeFilePath = `${pwd}${fileName}`

  try {
    await svgIconToSvgFont(relativeFilePath, fileName, String('\\ue' + fontCode))
    await svgFontsToTtf(relativeFilePath, relativeFilePath)
    await ttfToWoff(relativeFilePath)
    await ttfToWoff2(relativeFilePath)
  } catch (err) {
    throw new Error(err)
  }
}

export const createFontInput = (originalFileName: string): FontInput => {
  const splitedNames = originalFileName.split('_')
  return {
    fontCode: splitedNames[0],
    fileName: splitedNames[1]
  }
}

createFonts('001_projector', './img/')