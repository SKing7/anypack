"use strict";

var glob = require("glob");
var async = require("async");
var _ = require("lodash");
var nUtil = require("./nodeUtil");
var tempateMap = require("./templateFactory");
var defineScope = require("./defineScope");
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
    //let options = this.options;

    this.entries().forEach(function (src, k) {
        parallels.push(function () {
            var instance = new defineScope({
                src: src
            });
            var finalContent = instance.inlineDefine();
            console.log(finalContent[0]);
        });
    });
    async.parallel(parallels, function () {
        console.log("done");
    });
};