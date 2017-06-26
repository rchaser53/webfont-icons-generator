import test from 'ava'
import * as fs from 'fs'
import * as path from 'path'

import ttfToWoff from '../ttfToWoff'

test(async (t) => {
  try {
    await ttfToWoff('hoge')
  }
  catch (err) {
    t.is(err.message, `Error: ENOENT: no such file or directory, open 'hogeIcon.ttf'`)
  }
})