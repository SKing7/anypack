"use strict";
var opack = require('./lib/index');
new opack({
    entry: ['test/entry_1.js', 'test/entry_2.js'],
    nameRegx: 'comp/(.*)',
    outdir: 'dest'
});
