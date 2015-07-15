'use strict';

module.exports = {
    //top template String
    top: '\n            return (function(modules) {\n                var installedModules = {};\n                function __webpack_require__(moduleId) {\n                    if(installedModules[moduleId])\n                        return installedModules[moduleId].exports;\n                    var module = installedModules[moduleId] = {\n                        exports: {},\n                        id: moduleId,\n                        loaded: false\n                    };\n                    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n                    module.loaded = true;\n                    return module.exports;\n                }\n                __webpack_require__.m = modules;\n                __webpack_require__.c = installedModules;\n                __webpack_require__.p = "";\n                return __webpack_require__(0);\n             })\n             ([\n                    function(module, exports, __webpack_require__) {\n                            module.exports = __webpack_require__(1);\n                    },\n                    function(module, exports, __webpack_require__) {\n                        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n        '
    //dynamic template String: $base, __webpack_require__(2)
    , dynamic: function dynamic(inOrderInlinedVarArr, callBackFunctionBody) {
        var inOrderInlinedVarNames = inOrderInlinedVarArr.join(',');
        return '\n            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [' + inOrderInlinedVarNames + '],\n              __ready_call_fun__ = ' + callBackFunctionBody + ',\n            ';
    }
    //tail template String
    , tail: function tail(tplContentText) {
        var rt = tplFunReturn();
        return '\n                    __WEBPACK_AMD_DEFINE_RESULT__ = __ready_call_fun__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n                },\n                ' + rt + '\n                ]);\n            ';
        function tplFunReturn() {
            var arr = [];
            tplContentText.forEach(function (v) {
                arr.push(iterator(v));
            });
            return arr.join('');
        }
        function iterator(fun) {
            return '\n                    function(module, exports, __webpack_require__) {\n                        module.exports = ' + fun + ';\n                    },\n               ';
        }
    },
    requireFunVarName: function requireFunVarName(index) {
        return '__webpack_require__(' + index + ')';
    },
    defineWrapper: function defineWrapper(name, depsStr, varsStr, bodyStr) {
        return 'define(' + name + ', [' + depsStr + '], function (' + varsStr + ') {' + bodyStr + '})';
    }
};