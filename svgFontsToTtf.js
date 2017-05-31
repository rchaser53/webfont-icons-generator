var fs = require('fs');
var svg2ttf = require('svg2ttf');

var ttf = svg2ttf(fs.readFileSync('hello.svg'), {});
fs.writeFileSync('myfont.ttf', new Buffer(ttf.buffer));
