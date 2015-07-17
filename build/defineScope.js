"use strict";

var _ = require("lodash");
var tempateMap = require("./templateFactory");

module.exports = defineScope;

function defineScope(options) {
    this.options = _.assign({
        regx: {
            tplRaw: /^['"]\.\/[^'"]+['"]$/,
            tpl: /\.\/[^'"]+$/
        }
    }, options);
}

defineScope.prototype = {

    createRequireFunBody: function createRequireFunBody(baseInfo) {

        var $util = require("./util");
        var baseInfoText = baseInfo.text;
        var options = this.options();
        var regx = options.regx;

        var deps = baseInfoText.oriDeps;
        var vars = baseInfoText.oriVars;

        var inlinedVars = this.inlinedVars(baseInfo);
        var dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
        var tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
        var noInlined = $util.filterVars(deps, vars, regx.tplRaw);

        return tempateMap.defineWrapper(baseInfoText.name, noInlined.deps, noInlined.vars, tempateMap.top + dynamicBody + tail);
    },
    getTplContentByOrder: function getTplContentByOrder(deps) {
        var _this = this;

        var $util = require("./util");
        var options = this.options();
        var regx = options.regx;
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
        var options = this.options();
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
    }
};