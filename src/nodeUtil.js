let util = {};
const _ = require("lodash");
const escodegen = require('escodegen');

module.exports = util;

util.getDefineFunBody = function (node, options) {
    //console.log(JSON.stringify(node, null, 4));
    if (this.isDefineModule(node)) {
        return node.expression.arguments[2];
    }
}
util.isDefineModule = function (node) {
    let callee;
    let expression;
    if (node.type === 'ExpressionStatement') {
        expression = node.expression;
        callee = expression.callee
        if (callee && callee.type === 'Identifier' && callee.name === 'define') {
            return true;
        }
    }
}
util.astToString = function (ast) {
    if (this.type(ast, 'array')) {
        let tmpArr = [];
        ast.forEach(v=>{
            tmpArr.push(this.astToString(v));
        });
        return tmpArr;
    }
    return escodegen.generate(ast);
};
util.getFormattedBaseInfo = function (node) {
    let callee;
    let clonedNode = _.clone(node, true);
    let expression;
    let expArgs;
    let secondArg;
    let oriDeps;
    let oriVars;
    let name;

    if (this.isDefineModule(clonedNode)) {
        expression = clonedNode.expression;
        callee = expression.callee
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
            name:  this.astToString(name),
            origin:  this.astToString(node),
            oriDeps: this.astToString(oriDeps), 
            oriVars: this.astToString(oriVars), 
            callBackFunBody: this.astToString(this.getDefineFunBody(node)) 
        }
    };
}
util.isProgram  = function (target) {
    return target && target.type === 'Program';
}
util.type  = function (target, type) {
    if (typeof type === 'string') {
        return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
    } else if (target){
        let matched = Object.prototype.toString.call(target).toLowerCase().match(/\[object (\S+)\]/);
        if (matched) {
            return matched[1].toLowerCase();
        }
    }
};
