/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var opack = __webpack_require__(2);
	new opack({
	    entry: ['test/entry_1.js', 'test/entry_2.js'],
	    nameRegx: 'comp/(.*)',
	    outdir: 'dest'
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var glob = __webpack_require__(3);
	var fs = __webpack_require__(4);
	var path = __webpack_require__(5);
	var async = __webpack_require__(6);
	var _ = __webpack_require__(7);
	var nUtil = __webpack_require__(8);
	var tempateMap = __webpack_require__(10);
	var defineScope = __webpack_require__(11);
	var util = __webpack_require__(14);

	module.exports = opack;

	function opack(options) {
	    this.options = _.assign({}, options);
	    this._run();
	}

	opack.prototype.entries = function () {
	    var entries = [];
	    var entriesObj = [];
	    var entryOption = this.options.entry = this.options.entry || [];
	    entryOption.forEach(function (item) {
	        var files = glob.sync(item);
	        entries = entries.concat(files);
	    });
	    return entries;
	};
	opack.prototype._run = function () {
	    var _this = this;

	    var parallels = [];
	    var options = this.options;

	    this.entries().forEach(function (src, k) {
	        parallels.push(function () {
	            var instance = new defineScope({
	                src: src
	            });
	            var info = instance.inlineDefine();
	            var finalContent = info.contents.join("");
	            var destPath = path.join(_this.options.outdir, (info.name.match(RegExp(options.nameRegx))[1] || info.name) + ".js");
	            fs.writeFileSync(destPath, finalContent);
	        });
	    });
	    async.parallel(parallels, function () {
	        console.log("done");
	    });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = glob;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = fs;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = path;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = async;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = lodash;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = {};
	var _ = __webpack_require__(7);
	var escodegen = __webpack_require__(9);

	module.exports = util;

	util.getDefineFunBody = function (node, options) {
	    //console.log(JSON.stringify(node, null, 4));
	    if (this.isDefineModule(node)) {
	        return node.expression.arguments[2];
	    }
	};
	util.isDefineModule = function (node) {
	    var callee = undefined;
	    var expression = undefined;
	    if (node.type === 'ExpressionStatement') {
	        expression = node.expression;
	        callee = expression.callee;
	        if (callee.type === 'Identifier' && callee.name === 'define') {
	            return true;
	        }
	    }
	};
	util.astToString = function (ast) {
	    var _this = this;

	    if (this.type(ast, 'array')) {
	        var _ret = (function () {
	            var tmpArr = [];
	            ast.forEach(function (v) {
	                tmpArr.push(_this.astToString(v));
	            });
	            return {
	                v: tmpArr
	            };
	        })();

	        if (typeof _ret === 'object') return _ret.v;
	    }
	    return escodegen.generate(ast);
	};
	util.getFormattedBaseInfo = function (node) {
	    var callee = undefined;
	    var clonedNode = _.clone(node, true);
	    var expression = undefined;
	    var expArgs = undefined;
	    var secondArg = undefined;
	    var oriDeps = undefined;
	    var oriVars = undefined;
	    var name = undefined;

	    if (this.isDefineModule(clonedNode)) {
	        expression = clonedNode.expression;
	        callee = expression.callee;
	        expArgs = expression.arguments;
	        secondArg = expArgs[1];
	        if (secondArg.type === 'ArrayExpression') {
	            name = expArgs[0];
	            oriDeps = secondArg.elements;
	            if (expArgs[2] && expArgs[2].type === 'FunctionExpression') {
	                oriVars = expArgs[2].params;
	            }
	        }
	    }
	    return {
	        name: name,
	        origin: node,
	        oriDeps: oriDeps,
	        oriVars: oriVars,
	        callBackFunBody: this.getDefineFunBody(node),
	        text: {
	            name: this.astToString(name),
	            origin: this.astToString(node),
	            oriDeps: this.astToString(oriDeps),
	            oriVars: this.astToString(oriVars),
	            callBackFunBody: this.astToString(this.getDefineFunBody(node))
	        }
	    };
	};
	util.isProgram = function (target) {
	    return target && target.type === 'Program';
	};
	util.type = function (target, type) {
	    if (typeof type === 'string') {
	        return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
	    } else if (target) {
	        var matched = Object.prototype.toString.call(target).toLowerCase().match(/\[object (\S+)\]/);
	        if (matched) {
	            return matched[1].toLowerCase();
	        }
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = escodegen;

/***/ },
/* 10 */
/***/ function(module, exports) {

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
	    },
	    defineWrapperOnlyFunctionBody: function defineWrapperOnlyFunctionBody(bodyStr) {
	        return '(function() {' + bodyStr + '}())';
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(7);
	var otree = __webpack_require__(12);
	var tempateMap = __webpack_require__(10);
	var path = __webpack_require__(5);
	var $util = __webpack_require__(14);
	var nUtil = __webpack_require__(8);

	function defineScope(options) {
	    this.options = _.assign({
	        regx: {
	            tplRaw: /^['"]\.\/[^'"]+['"]$/,
	            tpl: /\.\/[^'"]+$/
	        }
	    }, options);
	    this.deps = [];
	    this.vars = [];
	}

	defineScope.prototype = {

	    createRequireFunBody: function createRequireFunBody(baseInfo, onlyFunBody) {

	        var baseInfoText = baseInfo.text;
	        var options = this.options;
	        var regx = options.regx;

	        var deps = baseInfoText.oriDeps;
	        var vars = baseInfoText.oriVars;

	        var inlinedVars = this.inlinedVars(baseInfo);
	        var dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
	        var tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
	        var noInlined = $util.filterVars(deps, vars, regx.tplRaw);
	        this.deps = noInlined.deps.concat(this.deps);
	        this.vars = noInlined.vars.concat(this.vars);

	        if (onlyFunBody) {
	            return tempateMap.defineWrapperOnlyFunctionBody(tempateMap.top + dynamicBody + tail);
	        } else {
	            return tempateMap.defineWrapper(baseInfoText.name, this.deps, this.vars, tempateMap.top + dynamicBody + tail);
	        }
	    },
	    getTplContentByOrder: function getTplContentByOrder(deps) {
	        var _this = this;

	        var options = this.options;
	        var regx = options.regx;
	        var contentQueue = [];
	        deps = deps.filter(function (v, k) {
	            v = v.value;
	            if (regx.tpl.test(v)) {
	                //deps
	                contentQueue.push(_this.inlineDefine(v, $util.dir(options.src), true).contents.join(""));
	            }
	        });
	        return contentQueue;
	    },
	    inlinedVars: function inlinedVars(biObj) {

	        var baseInfo = biObj.text;
	        var vars = baseInfo.oriVars;
	        var deps = baseInfo.oriDeps;
	        var inlineCounter = 2;
	        var options = this.options;
	        var regx = options.regx;
	        var inlinedVar = [];

	        deps.forEach(function (v, k) {
	            if (regx.tplRaw.test(v)) {
	                inlinedVar[k] = tempateMap.requireFunVarName(inlineCounter++, v);
	            } else {
	                inlinedVar[k] = vars[k];
	            }
	        });
	        return inlinedVar;
	    },
	    inlineDefine: function inlineDefine(src) {
	        var _this2 = this;

	        var dir = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	        var depDefine = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	        src = src || this.options.src;
	        var bodyArr = [];
	        var options = this.options;
	        var tree = new otree({
	            src: path.join(dir, src)
	        });
	        var entryAst = tree.curAst();
	        var baseInfo = undefined;

	        if (nUtil.isProgram(entryAst)) {
	            entryAst.body.forEach(function (item) {
	                baseInfo = nUtil.getFormattedBaseInfo(item);
	                var bodyResult = _this2.createRequireFunBody(baseInfo, depDefine);
	                bodyArr.push(bodyResult);
	            });
	        }
	        return {
	            contents: bodyArr,
	            name: $util.transformRaw(baseInfo.text.name)
	        };
	    }
	};
	module.exports = defineScope;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var escodegen = __webpack_require__(9);
	var path = __webpack_require__(5);
	var esprima = __webpack_require__(13);
	var _ = __webpack_require__(7);
	var fs = __webpack_require__(4);

	function otree(pOptions) {
	    var options = this.options = this.options || {};
	    _.assign(options, pOptions);
	    if (options.src && path.extname(options.src).slice(1) !== (options.ext || 'js')) {
	        options.src = options.src + '.js';
	    }
	    this._ast = this._parse(options.content || fs.readFileSync(options.src));
	    return this;
	}

	var depPath = function depPath(name, base) {
	    var extOrigin = path.extname(name);
	    var noExtName = name.slice(0, name.length - extOrigin.length);
	    var ext = alias[extOrigin.slice(-1)] || 'js';
	    var arr = undefined;
	    base = base.replace(/\\/g, '/');
	    arr = base.split('/');
	    arr.splice(arr.length - 1, 1, noExtName + '.' + ext);
	    return path.join.apply(path, arr);
	};

	otree.prototype._parse = function (code) {
	    var ast = esprima.parse(code);
	    return ast;
	};

	otree.prototype.curAst = function (node) {
	    return this._ast;
	};

	otree.astToString = function () {
	    return escodegen.generate(this._ast);
	};

	module.exports = otree;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = esprima;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var otree = __webpack_require__(12);
	var path = __webpack_require__(5);
	var nUtil = __webpack_require__(8);
	var defineScope = __webpack_require__(11);

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
	    },
	    transformRaw: function transformRaw(str) {
	        return str.replace(/^['"](.*)['"]$/, "$1");
	    }
	};

/***/ }
/******/ ]);
