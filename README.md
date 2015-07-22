# anypack
a new web packager that only inlined the deps of relative path, especially used for building components


**[in testing]**

##Options
###entry [Array]
the entry files, [the file path matchs glob patterns]
###nameRegx [String]
match[1] return the name of the inlined file
###outdir [String]
the dir of the inlined file
###Install
`npm install anypack --save-dev`
###Test
```shell
npm test
```

the inlined file will be write in `test/dest/[define name]`
##Sample
```js
  "use strict";
  var opack = require('./lib/index');
  new opack({
      entry: ['test/entry_1.js'],
      nameRegx: 'comp/(.*)',
      outdir: 'test/dest'
  });
```
####test/entry_1.js
```js
  define('test1', ['common/util', './main.tpl', './base.css'], function () {
    var test1 = {
        testFun: 1
    };
    return test1
  });
```
####test/main.tpl.js
```js
define('main.tpl', [], function () {
    var main = {
        testFun: 1
    };
    return main
}) ;
```
####test/base.css.js
```js
define('base.css', [], function () {
    var baseCss = {
        testFun: 1
    };
    return baseCss
}) ;
```
the `main.tpl.js` and `base.css.js` will be inlined, and write to `./dest/test1.js` file

###Reference
- webpack

###TODO
- support alias for deps
- support export common module
