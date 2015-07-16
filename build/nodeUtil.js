'use strict';

var util = {};
var _ = require('lodash');
var escodegen = require('escodegen');

module.exports = util;

util.getDefineFunBody = function (node, options) {
    //console.log(JSON.stringify(node, null, 4));
    if (this.isDefineModule(node)) {
        return node.expression.arguments[2];
    }
};
util.isDefineModule = function (node) {
    var callee = undefined;
    var expression = undefined;
    if (node.type === 'ExpressionStatement') {
        expression = node.expression;
        callee = expression.callee;
        if (callee.type === 'Identifier' && callee.name === 'define') {
            return true;
        }
    }
};
util.astToString = function (ast) {
    var _this = this;

    if (this.type(ast, 'array')) {
        var _ret = (function () {
            var tmpArr = [];
            ast.forEach(function (v) {
                tmpArr.push(_this.astToString(v));
            });
            return {
                v: tmpArr
            };
        })();

        if (typeof _ret === 'object') return _ret.v;
    }
    return escodegen.generate(ast);
};
util.getFormattedBaseInfo = function (node) {
    var callee = undefined;
    var clonedNode = _.clone(node, true);
    var expression = undefined;
    var expArgs = undefined;
    var secondArg = undefined;
    var oriDeps = undefined;
    var oriVars = undefined;
    var name = undefined;
    if (this.isDefineModule(clonedNode)) {
        expression = clonedNode.expression;
        callee = expression.callee;
        expArgs = expression.arguments;
        secondArg = expArgs[1];
        if (secondArg.type === 'ArrayExpression') {
            name = expArgs[0];
            oriDeps = secondArg.elements;
            if (expArgs[2] && expArgs[2].type === 'FunctionExpression') {
                oriVars = expArgs[2].params;
            }
        }
    }
    return {
        name: name,
        origin: node,
        oriDeps: oriDeps,
        oriVars: oriVars,
        callBackFunBody: this.getDefineFunBody(node),
        text: {
            name: this.astToString(name),
            origin: this.astToString(node),
            oriDeps: this.astToString(oriDeps),
            oriVars: this.astToString(oriVars),
            callBackFunBody: this.astToString(this.getDefineFunBody(node))
        }
    };
};
util.isProgram = function (target) {
    return target && target.type === 'Program';
};
util.type = function (target, type) {
    if (typeof type === 'string') {
        return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
    } else if (target) {
        var matched = Object.prototype.toString.call(target).toLowerCase().match(/\[object (\S+)\]/);
        if (matched) {
            return matched[1].toLowerCase();
        }
    }
};