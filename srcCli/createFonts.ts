import svgIconToSvgFont, { FontOptions } from './svgIconToSvgFont'
import svgFontsToTtf from './svgFontsToTtf'
import ttfToWoff from './ttfToWoff'
import ttfToWoff2 from './ttfToWoff2'

export interface FontInput {
  fileName: string,
  fontCode: string
}

export const createFontInput = (originalFileName: string): FontInput => {
  const splitedNames = originalFileName.split('_')
  return {
    fontCode: splitedNames[0],
    fileName: splitedNames[1]
  }
}

export const createFonts = async (originalFileName: string, pwd: string, fontName: string, dist: string) => {
  const {
    fileName, fontCode
  } = createFontInput(originalFileName)
  const relativeFilePath = `${pwd}/${fileName}`
  const relativeDistPath = `${dist}/${fileName}`

  const fontOptions: FontOptions = {
    pwd,
    fileName,
    fontName,
    fontCode: String('\\ue' + fontCode),
    dist
  }

  try {
    await svgIconToSvgFont(fontOptions)
    await svgFontsToTtf(relativeDistPath, relativeDistPath)
    await ttfToWoff(relativeDistPath)
    await ttfToWoff2(relativeDistPath)
  } catch (err) {
    throw new Error(err)
  }
}

export default createFonts

createFonts('001_projector', './img', 'originalFont', './fonts')