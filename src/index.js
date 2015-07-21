const glob = require("glob");
const fs = require("fs");
const path = require("path");
const async = require("async");
const _ = require("lodash");
const nUtil = require("./nodeUtil");
const tempateMap = require("./templateFactory");
const defineScope = require("./defineScope");
const util = require("./util");

module.exports = opack; 

function opack(options) {
    this.options = _.assign({}, options);
    this._run();
}

opack.prototype.entries = function () {
    let entries = [];
    let entriesObj = [];
    let entryOption = this.options.entry = this.options.entry || [];
    entryOption.forEach(item => {
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
            let instance = new defineScope({
                src: src
            });
            let info = instance.inlineDefine();
            let finalContent = info.contents.join('');
            let destPath =  outdir(info.name);
            fs.writeFileSync(destPath, finalContent)
        });
    });
    function outdir(name) {
        let m = name.match(RegExp(options.nameRegx));
        if (m) {
            name = m[1];
        }
        return path.join(options.outdir, name + '.js');
    }
    async.parallel(parallels, function () {
        console.log('done');
    });
}
