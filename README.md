# anypack
A package tool for component

the content of deps belong to the entry files based on amd, will be inlined in the out file. 

**in testing**

##OPTION
###entry [Array]
the entry files
###nameRegx [String]
match[1] return the name of the inlined file
###outdir [String]
the dir of the inlined file
##USAGE
```js
  "use strict";
  var opack = require('./lib/index');
  new opack({
      entry: ['test/entry_1.js'],
      nameRegx: 'comp/(.*)',
      outdir: './dest'
  });
```
####test/entry_1.js
```js
  define('test1', ['common/util', './main.tpl.js', './base.css.js'], function () {
    var test1 = {
        testFun: 1
    };
    return test1
  });
```
####test/main.tpl.js
```js
define('main.tpl.js', [], function () {
    var main = {
        testFun: 1
    };
    return main
}) ;
```
####test/base.css.js
```js
define('base.css.js', [], function () {
    var baseCss = {
        testFun: 1
    };
    return baseCss
}) ;
```
the `main.tpl.js` and `base.css.js` will be inlined, and write to `./dest/test.js` file

###reference
- webpack
###TODO
- support alias for deps
- support export common module
