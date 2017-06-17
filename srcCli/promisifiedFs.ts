import * as fs from 'fs';

export const readFile = <T>(fileName: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
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