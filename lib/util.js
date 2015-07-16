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
    inlineDefine(src, dir) {
        var bodyArr = [];
        let tree = new otree({
            src: path.join(dir || '', src)
        });
        let entryAst = tree.curAst();
        if (nUtil.isProgram(entryAst)) {
            let instance = new defineScope({
                dir: dir || this.dir(src)
            });
            entryAst.body.forEach(item =>{
                let baseInfo = nUtil.getFormattedBaseInfo(item);
                let bodyResult = instance.createRequireFunBody(baseInfo)
                bodyArr.push(bodyResult);
            });
        }
        return bodyArr;
    }
};
