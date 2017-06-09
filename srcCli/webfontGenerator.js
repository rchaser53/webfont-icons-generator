const webfontsGenerator = require('webfonts-generator');

webfontsGenerator({
  files: [
    'helloIcon.svg'
  ],
  dest: 'dist/',
}, function(error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
})
