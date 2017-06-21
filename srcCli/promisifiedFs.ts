import * as fs from 'fs'

export interface Options {
  encoding: string | null,
  flag?: string
}

export const readFile = <T>(fileName: string, options: Options = {
  encoding: 'utf8'
}): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    fs.readFile(fileName, options, (err, data: any) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const writeFile = <T>(fileName: string, data: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, { encoding: 'utf8'}, (err) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}