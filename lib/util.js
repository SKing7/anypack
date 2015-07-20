let otree = require("./tree");
let path = require("path");
let nUtil = require("./nodeUtil");
let defineScope = require("./defineScope");

module.exports = {
    dir(src) {
        let arr;
        src = src.replace(/\\/g, '/');
        arr = src.split('/');
        arr.pop();
        return arr.join('/');
    },
    filterVars(deps, vars, regx) {

        // match tpl deps regx
        let rtVar = [];
        let rtDeps = [];
        deps.forEach((v, k)=>{
            if (!regx.test(v)) {
                rtVar.push(vars[k]);
                rtDeps.push(v);
            }
        });
        return {
            vars: rtVar,
            deps: rtDeps
        };
    },
    transformRaw(str) {
        return str.replace(/^['"](.*)['"]$/, '$1');
    }
};
