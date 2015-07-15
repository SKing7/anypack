let glob = require("glob");
let async = require("async");
let _ = require("lodash");
let nUtil = require("./nodeUtil");
let defineScope = require("./defineScope");
let otree = require("./tree");
let tempateMap = require("./templateFactory");
let util = require("./util");

module.exports = opack; 

function opack(options) {
    this.options = _.assign({}, options);
    this._run();
}

opack.prototype.entries = function () {
    let entries = [];
    let entryOption = this.options.entry;
    _.forEach(entryOption, function (item) {
        let files = glob.sync(item);
        entries = entries.concat(files);
    });
    return entries;
};
opack.prototype._run = function () {
    let parallels = []; 
    let options = this.options;

    this.entries().forEach((src, k)=>{
        parallels.push(()=>{
            let tree = new otree({
                src: src
            });
            let entryAst = tree.curAst();
            if (entryAst.type === 'Program') {
                entryAst.body.forEach(item =>{
                    let instance = new defineScope({
                        dir: util.dir(src)
                    });
                    let baseInfo = nUtil.getFormattedBaseInfo(item, options);
                    let bodyResult = instance.createRequireFunBody(baseInfo)
                    console.log(bodyResult);
                });
            }
        });
    });
    async.parallel(parallels, function () {
        console.log('done');
    });
}
