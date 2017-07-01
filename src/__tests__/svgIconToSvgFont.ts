import * as path from 'path'

import test from 'ava'
import * as fs from 'graceful-fs'
import * as AppRootDir from 'app-root-dir'

const rootDir = AppRootDir.get()

import svgIconToFont, { createFontInput } from '../svgIconToSvgFont'

test('should devide fileName to fontcode and name', (t) => {
  t.deepEqual(createFontInput('125_hoge'), {
    fontCode: '125',
    fileName: 'hoge'
  })
})

test('should convert svg icon to svg font', async (t) => {
  const options = {
    originalFileNames: ['123_testIcon'],
    fontName: 'testFont',
    dist: './fixtures/result',
    pwd: './fixtures/icons'
  }

  await svgIconToFont(options)

  const expectSVG = fs.readFileSync(path.resolve(rootDir, './fixtures/expect/testFontIcon.svg'), 'utf8')
  const resultSVG = fs.readFileSync(path.resolve(rootDir, './fixtures/result/testFontIcon.svg'), 'utf8')

  t.deepEqual(expectSVG, resultSVG)
})