var util = {};
var _ = require("lodash");
var escodegen = require('escodegen');

module.exports = util;

util.combine = function (node, options) {
    var items = node.body;
    var self = this;
    _.forEach(items, function (item, itemKey) {
        var frameInfo = self.getFrame(item, itemKey, options);
        var rt = util.astToString(frameInfo[0]);
    });
}
util.getDefineInfoMap = function (node, options) {
    if (this.isDefineModule(node)) {
        return node.expression.arguments[2];
    }
}
util.getDefineFunBody = function (node, options) {
    //console.log(JSON.stringify(node, null, 4));
    if (this.isDefineModule(node)) {
        return node.expression.arguments[2];
    }
}
util.isDefineModule = function (node) {
    var callee;
    var expression;
    if (node.type === 'ExpressionStatement') {
        expression = node.expression;
        callee = expression.callee
        if (callee.type === 'Identifier' && callee.name === 'define') {
            return true;
        }
    }
}
util.seDefineFunBody = function (node, targetFun) {
    if (this.isDefineModule(node)) {
        node.expression.arguments[2] = targetFun;
        return node;
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
util.getFormattedBaseInfo = function (node, options) {
    let callee;
    let clonedNode = _.clone(node, true);
    let expression;
    let oriDeps;
    let oriVars;
    let name;
    if (clonedNode.type === 'ExpressionStatement') {
        expression = clonedNode.expression;
        callee = expression.callee
        if (callee.type === 'Identifier' && callee.name === 'define') {
            let opInfo = {};
            let expArgs = expression.arguments;
            let secondArg = expArgs[1];
            name = expArgs[0];
            if (secondArg.type === 'ArrayExpression') {
                oriDeps = secondArg.elements;
                if (expArgs[2] && expArgs[2].type === 'FunctionExpression') {
                    oriVars = expArgs[2].params;
                }
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
