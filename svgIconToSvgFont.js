var svgicons2svgfont = require('svgicons2svgfont');
var fs = require('fs');
var fontStream = svgicons2svgfont({
  fontName: 'hello'
});
 
// Setting the font destination 
fontStream.pipe(fs.createWriteStream('helloIcon.svg'))
  .on('finish',function() {
    console.log('Font successfully created!')
  })
  .on('error',function(err) {
    console.log(err);
  });
 
// Writing glyphs 
var glyph1 = fs.createReadStream('projector.svg');
glyph1.metadata = {
  unicode: ['\ue001'],
  name: 'icon1'
};
fontStream.write(glyph1);

// Multiple unicode values are possible 
//var glyph2 = fs.createReadStream('icons/icon1.svg');
//glyph2.metadata = {
//  unicode: ['\uE002', '\uEA02'],
//  name: 'icon2'
//};
//fontStream.write(glyph2);

// Either ligatures are available 
//var glyph3 = fs.createReadStream('icons/icon1.svg');
//glyph3.metadata = {
//  unicode: ['\uE001\uE002'],
//  name: 'icon1-icon2'
//};
//fontStream.write(glyph3);

// Do not forget to end the stream 
fontStream.end();
