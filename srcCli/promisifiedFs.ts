import * as fs from 'fs';

export interface Options {
  encoding: string | null;
}

export const readFile = <T>(fileName: string, options: Options = {
  encoding: 'utf8'
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, options, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  })
};

export const writeFile = <T>(fileName: string, data: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, { encoding: 'utf8'}, (err) => {
      if (err) reject(err);
      resolve(data);
    });
  })
};