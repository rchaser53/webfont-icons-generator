const path = require('path')
const fs = require('graceful-fs')

let data = '#!/usr/bin/env node\r\n'
const readStream = fs.createReadStream(path.resolve(__dirname, '../lib/index.js'), { encoding: 'utf8'})

readStream.on('data', (_data) => {
  data += _data
})

readStream.on('end', () => {
  console.log(data)
  fs.writeFile(path.resolve(__dirname, '../lib/webfont-icons-generator.js'), data, { encoding: 'utf8'}, (err) => {
    if (err) throw new Error(err)
  })
})