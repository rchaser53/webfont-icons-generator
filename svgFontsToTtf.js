var fs = require('fs');
var svg2ttf = require('svg2ttf');

var ttf = svg2ttf(fs.readFileSync('helloIcon.svg').toString(), {});
fs.writeFileSync('helloIcon.ttf', new Buffer(ttf.buffer));
