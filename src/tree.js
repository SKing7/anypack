const escodegen = require('escodegen');
const path = require("path");
const esprima = require('esprima');
const _ = require("lodash");
const fs = require("fs");

function otree(pOptions) {
    let options = this.options = this.options || {};
    _.assign(options, pOptions);
    if (options.src && path.extname(options.src).slice(1) !== (options.ext || 'js')) {
        options.src = options.src + '.js';
    }
    this._ast = this._parse(options.content || fs.readFileSync(options.src));
    return this;
}

let depPath = function (name, base) {
    let extOrigin = path.extname(name);
    let noExtName = name.slice(0, name.length - extOrigin.length);
    let ext = alias[extOrigin.slice(-1)] || 'js';
    let arr;
    base = base.replace(/\\/g, '/');
    arr = base.split('/');
    arr.splice(arr.length - 1, 1, noExtName + '.' + ext);
    return path.join.apply(path, arr);
}

otree.prototype._parse = function (code) {
    let ast = esprima.parse(code);
    return ast;
}

otree.prototype.curAst = function (node) {
    return this._ast;
};

otree.astToString = function () {
    return escodegen.generate(this._ast);
};

module.exports = otree;
