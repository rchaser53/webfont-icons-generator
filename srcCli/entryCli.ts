import * as ArgParse from 'argparse';

const parser = new ArgParse.ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
})

parser.addArgument(
  [ '-t', '--type' ],
)

const args = parser.parseArgs()

const parseType = (args.t || args.type)

console.log(`you typed type ${parseType}!`)
