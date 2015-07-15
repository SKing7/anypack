
module.exports = {
        //top template String
        top: `
            return (function(modules) {
                var installedModules = {};
                function __webpack_require__(moduleId) {
                    if(installedModules[moduleId])
                        return installedModules[moduleId].exports;
                    var module = installedModules[moduleId] = {
                        exports: {},
                        id: moduleId,
                        loaded: false
                    };
                    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    module.loaded = true;
                    return module.exports;
                }
                __webpack_require__.m = modules;
                __webpack_require__.c = installedModules;
                __webpack_require__.p = "";
                return __webpack_require__(0);
             })
             ([
                    function(module, exports, __webpack_require__) {
                            module.exports = __webpack_require__(1);
                    },
                    function(module, exports, __webpack_require__) {
                        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        `
        //dynamic template String: $base, __webpack_require__(2)
        ,dynamic(inOrderInlinedVarArr, callBackFunctionBody){
            let inOrderInlinedVarNames = inOrderInlinedVarArr.join(',');
            return `
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [${inOrderInlinedVarNames}],
              __ready_call_fun__ = ${callBackFunctionBody},
            `;
        }
        //tail template String
        ,tail(tplContentText) {
            let rt = tplFunReturn();
            return `
                    __WEBPACK_AMD_DEFINE_RESULT__ = __ready_call_fun__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                },
                ${rt}
                ]);
            `;
            function tplFunReturn() {
                let arr = [];
                tplContentText.forEach(v=> {
                    arr.push(iterator(v));
                });
                return arr.join('');
            }
            function iterator (fun) {
                return `
                    function(module, exports, __webpack_require__) {
                        module.exports = ${fun};
                    },
               `;
            }  
}
        ,requireFunVarName(index) {
            return `__webpack_require__(${index})`
        }
        ,defineWrapper(name, depsStr, varsStr, bodyStr) {
            return `define(${name}, [${depsStr}], function (${varsStr}) {${bodyStr}})`;
        }
}
