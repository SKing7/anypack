"use strict";

var tempateMap = require("./templateFactory");
var nUtil = require("./nodeUtil");
var otree = require("./tree");

var fs = require("fs");
var _ = require("lodash");
var path = require("path");

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

        var depContentQueue = [];
        deps = deps.filter(function (v, k) {
            v = v.value;
            var pathStr = undefined;
            if (regx.tpl.test(v)) {
                var tree = new otree({
                    src: path.resolve(path.join("./", _this.options.dir, v + ".js"))
                });
                var depAst = tree.curAst();
                if (depAst.type === "Program") {
                    depAst.body.forEach(function (item) {
                        var baseInfo = nUtil.getFormattedBaseInfo(item);
                        depContentQueue.push(baseInfo.text.callBackFunBody);
                    });
                }
            }
        });
        return depContentQueue;
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