var fs = require('fs');
var ttf2woff2 = require('ttf2woff2');
 
var input = fs.readFileSync('helloIcon.ttf');
 
fs.writeFileSync('hello.woff2', ttf2woff2(input));
