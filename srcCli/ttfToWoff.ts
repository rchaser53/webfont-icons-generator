import * as ttfToWoff from 'ttf2woff';
import {
  readFile,
  writeFile
} from './promisifiedFs';

export default async (fileName: string): Promise<{}> => {
  try {
    const input =  await readFile<ArrayBuffer>(`${fileName}Icon.ttf`, {encoding: null});
    const ttf = new Uint8Array(input);
    const woff = new Buffer(ttfToWoff(ttf, {}).buffer);

    return writeFile<string>(`${fileName}Icon.woff`, woff);
  } catch (err) {
    throw new Error(err);
  }
}