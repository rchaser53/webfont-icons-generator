import * as fs from 'fs'
import * as path from 'path'
import * as ArgParse from 'argparse'
import createFonts from './createFonts'

const parser = new ArgParse.ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse example'
})

parser.addArgument(
  [ '-t', '--type' ],
)

parser.addArgument(
  [ '-f', '--file']
)

const args = parser.parseArgs()

const parseType = (args.t || args.type)
const fileName = (args.f || args.file)
}


