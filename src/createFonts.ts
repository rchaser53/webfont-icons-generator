import svgIconToSvgFont from './svgIconToSvgFont'
import svgFontsToTtf from './svgFontsToTtf'
import ttfToWoff from './ttfToWoff'
import ttfToWoff2 from './ttfToWoff2'

export interface CreateFontsOptions {
  originalFileNames: string[],
  pwd: string,
  fontName: string,
  dist: string
}

export const createFonts = async (createFontOptions: CreateFontsOptions) => {
  const {
    originalFileNames, pwd, fontName, dist
  } = createFontOptions
  const relativeDistPath = `${dist}/${fontName}`

  try {
    await svgIconToSvgFont(createFontOptions)
    await svgFontsToTtf(relativeDistPath, relativeDistPath)
    await ttfToWoff(relativeDistPath)
    await ttfToWoff2(relativeDistPath)
  } catch (err) {
    throw new Error(err)
  }
}

export default createFonts