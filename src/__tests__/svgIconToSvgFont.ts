import test from 'ava'
import * as fs from 'fs'
import * as path from 'path'

import {
  createFontInput
} from '../svgIconToSvgFont'

test('should devide fileName to fontcode and name', (t) => {
  t.deepEqual(createFontInput('125_hoge'), {
    fontCode: '125',
    fileName: 'hoge'
  })
})