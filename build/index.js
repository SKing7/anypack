"use strict";

var glob = require("glob");
var async = require("async");
var _ = require("lodash");
var nUtil = require("./nodeUtil");
var defineScope = require("./defineScope");
var otree = require("./tree");
var tempateMap = require("./templateFactory");
var util = require("./util");

module.exports = opack;

function opack(options) {
    this.options = _.assign({}, options);
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

    this.entries().forEach(function (src, k) {
        parallels.push(function () {
            var tree = new otree({
                src: src
            });
            var entryAst = tree.curAst();
            if (entryAst.type === "Program") {
                entryAst.body.forEach(function (item) {
                    var instance = new defineScope({
                        dir: util.dir(src)
                    });
                    var baseInfo = nUtil.getFormattedBaseInfo(item, options);
                    var bodyResult = instance.createRequireFunBody(baseInfo);
                    console.log(bodyResult);
                });
            }
        });
    });
    async.parallel(parallels, function () {
        console.log("done");
    });
};