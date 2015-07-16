"use strict";

var fs = require("fs");
var _ = require("lodash");
var path = require("path");

var tempateMap = require("./templateFactory");
var nUtil = require("./nodeUtil");
var otree = require("./tree");

var regx = {
    tplRaw: /^['"]\.\/[^'"]+['"]$/,
    tpl: /\.\/[^'"]+$/
};

module.exports = defineScope;

function defineScope(options) {
    this.options = _.assign({}, options);
}
defineScope.prototype = {

    createRequireFunBody: function createRequireFunBody(baseInfo) {

        var baseInfoText = baseInfo.text;

        var deps = baseInfoText.oriDeps;
        var vars = baseInfoText.oriVars;

        var inlinedVars = this.inlinedVars(baseInfo);
        var dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
        var tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
        var noInlined = filterVars();

        return tempateMap.defineWrapper(baseInfoText.name, noInlined.deps, noInlined.vars, tempateMap.top + dynamicBody + tail);

        function filterVars() {

            // match tpl deps regx
            var rtVar = [];
            var rtDeps = [];
            deps.forEach(function (v, k) {
                if (!regx.tplRaw.test(v)) {
                    rtVar.push(vars[k]);
                    rtDeps.push(v);
                }
            });
            return {
                vars: rtVar,
                deps: rtDeps
            };
        }
    },
    getTplContentByOrder: function getTplContentByOrder(deps) {
        var _this = this;

        var $util = require("./util");
        var contentQueue = [];
        deps = deps.filter(function (v, k) {
            v = v.value;
            if (regx.tpl.test(v)) {
                contentQueue.push($util.inlineDefine(v, _this.options.dir).join(""));
            }
        });
        return contentQueue;
    },
    inlinedVars: function inlinedVars(biObj) {
        var baseInfo = biObj.text;
        var vars = baseInfo.oriVars;
        var deps = baseInfo.oriDeps;
        var inlineCounter = 2;
        var inlinedVar = [];
        deps.forEach(function (v, k) {
            if (regx.tplRaw.test(v)) {
                inlinedVar[k] = tempateMap.requireFunVarName(inlineCounter++, v);
            } else {
                inlinedVar[k] = vars[k];
            }
        });
        return inlinedVar;
    }
};