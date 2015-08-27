const _ = require('lodash');
const otree = require("./tree");
const tempateMap = require("./templateFactory");
const path = require("path");
const $util = require("./util");
const nUtil = require("./nodeUtil");

function defineScope(options) {
    this.options = _.assign({
        regx: {
            tplRaw: /^['"]\.\/[^'"]+['"]$/,
            tpl: /\.\/[^'"]+$/,
        }
    }, options);
    console.log(options);
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
        let resolve = options.resolve;
        let regx = options.regx;
        let contentQueue = [];
        deps = deps.filter((v, k) => {
            v = v.value;
            if (regx.tpl.test(v)) { //deps
                contentQueue.push(this.inlineDefine(v, getTargetDir(options.src, v), true).contents.join(''));
            } 
        });
        return contentQueue;
        function getTargetDir(src, target) {
            var srcDir = $util.dir(options.src);
            var targetDir;
            _.forEach(resolve.alias, function (v, k) {
                if (new RegExp(k).test(target)) {
                    console.log(resolve.root, srcDir, resolve.alias[k].dir);
                    targetDir = path.join(resolve.root, srcDir, resolve.alias[k].dir);
                }
            });
            console.log(targetDir);
            return targetDir || path.join(resolve.root, srcDir);
        }
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
                if (!nUtil.isDefineModule(item)) return;
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
