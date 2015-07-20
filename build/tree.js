'use strict';

var escodegen = require('escodegen');
var path = require('path');
var esprima = require('esprima');
var _ = require('lodash');
var fs = require('fs');

function otree(pOptions) {
    var options = this.options = this.options || {};
    _.assign(options, pOptions);
    if (options.src && path.extname(options.src).slice(1) !== (options.ext || 'js')) {
        options.src = options.src + '.js';
    }
    this._ast = this._parse(options.content || fs.readFileSync(options.src));
    return this;
}

var depPath = function depPath(name, base) {
    var extOrigin = path.extname(name);
    var noExtName = name.slice(0, name.length - extOrigin.length);
    var ext = alias[extOrigin.slice(-1)] || 'js';
    var arr = undefined;
    base = base.replace(/\\/g, '/');
    arr = base.split('/');
    arr.splice(arr.length - 1, 1, noExtName + '.' + ext);
    return path.join.apply(path, arr);
};

otree.prototype._parse = function (code) {
    var ast = esprima.parse(code);
    return ast;
};

otree.prototype.curAst = function (node) {
    return this._ast;
};

otree.astToString = function () {
    return escodegen.generate(this._ast);
};

module.exports = otree;