const fs = require('graceful-fs');
const baseConfigData = JSON.parse(fs.readFileSync('./tsconfig.base.json', 'utf8'));

const cliJsonData = {
  ...baseConfigData,
  ...{
    compilerOptions: {
      ...baseConfigData.compilerOptions,
      outDir: './lib',
      inlineSourceMap: false,
    }
  },
  include: ['./src'],
  exclude: ['./src/__tests__']
};
fs.writeFileSync('tsconfig.cli.json', JSON.stringify(cliJsonData, null, '\t'));

const testJsonData = {
  ...baseConfigData,
  ...{
    compilerOptions: {
      ...baseConfigData.compilerOptions,
      outDir: './lib',
      inlineSourceMap: true,
    }
  },
  include: ['./src/__tests__']
};
fs.writeFileSync('tsconfig.test.json', JSON.stringify(testJsonData, null, '\t'));