var glob = require("glob");
var async = require("async");
var _ = require("lodash");
var nUtil = require("./nodeUtil");
var defineScope = require("./defineScope");
var otree = require("./tree");
var tempateMap = require("./tplstr");

module.exports = opack; 

function opack(options) {
    this.options = _.assign({}, {}, options);
    this._run();
}

opack.prototype.entries = function () {
    var entries = [];
    var entryOption = this.options.entry;
    _.forEach(entryOption, function (item) {
        var files = glob.sync(item);
        entries = entries.concat(files);
    });
    return entries;
};
opack.prototype._run = function () {
    var parallels = []; 
    var options = this.options;

    this.entries().forEach((src, k)=>{
        parallels.push(()=>{
            let tree = new otree({
                src: src
            });
            let entryAst = tree.curAst();
            let funBody;
            if (entryAst.type === 'Program') {
                entryAst.body.forEach(item =>{
                    let instance = new defineScope({
                        dir: dir(src)
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
function dir(src) {
    src = src.replace(/\\/g, '/');
    let arr = src.split('/');
    arr.pop();
    return arr.join('/');
}
