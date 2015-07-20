"use strict";
var opack = require('./lib/index');
new opack({
    entry: ['test/entry_2.js'],
    nameRegx: 'comp/(.*)',
    outdir: 'dest'
});
