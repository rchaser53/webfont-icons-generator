import * as svgicons2svgfont from 'svgicons2svgfont';
import * as fs from 'fs';

export default (fileName: string, fontName: string, unicode: string): any => {
  return new Promise((resolve, reject) => {
    const fontStream = svgicons2svgfont({ fontName });

    fontStream.pipe(fs.createWriteStream(`${fileName}Icon.svg`))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        console.error(err);
      });

    const glyph1 : any = fs.createReadStream(`${fileName}.svg`);
    glyph1.metadata = {
      unicode: [unicode],
      name: 'icon1'
    };
    fontStream.write(glyph1);
    
    fontStream.end();
  })  
}