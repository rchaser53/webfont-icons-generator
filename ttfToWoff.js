const fs = require('fs');
const ttfToWoff = require('ttf2woff');

const option = {
  metadata: fs.readFileSync('helloIcon.ttf')
};
const input = fs.readFileSync('helloIcon.ttf');
const ttf = new Uint8Array(input)
const woff = new Buffer(ttfToWoff(ttf, {}).buffer);

fs.writeFileSync('nyanchu.woff', woff)
