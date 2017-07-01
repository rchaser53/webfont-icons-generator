import test from 'ava'
import * as fs from 'fs'
import * as path from 'path'

import {
  divideAbsolutePath
} from '../utils'

test('should split relativePath to pwd, filename and extension', (t) => {
  t.deepEqual(divideAbsolutePath('abc/def/fileName.js'), {
    pwd: 'abc/def/',
    originalFileName: 'fileName',
    extension: 'js'
  })
})