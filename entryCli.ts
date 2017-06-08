import * as ArgParse from 'argparse';

const parser = new ArgParse.ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
})

const args = parser.parseArgs();
// console.dir(args);