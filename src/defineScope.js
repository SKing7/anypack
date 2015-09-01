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
            let config;
            let normalizedSrc;
            let  srcDir = $util.dir(options.src);
            if (regx.tpl.test(v)) { //deps
                config = getTargetConfig(v);
                normalizedSrc = normalizeSrc(v, config); 
                contentQueue.push(this.inlineDefine(normalizedSrc, path.join(config.root, srcDir, config.dir || ''), true).contents.join(''));
            } 
        });
        return contentQueue;
        function getTargetConfig(target) {
            var config = resolve ;
            _.some(resolve.alias, function (v, k) {
                if (new RegExp(k).test(target)) {
                    config = _.assign({}, resolve, v);
                    return true
                }
            });
            return config;
        }
        function normalizeSrc(src, config) {
            var ext = path.extname;
            if (config.ext && ext !== '.' + config.ext) {
                return src + '.' + config.ext;
            }
            return src;
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
