let _ = require('lodash');
let otree = require("./tree");
let tempateMap = require("./templateFactory");
let path = require("path");
let $util = require("./util.js");
let nUtil = require("./nodeUtil");

function defineScope(options) {
    this.options = _.assign({
        regx: {
            tplRaw: /^['"]\.\/[^'"]+['"]$/,
            tpl: /\.\/[^'"]+$/,
        }
    }, options);
    this.deps = [];
    this.vars = [];
}

defineScope.prototype = {

    createRequireFunBody(baseInfo, onlyFunBody) {

        let baseInfoText = baseInfo.text;
        let options = this.options;
        let regx = options.regx;
        
        let deps = baseInfoText.oriDeps;
        let vars = baseInfoText.oriVars;

        let inlinedVars = this.inlinedVars(baseInfo);
        let dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
        let tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
        let noInlined = $util.filterVars(deps, vars, regx.tplRaw);
        this.deps = noInlined.deps.concat(this.deps);
        this.vars = noInlined.vars.concat(this.vars);

        if (onlyFunBody) {
            return tempateMap.defineWrapperOnlyFunctionBody(tempateMap.top + dynamicBody + tail); 
        } else {
            return tempateMap.defineWrapper(baseInfoText.name, this.deps, this.vars, tempateMap.top + dynamicBody + tail); 
        }

    },
    getTplContentByOrder(deps) {

        let options = this.options;
        let regx = options.regx;
        let contentQueue = [];
        deps = deps.filter((v, k) => {
            v = v.value;
            if (regx.tpl.test(v)) { //deps
                contentQueue.push(this.inlineDefine(v, $util.dir(options.src), true).contents.join(''));
            } 
        });
        return contentQueue;
    },
    inlinedVars(biObj) {

        let baseInfo = biObj.text;
        let vars = baseInfo.oriVars;
        let deps = baseInfo.oriDeps;
        let inlineCounter = 2;
        let options = this.options;
        let regx = options.regx;
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
    inlineDefine(src, dir = '', depDefine = false) {
        src = src || this.options.src;
        let bodyArr = [];
        let options = this.options;
        let tree = new otree({
            src: path.join(dir, src)
        });
        let entryAst = tree.curAst();
        let baseInfo;

        if (nUtil.isProgram(entryAst)) {
            entryAst.body.forEach(item =>{
                baseInfo = nUtil.getFormattedBaseInfo(item);
                let bodyResult = this.createRequireFunBody(baseInfo, depDefine)
                bodyArr.push(bodyResult);
            });
        }
        return {
            contents: bodyArr,
            name: $util.transformRaw(baseInfo.text.name)
        };
    },
}
module.exports = defineScope;
