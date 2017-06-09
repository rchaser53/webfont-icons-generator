import * as ArgParse from 'argparse';
import svgIconToSvgFont from './svgIconToSvgFont'
import svgFontsToTtf from './svgFontsToTtf'

const parser = new ArgParse.ArgumentParser({
  version: '0.0.1',
  addHelp:true,
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

// TODO need to implement error handling for argument

svgIconToSvgFont(fileName, fileName, '\ue001')
  .then((ret) => {
    svgFontsToTtf(fileName, fileName)
  })