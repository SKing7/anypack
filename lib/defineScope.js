let tempateMap = require("./templateFactory");
let nUtil = require("./nodeUtil");
let otree = require("./tree");

let fs = require("fs");
let _ = require('lodash');
let path = require("path");

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
        let depContentQueue = [];
        deps = deps.filter((v, k) => {
            v = v.value;
            let pathStr;
            if (regx.tpl.test(v)) {
                let tree = new otree({
                    src: path.resolve(path.join('./', this.options.dir, v + '.js'))
                }); 
                let depAst = tree.curAst();
                if (depAst.type === 'Program') {
                    depAst.body.forEach(item => {
                        let baseInfo = nUtil.getFormattedBaseInfo(item)
                        depContentQueue.push(baseInfo.text.callBackFunBody);
                    });
                }
            } 
        });
        return depContentQueue;
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
