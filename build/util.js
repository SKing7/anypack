"use strict";

var otree = require("./tree");
var path = require("path");
var nUtil = require("./nodeUtil");
var defineScope = require("./defineScope");

module.exports = {
    dir: function dir(src) {
        var arr = undefined;
        src = src.replace(/\\/g, "/");
        arr = src.split("/");
        arr.pop();
        return arr.join("/");
    },
    inlineDefine: function inlineDefine(src, dir) {
        var _this = this;

        var bodyArr = [];
        var tree = new otree({
            src: path.join(dir || "", src)
        });
        var entryAst = tree.curAst();
        if (nUtil.isProgram(entryAst)) {
            (function () {
                var instance = new defineScope({
                    dir: dir || _this.dir(src)
                });
                entryAst.body.forEach(function (item) {
                    var baseInfo = nUtil.getFormattedBaseInfo(item);
                    var bodyResult = instance.createRequireFunBody(baseInfo);
                    bodyArr.push(bodyResult);
                });
            })();
        }
        return bodyArr;
    }
};