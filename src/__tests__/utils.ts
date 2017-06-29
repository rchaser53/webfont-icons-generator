import test from 'ava'
import * as fs from 'fs'
import * as path from 'path'

import {
  divideAbsolutePath
} from '../utils'

test((t) => {
  t.deepEqual(divideAbsolutePath('abc/def/fileName.js'), {
    pwd: 'abc/def/',
    originalFileName: 'fileName',
    extension: 'js'
  })
})