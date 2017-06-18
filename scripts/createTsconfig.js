const fs = require('fs');
const baseConfigData = JSON.parse(fs.readFileSync('./tsconfig.base.json', 'utf8'));

const cliJsonData = {
  ...baseConfigData,
  ...{
    compilerOptions: {...baseConfigData.compilerOptions, outDir: './distForCli'}
  },
  include: ['./srcCli'],
};

fs.writeFileSync('tsconfig.cli.json', JSON.stringify(cliJsonData, null, '\t'));