import * as fs from 'fs'
import * as svgicons2svgfont from 'svgicons2svgfont'

export interface FontOptions {
  pwd: string,
  fileName: string,
  fontName?: string,
  fontCode: string,
  dist: string
}

export default (options: FontOptions): Promise<{}> => {
  const {
    pwd, fileName, fontName,
    fontCode, dist
  } = options
  return new Promise<{}>((resolve, reject) => {
    const fontStream = svgicons2svgfont({ fontName })

    fontStream.pipe(fs.createWriteStream(`${dist}/${fileName}Icon.svg`))
      .on('finish', () => {
        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })

    const glyph1: any = fs.createReadStream(`${pwd}/${fileName}.svg`)
    glyph1.metadata = {
      unicode: [fontCode],
      name: fileName
    }
    fontStream.write(glyph1)
    fontStream.end()
  })
}