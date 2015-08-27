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
    this.options = _.assign({
        nameRegx: '',
        output: {},
        entry: [],
        resolve: {
            root: process.cwd(),
            alias: {},
        } 
    }, options);
    console.log(this.options);
    this._run();
}

opack.prototype.entries = function () {
    let entries = [];
    let entriesObj = [];
    let entryOption = this.options.entry;
    entryOption.forEach(item => {
        let files = glob.sync(item);
        entries = entries.concat(files);
    });
    return entries;
};
opack.prototype._run = function () {
    let parallels = []; 
    let options = this.options;
    var outConfig = options.output;

    this.entries().forEach((src, k)=>{
        parallels.push(()=>{
            let instance = new defineScope({
                src: src,
                resolve: options.resolve
            });
            let info = instance.inlineDefine();
            let finalContent = info.contents.join('');
            let destPath =  outdir(info.name);
            fs.writeFileSync(destPath, finalContent)
        });
    });
    function outdir(name) {
        let m = name.match(RegExp(outConfig.fileNamePattern));
        if (m) {
            name = m[1];
        }
        return path.join(outConfig.path, name + '.js');
    }
    async.parallel(parallels, function () {
        console.log('done');
    });
}
