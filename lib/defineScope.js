
let fs = require("fs");
let _ = require('lodash');
let path = require("path");

let tempateMap = require("./templateFactory");
let nUtil = require("./nodeUtil");
let otree = require("./tree");

let regx = {
    tplRaw: /^['"]\.\/[^'"]+['"]$/,
    tpl: /\.\/[^'"]+$/,
};

module.exports = defineScope;

function defineScope(options) {
    this.options = _.assign({}, options);
}
defineScope.prototype = {

    createRequireFunBody(baseInfo) {

        let baseInfoText = baseInfo.text;
        
        let deps = baseInfoText.oriDeps;
        let vars = baseInfoText.oriVars;

        let inlinedVars = this.inlinedVars(baseInfo);
        let dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
        let tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
        let noInlined = filterVars();

        return tempateMap.defineWrapper(baseInfoText.name, noInlined.deps, noInlined.vars, tempateMap.top + dynamicBody + tail); 

        function filterVars() {

            // match tpl deps regx
            let rtVar = [];
            let rtDeps = [];
            deps.forEach((v, k)=>{
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
    getTplContentByOrder(deps) {
        let $util = require("./util");
        var contentQueue = [];
        deps = deps.filter((v, k) => {
            v = v.value;
            if (regx.tpl.test(v)) {
                contentQueue.push($util.inlineDefine(v, this.options.dir).join(''));
            } 
        });
        return contentQueue;
    },
    inlinedVars(biObj) {
        let baseInfo = biObj.text;
        let vars = baseInfo.oriVars;
        let deps = baseInfo.oriDeps;
        let inlineCounter = 2;
        let inlinedVar = [];
        deps.forEach((v, k)=>{
            if (regx.tplRaw.test(v)) {
                inlinedVar[k] = tempateMap.requireFunVarName(inlineCounter++, v);
            } else {
                inlinedVar[k] = vars[k];
            }
        });
        return inlinedVar
    },
}
