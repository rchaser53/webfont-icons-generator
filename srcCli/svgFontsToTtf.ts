import * as fs from 'fs';
import * as svg2ttf from 'svg2ttf';

export default (fileName: string, outputName: string): void => {
  const ttf = svg2ttf(fs.readFileSync(`${fileName}Icon.svg`, 'utf8'), {});
  fs.writeFileSync(`${outputName}Icon.ttf`, new Buffer(ttf.buffer));
}