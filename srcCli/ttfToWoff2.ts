import * as ttf2woff2 from 'ttf2woff2'
import {
  readFile,
  writeFile
} from './promisifiedFs'

export default async (fileName: string): Promise<{}> => {
  try {
    const input =  await readFile<string>(`${fileName}Icon.ttf`, {
      encoding: null
    })
    return await writeFile<string>(`${fileName}Icon.woff2`, ttf2woff2(input))
  } catch (err) {
    throw new Error(err)
  }
}