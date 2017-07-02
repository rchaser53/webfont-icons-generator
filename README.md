# fontIconPlayground
## setup

  you need only install webfont-icons-generator like below.

    $ npm install webfont-icons-generator -g

## options
```
$ webfont-icons-generator -h
usage: index.js [-h] [-c CONFIG] [-d DIST] [-f FONTNAME] [-s SRC]

Optional arguments:
  -h, --help                          Show this help message and exit.
  -c CONFIG, --config CONFIG          config json file path
  -d DIST, --dist DIST                output directory
  -f FONTNAME, --fontName FONTNAME    create webfont name and file name
  -s SRC, --src SRC                   imput svg files directory
```

you can also use config json file. The format is like below.
``` font.config.json
{
  "src": "./img/*.svg",
  "fontName": "originalFont",
  "dist": "./fonts"
}
```