import * as svg2ttf from 'svg2ttf'
import {
  readFile,
  writeFile
} from './promisifiedFs'

export default async (fileName: string, outputName: string): Promise<string> => {
  try {
    const readFileData = await readFile<string>(`${fileName}Icon.svg`)
    const ttf = await svg2ttf(readFileData, {})

    return await writeFile<string>(`${outputName}Icon.ttf`, new Buffer(ttf.buffer))
  } catch (error) {
    throw new Error(error)
  }
}