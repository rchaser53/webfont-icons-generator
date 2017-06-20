import * as fs from 'fs'
import * as svgicons2svgfont from 'svgicons2svgfont'

export default (fileName: string, fontName: string, unicode: string): Promise<{}> => {
  return new Promise<{}>((resolve, reject) => {
    const fontStream = svgicons2svgfont({ fontName })

    fontStream.pipe(fs.createWriteStream(`${fileName}Icon.svg`))
      .on('finish', () => {
        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })

    const glyph1: any = fs.createReadStream(`${fileName}.svg`)
    glyph1.metadata = {
      unicode: [unicode],
      name: fileName
    }
    fontStream.write(glyph1)
    fontStream.end()
  })
}