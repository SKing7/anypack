"use strict";
var opack = require('./lib/index');
new opack({
    entry: ['test/entry_1.js', 'test/entry_2.js'],
    resolve: {
        root: process.cwd(),
        dir: './build',
        ext: 'js',
        alias: {
        }
    },
    output: {
        path: 'test/dest',
        fileNamePattern: 'comp/(.*)',
    }
});
