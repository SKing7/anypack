let glob = require("glob");
let async = require("async");
let _ = require("lodash");
let nUtil = require("./nodeUtil");
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
    //let options = this.options;

    this.entries().forEach((src, k)=>{
        parallels.push(()=>{
            var finalContent = util.inlineDefine(src);
            console.log(finalContent[0]);
        });
    });
    async.parallel(parallels, function () {
        console.log('done');
    });
}
