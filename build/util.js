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
    filterVars: function filterVars(deps, vars, regx) {

        // match tpl deps regx
        var rtVar = [];
        var rtDeps = [];
        deps.forEach(function (v, k) {
            if (!regx.test(v)) {
                rtVar.push(vars[k]);
                rtDeps.push(v);
            }
        });
        return {
            vars: rtVar,
            deps: rtDeps
        };
    }
};