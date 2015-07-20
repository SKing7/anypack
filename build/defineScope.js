"use strict";

var _ = require("lodash");
var otree = require("./tree");
var tempateMap = require("./templateFactory");
var path = require("path");
var $util = require("./util.js");
var nUtil = require("./nodeUtil");

function defineScope(options) {
    this.options = _.assign({
        regx: {
            tplRaw: /^['"]\.\/[^'"]+['"]$/,
            tpl: /\.\/[^'"]+$/
        }
    }, options);
    this.deps = [];
    this.vars = [];
}

defineScope.prototype = {

    createRequireFunBody: function createRequireFunBody(baseInfo, onlyFunBody) {

        var baseInfoText = baseInfo.text;
        var options = this.options;
        var regx = options.regx;

        var deps = baseInfoText.oriDeps;
        var vars = baseInfoText.oriVars;

        var inlinedVars = this.inlinedVars(baseInfo);
        var dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
        var tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
        var noInlined = $util.filterVars(deps, vars, regx.tplRaw);
        this.deps = noInlined.deps.concat(this.deps);
        this.vars = noInlined.vars.concat(this.vars);

        if (onlyFunBody) {
            return tempateMap.defineWrapperOnlyFunctionBody(tempateMap.top + dynamicBody + tail);
        } else {
            return tempateMap.defineWrapper(baseInfoText.name, this.deps, this.vars, tempateMap.top + dynamicBody + tail);
        }
    },
    getTplContentByOrder: function getTplContentByOrder(deps) {
        var _this = this;

        var options = this.options;
        var regx = options.regx;
        var contentQueue = [];
        deps = deps.filter(function (v, k) {
            v = v.value;
            if (regx.tpl.test(v)) {
                //deps
                contentQueue.push(_this.inlineDefine(v, $util.dir(options.src), true).join(""));
            }
        });
        return contentQueue;
    },
    inlinedVars: function inlinedVars(biObj) {

        var baseInfo = biObj.text;
        var vars = baseInfo.oriVars;
        var deps = baseInfo.oriDeps;
        var inlineCounter = 2;
        var options = this.options;
        var regx = options.regx;
        var inlinedVar = [];

        deps.forEach(function (v, k) {
            if (regx.tplRaw.test(v)) {
                inlinedVar[k] = tempateMap.requireFunVarName(inlineCounter++, v);
            } else {
                inlinedVar[k] = vars[k];
            }
        });
        return inlinedVar;
    },
    inlineDefine: function inlineDefine(src) {
        var _this2 = this;

        var dir = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
        var depDefine = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        src = src || this.options.src;
        var bodyArr = [];
        var options = this.options;
        var tree = new otree({
            src: path.join(dir, src)
        });
        var entryAst = tree.curAst();

        if (nUtil.isProgram(entryAst)) {
            entryAst.body.forEach(function (item) {
                var baseInfo = nUtil.getFormattedBaseInfo(item);
                var bodyResult = _this2.createRequireFunBody(baseInfo, depDefine);
                bodyArr.push(bodyResult);
            });
        }
        return bodyArr;
    }
};
module.exports = defineScope;