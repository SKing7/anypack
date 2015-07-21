"format register";
System.register("github:jspm/nodelibs-fs@0.1.2/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (System._nodeRequire) {
    module.exports = System._nodeRequire('fs');
  } else {
    exports.readFileSync = function(address) {
      var output;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', address, false);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
          var status = xhr.status;
          if ((status > 399 && status < 600) || status == 400) {
            throw 'File read error on ' + address;
          } else
            output = xhr.responseText;
        }
      };
      xhr.send(null);
      return output;
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:concat-map@0.0.1/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x))
        res.push.apply(res, x);
      else
        res.push(x);
    }
    return res;
  };
  var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:balanced-match@0.2.0/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = balanced;
  function balanced(a, b, str) {
    var bal = 0;
    var m = {};
    var ended = false;
    for (var i = 0; i < str.length; i++) {
      if (a == str.substr(i, a.length)) {
        if (!('start' in m))
          m.start = i;
        bal++;
      } else if (b == str.substr(i, b.length) && 'start' in m) {
        ended = true;
        bal--;
        if (!bal) {
          m.end = i;
          m.pre = str.substr(0, m.start);
          m.body = (m.end - m.start > 1) ? str.substring(m.start + a.length, m.end) : '';
          m.post = str.slice(m.end + b.length);
          return m;
        }
      }
    }
    if (bal && ended) {
      var start = m.start + a.length;
      m = balanced(a, b, str.substr(start));
      if (m) {
        m.start += start;
        m.end += start;
        m.pre = str.slice(0, start) + m.pre;
      }
      return m;
    }
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:inherits@2.0.1/inherits_browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (typeof Object.create === 'function') {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }});
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:events@1.0.2/events", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  EventEmitter.defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };
  EventEmitter.prototype.emit = function(type) {
    var er,
        handler,
        len,
        args,
        i,
        listeners;
    if (!this._events)
      this._events = {};
    if (type === 'error') {
      if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er;
        }
        throw TypeError('Uncaught, unspecified "error" event.');
      }
    }
    handler = this._events[type];
    if (isUndefined(handler))
      return false;
    if (isFunction(handler)) {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      len = arguments.length;
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }
    return true;
  };
  EventEmitter.prototype.addListener = function(type, listener) {
    var m;
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    if (!this._events)
      this._events = {};
    if (this._events.newListener)
      this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
    if (!this._events[type])
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      this._events[type].push(listener);
    else
      this._events[type] = [this._events[type], listener];
    if (isObject(this._events[type]) && !this._events[type].warned) {
      var m;
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
        if (typeof console.trace === 'function') {
          console.trace();
        }
      }
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    var fired = false;
    function g() {
      this.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
    g.listener = listener;
    this.on(type, g);
    return this;
  };
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list,
        position,
        length,
        i;
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    if (!this._events || !this._events[type])
      return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    } else if (isObject(list)) {
      for (i = length; i-- > 0; ) {
        if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function(type) {
    var key,
        listeners;
    if (!this._events)
      return this;
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener')
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }
    listeners = this._events[type];
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else {
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
    return this;
  };
  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };
  EventEmitter.listenerCount = function(emitter, type) {
    var ret;
    if (!emitter._events || !emitter._events[type])
      ret = 0;
    else if (isFunction(emitter._events[type]))
      ret = 1;
    else
      ret = emitter._events[type].length;
    return ret;
  };
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:util@0.10.3/support/isBufferBrowser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function isBuffer(arg) {
    return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:path-is-absolute@1.0.0/index", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    function posix(path) {
      return path.charAt(0) === '/';
    }
    ;
    function win32(path) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path);
      var device = result[1] || '';
      var isUnc = !!device && device.charAt(1) !== ':';
      return !!result[2] || isUnc;
    }
    ;
    module.exports = process.platform === 'win32' ? win32 : posix;
    module.exports.posix = posix;
    module.exports.win32 = win32;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-util@0.1.0/index", ["npm:util@0.10.3"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('util') : require("npm:util@0.10.3");
  global.define = __define;
  return module.exports;
});

System.register("npm:glob@5.0.14/common", ["github:jspm/nodelibs-path@0.1.0", "npm:minimatch@2.0.9", "npm:path-is-absolute@1.0.0", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    exports.alphasort = alphasort;
    exports.alphasorti = alphasorti;
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var path = require("github:jspm/nodelibs-path@0.1.0");
    var minimatch = require("npm:minimatch@2.0.9");
    var isAbsolute = require("npm:path-is-absolute@1.0.0");
    var Minimatch = minimatch.Minimatch;
    function alphasorti(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    function alphasort(a, b) {
      return a.localeCompare(b);
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === '/**') {
        var gpattern = pattern.replace(/(\/\*\*)+$/, '');
        gmatcher = new Minimatch(gpattern);
      }
      return {
        matcher: new Minimatch(pattern),
        gmatcher: gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || Object.create(null);
      self.statCache = options.statCache || Object.create(null);
      self.symlinks = options.symlinks || Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = options.cwd;
        self.changedCwd = path.resolve(options.cwd) !== cwd;
      }
      self.root = options.root || path.resolve(self.cwd, "/");
      self.root = path.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = options.nonegate === false ? false : true;
      options.nocomment = options.nocomment === false ? false : true;
      deprecationWarning(options);
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    exports.deprecationWarned;
    function deprecationWarning(options) {
      if (!options.nonegate || !options.nocomment) {
        if (process.noDeprecation !== true && !exports.deprecationWarned) {
          var msg = 'glob WARNING: comments and negation will be disabled in v6';
          if (process.throwDeprecation)
            throw new Error(msg);
          else if (process.traceDeprecation)
            console.trace(msg);
          else
            console.error(msg);
          exports.deprecationWarned = true;
        }
      }
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : Object.create(null);
      for (var i = 0,
          l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m) {
              all[m] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(self.nocase ? alphasorti : alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            return !(/\/$/.test(e));
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m) {
          return !isIgnored(self, m);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c = self.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === 'DIR' || Array.isArray(c);
        var slash = p.slice(-1) === '/';
        if (isDir && !slash)
          m += '/';
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === '/') {
        abs = path.join(self.root, f);
      } else if (isAbsolute(f) || f === '') {
        abs = f;
      } else if (self.changedCwd) {
        abs = path.resolve(self.cwd, f);
      } else {
        abs = path.resolve(f);
      }
      return abs;
    }
    function isIgnored(self, path) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
      });
    }
    function childrenIgnored(self, path) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path));
      });
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:wrappy@1.0.1/wrappy", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb)
      return wrappy(fn)(cb);
    if (typeof fn !== 'function')
      throw new TypeError('need wrapper function');
    Object.keys(fn).forEach(function(k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb = args[args.length - 1];
      if (typeof ret === 'function' && ret !== cb) {
        Object.keys(cb).forEach(function(k) {
          ret[k] = cb[k];
        });
      }
      return ret;
    }
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:once@1.3.2/once", ["npm:wrappy@1.0.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var wrappy = require("npm:wrappy@1.0.1");
  module.exports = wrappy(once);
  once.proto = once(function() {
    Object.defineProperty(Function.prototype, 'once', {
      value: function() {
        return once(this);
      },
      configurable: true
    });
  });
  function once(fn) {
    var f = function() {
      if (f.called)
        return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:fs@0.0.2/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  console.log("I'm `fs` modules");
  global.define = __define;
  return module.exports;
});

System.register("npm:path@0.11.14/path", ["github:jspm/nodelibs-util@0.1.0", "github:jspm/nodelibs-fs@0.1.2", "github:jspm/nodelibs-fs@0.1.2", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var process = process || {};
    (function() {
      "use strict";
      var isWindows = process.platform === 'win32';
      var util = require("github:jspm/nodelibs-util@0.1.0");
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      }
      if (isWindows) {
        var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
        var splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var splitPath = function(filename) {
          var result = splitDeviceRe.exec(filename),
              device = (result[1] || '') + (result[2] || ''),
              tail = result[3] || '';
          var result2 = splitTailRe.exec(tail),
              dir = result2[1],
              basename = result2[2],
              ext = result2[3];
          return [device, dir, basename, ext];
        };
        var normalizeUNCRoot = function(device) {
          return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
        };
        exports.resolve = function() {
          var resolvedDevice = '',
              resolvedTail = '',
              resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1; i--) {
            var path;
            if (i >= 0) {
              path = arguments[i];
            } else if (!resolvedDevice) {
              path = process.cwd();
            } else {
              path = process.env['=' + resolvedDevice];
              if (!path || path.substr(0, 3).toLowerCase() !== resolvedDevice.toLowerCase() + '\\') {
                path = resolvedDevice + '\\';
              }
            }
            if (!util.isString(path)) {
              throw new TypeError('Arguments to path.resolve must be strings');
            } else if (!path) {
              continue;
            }
            var result = splitDeviceRe.exec(path),
                device = result[1] || '',
                isUnc = device && device.charAt(1) !== ':',
                isAbsolute = exports.isAbsolute(path),
                tail = result[3];
            if (device && resolvedDevice && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
              continue;
            }
            if (!resolvedDevice) {
              resolvedDevice = device;
            }
            if (!resolvedAbsolute) {
              resolvedTail = tail + '\\' + resolvedTail;
              resolvedAbsolute = isAbsolute;
            }
            if (resolvedDevice && resolvedAbsolute) {
              break;
            }
          }
          if (isUnc) {
            resolvedDevice = normalizeUNCRoot(resolvedDevice);
          }
          function f(p) {
            return !!p;
          }
          resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/).filter(f), !resolvedAbsolute).join('\\');
          return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) || '.';
        };
        exports.normalize = function(path) {
          var result = splitDeviceRe.exec(path),
              device = result[1] || '',
              isUnc = device && device.charAt(1) !== ':',
              isAbsolute = exports.isAbsolute(path),
              tail = result[3],
              trailingSlash = /[\\\/]$/.test(tail);
          if (device && device.charAt(1) === ':') {
            device = device[0].toLowerCase() + device.substr(1);
          }
          tail = normalizeArray(tail.split(/[\\\/]+/).filter(function(p) {
            return !!p;
          }), !isAbsolute).join('\\');
          if (!tail && !isAbsolute) {
            tail = '.';
          }
          if (tail && trailingSlash) {
            tail += '\\';
          }
          if (isUnc) {
            device = normalizeUNCRoot(device);
          }
          return device + (isAbsolute ? '\\' : '') + tail;
        };
        exports.isAbsolute = function(path) {
          var result = splitDeviceRe.exec(path),
              device = result[1] || '',
              isUnc = !!device && device.charAt(1) !== ':';
          return !!result[2] || isUnc;
        };
        exports.join = function() {
          function f(p) {
            if (!util.isString(p)) {
              throw new TypeError('Arguments to path.join must be strings');
            }
            return p;
          }
          var paths = Array.prototype.filter.call(arguments, f);
          var joined = paths.join('\\');
          if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
            joined = joined.replace(/^[\\\/]{2,}/, '\\');
          }
          return exports.normalize(joined);
        };
        exports.relative = function(from, to) {
          from = exports.resolve(from);
          to = exports.resolve(to);
          var lowerFrom = from.toLowerCase();
          var lowerTo = to.toLowerCase();
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== '')
                break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== '')
                break;
            }
            if (start > end)
              return [];
            return arr.slice(start, end + 1);
          }
          var toParts = trim(to.split('\\'));
          var lowerFromParts = trim(lowerFrom.split('\\'));
          var lowerToParts = trim(lowerTo.split('\\'));
          var length = Math.min(lowerFromParts.length, lowerToParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (lowerFromParts[i] !== lowerToParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          if (samePartsLength == 0) {
            return to;
          }
          var outputParts = [];
          for (var i = samePartsLength; i < lowerFromParts.length; i++) {
            outputParts.push('..');
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join('\\');
        };
        exports.sep = '\\';
        exports.delimiter = ';';
      } else {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        var splitPath = function(filename) {
          return splitPathRe.exec(filename).slice(1);
        };
        exports.resolve = function() {
          var resolvedPath = '',
              resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = (i >= 0) ? arguments[i] : process.cwd();
            if (!util.isString(path)) {
              throw new TypeError('Arguments to path.resolve must be strings');
            } else if (!path) {
              continue;
            }
            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charAt(0) === '/';
          }
          resolvedPath = normalizeArray(resolvedPath.split('/').filter(function(p) {
            return !!p;
          }), !resolvedAbsolute).join('/');
          return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
        };
        exports.normalize = function(path) {
          var isAbsolute = exports.isAbsolute(path),
              trailingSlash = path[path.length - 1] === '/',
              segments = path.split('/'),
              nonEmptySegments = [];
          for (var i = 0; i < segments.length; i++) {
            if (segments[i]) {
              nonEmptySegments.push(segments[i]);
            }
          }
          path = normalizeArray(nonEmptySegments, !isAbsolute).join('/');
          if (!path && !isAbsolute) {
            path = '.';
          }
          if (path && trailingSlash) {
            path += '/';
          }
          return (isAbsolute ? '/' : '') + path;
        };
        exports.isAbsolute = function(path) {
          return path.charAt(0) === '/';
        };
        exports.join = function() {
          var path = '';
          for (var i = 0; i < arguments.length; i++) {
            var segment = arguments[i];
            if (!util.isString(segment)) {
              throw new TypeError('Arguments to path.join must be strings');
            }
            if (segment) {
              if (!path) {
                path += segment;
              } else {
                path += '/' + segment;
              }
            }
          }
          return exports.normalize(path);
        };
        exports.relative = function(from, to) {
          from = exports.resolve(from).substr(1);
          to = exports.resolve(to).substr(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== '')
                break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== '')
                break;
            }
            if (start > end)
              return [];
            return arr.slice(start, end + 1);
          }
          var fromParts = trim(from.split('/'));
          var toParts = trim(to.split('/'));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push('..');
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join('/');
        };
        exports.sep = '/';
        exports.delimiter = ':';
      }
      exports.dirname = function(path) {
        var result = splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          return '.';
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      };
      exports.basename = function(path, ext) {
        var f = splitPath(path)[2];
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length);
        }
        return f;
      };
      exports.extname = function(path) {
        return splitPath(path)[3];
      };
      exports.exists = util.deprecate(function(path, callback) {
        require("github:jspm/nodelibs-fs@0.1.2").exists(path, callback);
      }, 'path.exists is now called `fs.exists`.');
      exports.existsSync = util.deprecate(function(path) {
        return require("github:jspm/nodelibs-fs@0.1.2").existsSync(path);
      }, 'path.existsSync is now called `fs.existsSync`.');
      if (isWindows) {
        exports._makeLong = function(path) {
          if (!util.isString(path))
            return path;
          if (!path) {
            return '';
          }
          var resolvedPath = exports.resolve(path);
          if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
            return '\\\\?\\' + resolvedPath;
          } else if (/^\\\\[^?.]/.test(resolvedPath)) {
            return '\\\\?\\UNC\\' + resolvedPath.substring(2);
          }
          return path;
        };
      } else {
        exports._makeLong = function(path) {
          return path;
        };
      }
    }());
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:async@1.4.0/lib/async", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    (function() {
      var async = {};
      function noop() {}
      function identity(v) {
        return v;
      }
      function toBool(v) {
        return !!v;
      }
      function notId(v) {
        return !v;
      }
      var previous_async;
      var root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global || this;
      if (root != null) {
        previous_async = root.async;
      }
      async.noConflict = function() {
        root.async = previous_async;
        return async;
      };
      function only_once(fn) {
        return function() {
          if (fn === null)
            throw new Error("Callback was already called.");
          fn.apply(this, arguments);
          fn = null;
        };
      }
      function _once(fn) {
        return function() {
          if (fn === null)
            return ;
          fn.apply(this, arguments);
          fn = null;
        };
      }
      var _toString = Object.prototype.toString;
      var _isArray = Array.isArray || function(obj) {
        return _toString.call(obj) === '[object Array]';
      };
      function _isArrayLike(arr) {
        return _isArray(arr) || (typeof arr.length === "number" && arr.length >= 0 && arr.length % 1 === 0);
      }
      function _each(coll, iterator) {
        return _isArrayLike(coll) ? _arrayEach(coll, iterator) : _forEachOf(coll, iterator);
      }
      function _arrayEach(arr, iterator) {
        var index = -1,
            length = arr.length;
        while (++index < length) {
          iterator(arr[index], index, arr);
        }
      }
      function _map(arr, iterator) {
        var index = -1,
            length = arr.length,
            result = Array(length);
        while (++index < length) {
          result[index] = iterator(arr[index], index, arr);
        }
        return result;
      }
      function _range(count) {
        return _map(Array(count), function(v, i) {
          return i;
        });
      }
      function _reduce(arr, iterator, memo) {
        _arrayEach(arr, function(x, i, a) {
          memo = iterator(memo, x, i, a);
        });
        return memo;
      }
      function _forEachOf(object, iterator) {
        _arrayEach(_keys(object), function(key) {
          iterator(object[key], key);
        });
      }
      function _indexOf(arr, item) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === item)
            return i;
        }
        return -1;
      }
      var _keys = Object.keys || function(obj) {
        var keys = [];
        for (var k in obj) {
          if (obj.hasOwnProperty(k)) {
            keys.push(k);
          }
        }
        return keys;
      };
      function _keyIterator(coll) {
        var i = -1;
        var len;
        var keys;
        if (_isArrayLike(coll)) {
          len = coll.length;
          return function next() {
            i++;
            return i < len ? i : null;
          };
        } else {
          keys = _keys(coll);
          len = keys.length;
          return function next() {
            i++;
            return i < len ? keys[i] : null;
          };
        }
      }
      function _restParam(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
          var length = Math.max(arguments.length - startIndex, 0);
          var rest = Array(length);
          for (var index = 0; index < length; index++) {
            rest[index] = arguments[index + startIndex];
          }
          switch (startIndex) {
            case 0:
              return func.call(this, rest);
            case 1:
              return func.call(this, arguments[0], rest);
            case 2:
              return func.call(this, arguments[0], arguments[1], rest);
          }
        };
      }
      function _withoutIndex(iterator) {
        return function(value, index, callback) {
          return iterator(value, callback);
        };
      }
      var _setImmediate = typeof setImmediate === 'function' && setImmediate;
      var _delay = _setImmediate ? function(fn) {
        _setImmediate(fn);
      } : function(fn) {
        setTimeout(fn, 0);
      };
      if (typeof process === 'object' && typeof process.nextTick === 'function') {
        async.nextTick = process.nextTick;
      } else {
        async.nextTick = _delay;
      }
      async.setImmediate = _setImmediate ? _delay : async.nextTick;
      async.forEach = async.each = function(arr, iterator, callback) {
        return async.eachOf(arr, _withoutIndex(iterator), callback);
      };
      async.forEachSeries = async.eachSeries = function(arr, iterator, callback) {
        return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
      };
      async.forEachLimit = async.eachLimit = function(arr, limit, iterator, callback) {
        return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
      };
      async.forEachOf = async.eachOf = function(object, iterator, callback) {
        callback = _once(callback || noop);
        object = object || [];
        var size = _isArrayLike(object) ? object.length : _keys(object).length;
        var completed = 0;
        if (!size) {
          return callback(null);
        }
        _each(object, function(value, key) {
          iterator(object[key], key, only_once(done));
        });
        function done(err) {
          if (err) {
            callback(err);
          } else {
            completed += 1;
            if (completed >= size) {
              callback(null);
            }
          }
        }
      };
      async.forEachOfSeries = async.eachOfSeries = function(obj, iterator, callback) {
        callback = _once(callback || noop);
        obj = obj || [];
        var nextKey = _keyIterator(obj);
        var key = nextKey();
        function iterate() {
          var sync = true;
          if (key === null) {
            return callback(null);
          }
          iterator(obj[key], key, only_once(function(err) {
            if (err) {
              callback(err);
            } else {
              key = nextKey();
              if (key === null) {
                return callback(null);
              } else {
                if (sync) {
                  async.nextTick(iterate);
                } else {
                  iterate();
                }
              }
            }
          }));
          sync = false;
        }
        iterate();
      };
      async.forEachOfLimit = async.eachOfLimit = function(obj, limit, iterator, callback) {
        _eachOfLimit(limit)(obj, iterator, callback);
      };
      function _eachOfLimit(limit) {
        return function(obj, iterator, callback) {
          callback = _once(callback || noop);
          obj = obj || [];
          var nextKey = _keyIterator(obj);
          if (limit <= 0) {
            return callback(null);
          }
          var done = false;
          var running = 0;
          var errored = false;
          (function replenish() {
            if (done && running <= 0) {
              return callback(null);
            }
            while (running < limit && !errored) {
              var key = nextKey();
              if (key === null) {
                done = true;
                if (running <= 0) {
                  callback(null);
                }
                return ;
              }
              running += 1;
              iterator(obj[key], key, only_once(function(err) {
                running -= 1;
                if (err) {
                  callback(err);
                  errored = true;
                } else {
                  replenish();
                }
              }));
            }
          })();
        };
      }
      function doParallel(fn) {
        return function(obj, iterator, callback) {
          return fn(async.eachOf, obj, iterator, callback);
        };
      }
      function doParallelLimit(fn) {
        return function(obj, limit, iterator, callback) {
          return fn(_eachOfLimit(limit), obj, iterator, callback);
        };
      }
      function doSeries(fn) {
        return function(obj, iterator, callback) {
          return fn(async.eachOfSeries, obj, iterator, callback);
        };
      }
      function _asyncMap(eachfn, arr, iterator, callback) {
        callback = _once(callback || noop);
        var results = [];
        eachfn(arr, function(value, index, callback) {
          iterator(value, function(err, v) {
            results[index] = v;
            callback(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      async.map = doParallel(_asyncMap);
      async.mapSeries = doSeries(_asyncMap);
      async.mapLimit = doParallelLimit(_asyncMap);
      async.inject = async.foldl = async.reduce = function(arr, memo, iterator, callback) {
        async.eachOfSeries(arr, function(x, i, callback) {
          iterator(memo, x, function(err, v) {
            memo = v;
            callback(err);
          });
        }, function(err) {
          callback(err || null, memo);
        });
      };
      async.foldr = async.reduceRight = function(arr, memo, iterator, callback) {
        var reversed = _map(arr, identity).reverse();
        async.reduce(reversed, memo, iterator, callback);
      };
      function _filter(eachfn, arr, iterator, callback) {
        var results = [];
        eachfn(arr, function(x, index, callback) {
          iterator(x, function(v) {
            if (v) {
              results.push({
                index: index,
                value: x
              });
            }
            callback();
          });
        }, function() {
          callback(_map(results.sort(function(a, b) {
            return a.index - b.index;
          }), function(x) {
            return x.value;
          }));
        });
      }
      async.select = async.filter = doParallel(_filter);
      async.selectLimit = async.filterLimit = doParallelLimit(_filter);
      async.selectSeries = async.filterSeries = doSeries(_filter);
      function _reject(eachfn, arr, iterator, callback) {
        _filter(eachfn, arr, function(value, cb) {
          iterator(value, function(v) {
            cb(!v);
          });
        }, callback);
      }
      async.reject = doParallel(_reject);
      async.rejectLimit = doParallelLimit(_reject);
      async.rejectSeries = doSeries(_reject);
      function _createTester(eachfn, check, getResult) {
        return function(arr, limit, iterator, cb) {
          function done() {
            if (cb)
              cb(getResult(false, void 0));
          }
          function iteratee(x, _, callback) {
            if (!cb)
              return callback();
            iterator(x, function(v) {
              if (cb && check(v)) {
                cb(getResult(true, x));
                cb = iterator = false;
              }
              callback();
            });
          }
          if (arguments.length > 3) {
            eachfn(arr, limit, iteratee, done);
          } else {
            cb = iterator;
            iterator = limit;
            eachfn(arr, iteratee, done);
          }
        };
      }
      async.any = async.some = _createTester(async.eachOf, toBool, identity);
      async.someLimit = _createTester(async.eachOfLimit, toBool, identity);
      async.all = async.every = _createTester(async.eachOf, notId, notId);
      async.everyLimit = _createTester(async.eachOfLimit, notId, notId);
      function _findGetResult(v, x) {
        return x;
      }
      async.detect = _createTester(async.eachOf, identity, _findGetResult);
      async.detectSeries = _createTester(async.eachOfSeries, identity, _findGetResult);
      async.sortBy = function(arr, iterator, callback) {
        async.map(arr, function(x, callback) {
          iterator(x, function(err, criteria) {
            if (err) {
              callback(err);
            } else {
              callback(null, {
                value: x,
                criteria: criteria
              });
            }
          });
        }, function(err, results) {
          if (err) {
            return callback(err);
          } else {
            callback(null, _map(results.sort(comparator), function(x) {
              return x.value;
            }));
          }
        });
        function comparator(left, right) {
          var a = left.criteria,
              b = right.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
        }
      };
      async.auto = function(tasks, callback) {
        callback = _once(callback || noop);
        var keys = _keys(tasks);
        var remainingTasks = keys.length;
        if (!remainingTasks) {
          return callback(null);
        }
        var results = {};
        var listeners = [];
        function addListener(fn) {
          listeners.unshift(fn);
        }
        function removeListener(fn) {
          var idx = _indexOf(listeners, fn);
          if (idx >= 0)
            listeners.splice(idx, 1);
        }
        function taskComplete() {
          remainingTasks--;
          _arrayEach(listeners.slice(0), function(fn) {
            fn();
          });
        }
        addListener(function() {
          if (!remainingTasks) {
            callback(null, results);
          }
        });
        _arrayEach(keys, function(k) {
          var task = _isArray(tasks[k]) ? tasks[k] : [tasks[k]];
          var taskCallback = _restParam(function(err, args) {
            if (args.length <= 1) {
              args = args[0];
            }
            if (err) {
              var safeResults = {};
              _forEachOf(results, function(val, rkey) {
                safeResults[rkey] = val;
              });
              safeResults[k] = args;
              callback(err, safeResults);
            } else {
              results[k] = args;
              async.setImmediate(taskComplete);
            }
          });
          var requires = task.slice(0, task.length - 1);
          var len = requires.length;
          var dep;
          while (len--) {
            if (!(dep = tasks[requires[len]])) {
              throw new Error('Has inexistant dependency');
            }
            if (_isArray(dep) && _indexOf(dep, k) >= 0) {
              throw new Error('Has cyclic dependencies');
            }
          }
          function ready() {
            return _reduce(requires, function(a, x) {
              return (a && results.hasOwnProperty(x));
            }, true) && !results.hasOwnProperty(k);
          }
          if (ready()) {
            task[task.length - 1](taskCallback, results);
          } else {
            addListener(listener);
          }
          function listener() {
            if (ready()) {
              removeListener(listener);
              task[task.length - 1](taskCallback, results);
            }
          }
        });
      };
      async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;
        var attempts = [];
        var opts = {
          times: DEFAULT_TIMES,
          interval: DEFAULT_INTERVAL
        };
        function parseTimes(acc, t) {
          if (typeof t === 'number') {
            acc.times = parseInt(t, 10) || DEFAULT_TIMES;
          } else if (typeof t === 'object') {
            acc.times = parseInt(t.times, 10) || DEFAULT_TIMES;
            acc.interval = parseInt(t.interval, 10) || DEFAULT_INTERVAL;
          } else {
            throw new Error('Unsupported argument type for \'times\': ' + typeof(t));
          }
        }
        var length = arguments.length;
        if (length < 1 || length > 3) {
          throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');
        } else if (length <= 2 && typeof times === 'function') {
          callback = task;
          task = times;
        }
        if (typeof times !== 'function') {
          parseTimes(opts, times);
        }
        opts.callback = callback;
        opts.task = task;
        function wrappedTask(wrappedCallback, wrappedResults) {
          function retryAttempt(task, finalAttempt) {
            return function(seriesCallback) {
              task(function(err, result) {
                seriesCallback(!err || finalAttempt, {
                  err: err,
                  result: result
                });
              }, wrappedResults);
            };
          }
          function retryInterval(interval) {
            return function(seriesCallback) {
              setTimeout(function() {
                seriesCallback(null);
              }, interval);
            };
          }
          while (opts.times) {
            var finalAttempt = !(opts.times -= 1);
            attempts.push(retryAttempt(opts.task, finalAttempt));
            if (!finalAttempt && opts.interval > 0) {
              attempts.push(retryInterval(opts.interval));
            }
          }
          async.series(attempts, function(done, data) {
            data = data[data.length - 1];
            (wrappedCallback || opts.callback)(data.err, data.result);
          });
        }
        return opts.callback ? wrappedTask() : wrappedTask;
      };
      async.waterfall = function(tasks, callback) {
        callback = _once(callback || noop);
        if (!_isArray(tasks)) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
          return callback();
        }
        function wrapIterator(iterator) {
          return _restParam(function(err, args) {
            if (err) {
              callback.apply(null, [err].concat(args));
            } else {
              var next = iterator.next();
              if (next) {
                args.push(wrapIterator(next));
              } else {
                args.push(callback);
              }
              ensureAsync(iterator).apply(null, args);
            }
          });
        }
        wrapIterator(async.iterator(tasks))();
      };
      function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = _isArrayLike(tasks) ? [] : {};
        eachfn(tasks, function(task, key, callback) {
          task(_restParam(function(err, args) {
            if (args.length <= 1) {
              args = args[0];
            }
            results[key] = args;
            callback(err);
          }));
        }, function(err) {
          callback(err, results);
        });
      }
      async.parallel = function(tasks, callback) {
        _parallel(async.eachOf, tasks, callback);
      };
      async.parallelLimit = function(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
      };
      async.series = function(tasks, callback) {
        _parallel(async.eachOfSeries, tasks, callback);
      };
      async.iterator = function(tasks) {
        function makeCallback(index) {
          function fn() {
            if (tasks.length) {
              tasks[index].apply(null, arguments);
            }
            return fn.next();
          }
          fn.next = function() {
            return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
          };
          return fn;
        }
        return makeCallback(0);
      };
      async.apply = _restParam(function(fn, args) {
        return _restParam(function(callArgs) {
          return fn.apply(null, args.concat(callArgs));
        });
      });
      function _concat(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function(x, index, cb) {
          fn(x, function(err, y) {
            result = result.concat(y || []);
            cb(err);
          });
        }, function(err) {
          callback(err, result);
        });
      }
      async.concat = doParallel(_concat);
      async.concatSeries = doSeries(_concat);
      async.whilst = function(test, iterator, callback) {
        callback = callback || noop;
        if (test()) {
          var next = _restParam(function(err, args) {
            if (err) {
              callback(err);
            } else if (test.apply(this, args)) {
              iterator(next);
            } else {
              callback(null);
            }
          });
          iterator(next);
        } else {
          callback(null);
        }
      };
      async.doWhilst = function(iterator, test, callback) {
        var calls = 0;
        return async.whilst(function() {
          return ++calls <= 1 || test.apply(this, arguments);
        }, iterator, callback);
      };
      async.until = function(test, iterator, callback) {
        return async.whilst(function() {
          return !test.apply(this, arguments);
        }, iterator, callback);
      };
      async.doUntil = function(iterator, test, callback) {
        return async.doWhilst(iterator, function() {
          return !test.apply(this, arguments);
        }, callback);
      };
      async.during = function(test, iterator, callback) {
        callback = callback || noop;
        var next = _restParam(function(err, args) {
          if (err) {
            callback(err);
          } else {
            args.push(check);
            test.apply(this, args);
          }
        });
        var check = function(err, truth) {
          if (err) {
            callback(err);
          } else if (truth) {
            iterator(next);
          } else {
            callback(null);
          }
        };
        test(check);
      };
      async.doDuring = function(iterator, test, callback) {
        var calls = 0;
        async.during(function(next) {
          if (calls++ < 1) {
            next(null, true);
          } else {
            test.apply(this, arguments);
          }
        }, iterator, callback);
      };
      function _queue(worker, concurrency, payload) {
        if (concurrency == null) {
          concurrency = 1;
        } else if (concurrency === 0) {
          throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!_isArray(data)) {
            data = [data];
          }
          if (data.length === 0 && q.idle()) {
            return async.setImmediate(function() {
              q.drain();
            });
          }
          _arrayEach(data, function(task) {
            var item = {
              data: task,
              callback: callback || noop
            };
            if (pos) {
              q.tasks.unshift(item);
            } else {
              q.tasks.push(item);
            }
            if (q.tasks.length === q.concurrency) {
              q.saturated();
            }
          });
          async.setImmediate(q.process);
        }
        function _next(q, tasks) {
          return function() {
            workers -= 1;
            var args = arguments;
            _arrayEach(tasks, function(task) {
              task.callback.apply(task, args);
            });
            if (q.tasks.length + workers === 0) {
              q.drain();
            }
            q.process();
          };
        }
        var workers = 0;
        var q = {
          tasks: [],
          concurrency: concurrency,
          payload: payload,
          saturated: noop,
          empty: noop,
          drain: noop,
          started: false,
          paused: false,
          push: function(data, callback) {
            _insert(q, data, false, callback);
          },
          kill: function() {
            q.drain = noop;
            q.tasks = [];
          },
          unshift: function(data, callback) {
            _insert(q, data, true, callback);
          },
          process: function() {
            if (!q.paused && workers < q.concurrency && q.tasks.length) {
              while (workers < q.concurrency && q.tasks.length) {
                var tasks = q.payload ? q.tasks.splice(0, q.payload) : q.tasks.splice(0, q.tasks.length);
                var data = _map(tasks, function(task) {
                  return task.data;
                });
                if (q.tasks.length === 0) {
                  q.empty();
                }
                workers += 1;
                var cb = only_once(_next(q, tasks));
                worker(data, cb);
              }
            }
          },
          length: function() {
            return q.tasks.length;
          },
          running: function() {
            return workers;
          },
          idle: function() {
            return q.tasks.length + workers === 0;
          },
          pause: function() {
            q.paused = true;
          },
          resume: function() {
            if (q.paused === false) {
              return ;
            }
            q.paused = false;
            var resumeCount = Math.min(q.concurrency, q.tasks.length);
            for (var w = 1; w <= resumeCount; w++) {
              async.setImmediate(q.process);
            }
          }
        };
        return q;
      }
      async.queue = function(worker, concurrency) {
        var q = _queue(function(items, cb) {
          worker(items[0], cb);
        }, concurrency, 1);
        return q;
      };
      async.priorityQueue = function(worker, concurrency) {
        function _compareTasks(a, b) {
          return a.priority - b.priority;
        }
        function _binarySearch(sequence, item, compare) {
          var beg = -1,
              end = sequence.length - 1;
          while (beg < end) {
            var mid = beg + ((end - beg + 1) >>> 1);
            if (compare(item, sequence[mid]) >= 0) {
              beg = mid;
            } else {
              end = mid - 1;
            }
          }
          return beg;
        }
        function _insert(q, data, priority, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!_isArray(data)) {
            data = [data];
          }
          if (data.length === 0) {
            return async.setImmediate(function() {
              q.drain();
            });
          }
          _arrayEach(data, function(task) {
            var item = {
              data: task,
              priority: priority,
              callback: typeof callback === 'function' ? callback : noop
            };
            q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);
            if (q.tasks.length === q.concurrency) {
              q.saturated();
            }
            async.setImmediate(q.process);
          });
        }
        var q = async.queue(worker, concurrency);
        q.push = function(data, priority, callback) {
          _insert(q, data, priority, callback);
        };
        delete q.unshift;
        return q;
      };
      async.cargo = function(worker, payload) {
        return _queue(worker, 1, payload);
      };
      function _console_fn(name) {
        return _restParam(function(fn, args) {
          fn.apply(null, args.concat([_restParam(function(err, args) {
            if (typeof console !== 'undefined') {
              if (err) {
                if (console.error) {
                  console.error(err);
                }
              } else if (console[name]) {
                _arrayEach(args, function(x) {
                  console[name](x);
                });
              }
            }
          })]));
        });
      }
      async.log = _console_fn('log');
      async.dir = _console_fn('dir');
      async.memoize = function(fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || identity;
        var memoized = _restParam(function memoized(args) {
          var callback = args.pop();
          var key = hasher.apply(null, args);
          if (key in memo) {
            async.nextTick(function() {
              callback.apply(null, memo[key]);
            });
          } else if (key in queues) {
            queues[key].push(callback);
          } else {
            queues[key] = [callback];
            fn.apply(null, args.concat([_restParam(function(args) {
              memo[key] = args;
              var q = queues[key];
              delete queues[key];
              for (var i = 0,
                  l = q.length; i < l; i++) {
                q[i].apply(null, args);
              }
            })]));
          }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
      };
      async.unmemoize = function(fn) {
        return function() {
          return (fn.unmemoized || fn).apply(null, arguments);
        };
      };
      function _times(mapper) {
        return function(count, iterator, callback) {
          mapper(_range(count), iterator, callback);
        };
      }
      async.times = _times(async.map);
      async.timesSeries = _times(async.mapSeries);
      async.timesLimit = function(count, limit, iterator, callback) {
        return async.mapLimit(_range(count), limit, iterator, callback);
      };
      async.seq = function() {
        var fns = arguments;
        return _restParam(function(args) {
          var that = this;
          var callback = args[args.length - 1];
          if (typeof callback == 'function') {
            args.pop();
          } else {
            callback = noop;
          }
          async.reduce(fns, args, function(newargs, fn, cb) {
            fn.apply(that, newargs.concat([_restParam(function(err, nextargs) {
              cb(err, nextargs);
            })]));
          }, function(err, results) {
            callback.apply(that, [err].concat(results));
          });
        });
      };
      async.compose = function() {
        return async.seq.apply(null, Array.prototype.reverse.call(arguments));
      };
      function _applyEach(eachfn) {
        return _restParam(function(fns, args) {
          var go = _restParam(function(args) {
            var that = this;
            var callback = args.pop();
            return eachfn(fns, function(fn, _, cb) {
              fn.apply(that, args.concat([cb]));
            }, callback);
          });
          if (args.length) {
            return go.apply(this, args);
          } else {
            return go;
          }
        });
      }
      async.applyEach = _applyEach(async.eachOf);
      async.applyEachSeries = _applyEach(async.eachOfSeries);
      async.forever = function(fn, callback) {
        var done = only_once(callback || noop);
        var task = ensureAsync(fn);
        function next(err) {
          if (err) {
            return done(err);
          }
          task(next);
        }
        next();
      };
      function ensureAsync(fn) {
        return _restParam(function(args) {
          var callback = args.pop();
          args.push(function() {
            var innerArgs = arguments;
            if (sync) {
              async.setImmediate(function() {
                callback.apply(null, innerArgs);
              });
            } else {
              callback.apply(null, innerArgs);
            }
          });
          var sync = true;
          fn.apply(this, args);
          sync = false;
        });
      }
      async.ensureAsync = ensureAsync;
      async.constant = _restParam(function(values) {
        var args = [null].concat(values);
        return function(callback) {
          return callback.apply(this, args);
        };
      });
      async.wrapSync = async.asyncify = function asyncify(func) {
        return _restParam(function(args) {
          var callback = args.pop();
          var result;
          try {
            result = func.apply(this, args);
          } catch (e) {
            return callback(e);
          }
          if (typeof result !== 'undefined' && typeof result.then === "function") {
            result.then(function(value) {
              callback(null, value);
            }).catch(function(err) {
              callback(err.message ? err : new Error(err));
            });
          } else {
            callback(null, result);
          }
        });
      };
      if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
      } else if (typeof define !== 'undefined' && define.amd) {
        define([], function() {
          return async;
        });
      } else {
        root.async = async;
      }
    }());
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:lodash@3.10.0/index", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    ;
    (function() {
      var undefined;
      var VERSION = '3.10.0';
      var BIND_FLAG = 1,
          BIND_KEY_FLAG = 2,
          CURRY_BOUND_FLAG = 4,
          CURRY_FLAG = 8,
          CURRY_RIGHT_FLAG = 16,
          PARTIAL_FLAG = 32,
          PARTIAL_RIGHT_FLAG = 64,
          ARY_FLAG = 128,
          REARG_FLAG = 256;
      var DEFAULT_TRUNC_LENGTH = 30,
          DEFAULT_TRUNC_OMISSION = '...';
      var HOT_COUNT = 150,
          HOT_SPAN = 16;
      var LARGE_ARRAY_SIZE = 200;
      var LAZY_FILTER_FLAG = 1,
          LAZY_MAP_FLAG = 2;
      var FUNC_ERROR_TEXT = 'Expected a function';
      var PLACEHOLDER = '__lodash_placeholder__';
      var argsTag = '[object Arguments]',
          arrayTag = '[object Array]',
          boolTag = '[object Boolean]',
          dateTag = '[object Date]',
          errorTag = '[object Error]',
          funcTag = '[object Function]',
          mapTag = '[object Map]',
          numberTag = '[object Number]',
          objectTag = '[object Object]',
          regexpTag = '[object RegExp]',
          setTag = '[object Set]',
          stringTag = '[object String]',
          weakMapTag = '[object WeakMap]';
      var arrayBufferTag = '[object ArrayBuffer]',
          float32Tag = '[object Float32Array]',
          float64Tag = '[object Float64Array]',
          int8Tag = '[object Int8Array]',
          int16Tag = '[object Int16Array]',
          int32Tag = '[object Int32Array]',
          uint8Tag = '[object Uint8Array]',
          uint8ClampedTag = '[object Uint8ClampedArray]',
          uint16Tag = '[object Uint16Array]',
          uint32Tag = '[object Uint32Array]';
      var reEmptyStringLeading = /\b__p \+= '';/g,
          reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
          reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
          reUnescapedHtml = /[&<>"'`]/g,
          reHasEscapedHtml = RegExp(reEscapedHtml.source),
          reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g,
          reEvaluate = /<%([\s\S]+?)%>/g,
          reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
          reIsPlainProp = /^\w*$/,
          rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
      var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
          reHasRegExpChars = RegExp(reRegExpChars.source);
      var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reHasHexPrefix = /^0[xX]/;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^\d+$/;
      var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var reWords = (function() {
        var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
            lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
        return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
      }());
      var contextProps = ['Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number', 'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        '\xc0': 'A',
        '\xc1': 'A',
        '\xc2': 'A',
        '\xc3': 'A',
        '\xc4': 'A',
        '\xc5': 'A',
        '\xe0': 'a',
        '\xe1': 'a',
        '\xe2': 'a',
        '\xe3': 'a',
        '\xe4': 'a',
        '\xe5': 'a',
        '\xc7': 'C',
        '\xe7': 'c',
        '\xd0': 'D',
        '\xf0': 'd',
        '\xc8': 'E',
        '\xc9': 'E',
        '\xca': 'E',
        '\xcb': 'E',
        '\xe8': 'e',
        '\xe9': 'e',
        '\xea': 'e',
        '\xeb': 'e',
        '\xcC': 'I',
        '\xcd': 'I',
        '\xce': 'I',
        '\xcf': 'I',
        '\xeC': 'i',
        '\xed': 'i',
        '\xee': 'i',
        '\xef': 'i',
        '\xd1': 'N',
        '\xf1': 'n',
        '\xd2': 'O',
        '\xd3': 'O',
        '\xd4': 'O',
        '\xd5': 'O',
        '\xd6': 'O',
        '\xd8': 'O',
        '\xf2': 'o',
        '\xf3': 'o',
        '\xf4': 'o',
        '\xf5': 'o',
        '\xf6': 'o',
        '\xf8': 'o',
        '\xd9': 'U',
        '\xda': 'U',
        '\xdb': 'U',
        '\xdc': 'U',
        '\xf9': 'u',
        '\xfa': 'u',
        '\xfb': 'u',
        '\xfc': 'u',
        '\xdd': 'Y',
        '\xfd': 'y',
        '\xff': 'y',
        '\xc6': 'Ae',
        '\xe6': 'ae',
        '\xde': 'Th',
        '\xfe': 'th',
        '\xdf': 'ss'
      };
      var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
      };
      var htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#96;': '`'
      };
      var objectTypes = {
        'function': true,
        'object': true
      };
      var regexpEscapes = {
        '0': 'x30',
        '1': 'x31',
        '2': 'x32',
        '3': 'x33',
        '4': 'x34',
        '5': 'x35',
        '6': 'x36',
        '7': 'x37',
        '8': 'x38',
        '9': 'x39',
        'A': 'x41',
        'B': 'x42',
        'C': 'x43',
        'D': 'x44',
        'E': 'x45',
        'F': 'x46',
        'a': 'x61',
        'b': 'x62',
        'c': 'x63',
        'd': 'x64',
        'e': 'x65',
        'f': 'x66',
        'n': 'x6e',
        'r': 'x72',
        't': 'x74',
        'u': 'x75',
        'v': 'x76',
        'x': 'x78'
      };
      var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
      var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
      var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
      var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
      var freeSelf = objectTypes[typeof self] && self && self.Object && self;
      var freeWindow = objectTypes[typeof window] && window && window.Object && window;
      var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
      var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;
      function baseCompareAscending(value, other) {
        if (value !== other) {
          var valIsNull = value === null,
              valIsUndef = value === undefined,
              valIsReflexive = value === value;
          var othIsNull = other === null,
              othIsUndef = other === undefined,
              othIsReflexive = other === other;
          if ((value > other && !othIsNull) || !valIsReflexive || (valIsNull && !othIsUndef && othIsReflexive) || (valIsUndef && othIsReflexive)) {
            return 1;
          }
          if ((value < other && !valIsNull) || !othIsReflexive || (othIsNull && !valIsUndef && valIsReflexive) || (othIsUndef && valIsReflexive)) {
            return -1;
          }
        }
        return 0;
      }
      function baseFindIndex(array, predicate, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length)) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        if (value !== value) {
          return indexOfNaN(array, fromIndex);
        }
        var index = fromIndex - 1,
            length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function baseIsFunction(value) {
        return typeof value == 'function' || false;
      }
      function baseToString(value) {
        return value == null ? '' : (value + '');
      }
      function charsLeftIndex(string, chars) {
        var index = -1,
            length = string.length;
        while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
      }
      function charsRightIndex(string, chars) {
        var index = string.length;
        while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
      }
      function compareAscending(object, other) {
        return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
      }
      function compareMultiple(object, other, orders) {
        var index = -1,
            objCriteria = object.criteria,
            othCriteria = other.criteria,
            length = objCriteria.length,
            ordersLength = orders.length;
        while (++index < length) {
          var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
          if (result) {
            if (index >= ordersLength) {
              return result;
            }
            var order = orders[index];
            return result * ((order === 'asc' || order === true) ? 1 : -1);
          }
        }
        return object.index - other.index;
      }
      function deburrLetter(letter) {
        return deburredLetters[letter];
      }
      function escapeHtmlChar(chr) {
        return htmlEscapes[chr];
      }
      function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
        if (leadingChar) {
          chr = regexpEscapes[chr];
        } else if (whitespaceChar) {
          chr = stringEscapes[chr];
        }
        return '\\' + chr;
      }
      function escapeStringChar(chr) {
        return '\\' + stringEscapes[chr];
      }
      function indexOfNaN(array, fromIndex, fromRight) {
        var length = array.length,
            index = fromIndex + (fromRight ? 0 : -1);
        while ((fromRight ? index-- : ++index < length)) {
          var other = array[index];
          if (other !== other) {
            return index;
          }
        }
        return -1;
      }
      function isObjectLike(value) {
        return !!value && typeof value == 'object';
      }
      function isSpace(charCode) {
        return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 || (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
      }
      function replaceHolders(array, placeholder) {
        var index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
        while (++index < length) {
          if (array[index] === placeholder) {
            array[index] = PLACEHOLDER;
            result[++resIndex] = index;
          }
        }
        return result;
      }
      function sortedUniq(array, iteratee) {
        var seen,
            index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
        while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value, index, array) : value;
          if (!index || seen !== computed) {
            seen = computed;
            result[++resIndex] = value;
          }
        }
        return result;
      }
      function trimmedLeftIndex(string) {
        var index = -1,
            length = string.length;
        while (++index < length && isSpace(string.charCodeAt(index))) {}
        return index;
      }
      function trimmedRightIndex(string) {
        var index = string.length;
        while (index-- && isSpace(string.charCodeAt(index))) {}
        return index;
      }
      function unescapeHtmlChar(chr) {
        return htmlUnescapes[chr];
      }
      function runInContext(context) {
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
        var Array = context.Array,
            Date = context.Date,
            Error = context.Error,
            Function = context.Function,
            Math = context.Math,
            Number = context.Number,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;
        var arrayProto = Array.prototype,
            objectProto = Object.prototype,
            stringProto = String.prototype;
        var fnToString = Function.prototype.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var objToString = objectProto.toString;
        var oldDash = root._;
        var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        var ArrayBuffer = context.ArrayBuffer,
            clearTimeout = context.clearTimeout,
            parseFloat = context.parseFloat,
            pow = Math.pow,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            Set = getNative(context, 'Set'),
            setTimeout = context.setTimeout,
            splice = arrayProto.splice,
            Uint8Array = context.Uint8Array,
            WeakMap = getNative(context, 'WeakMap');
        var nativeCeil = Math.ceil,
            nativeCreate = getNative(Object, 'create'),
            nativeFloor = Math.floor,
            nativeIsArray = getNative(Array, 'isArray'),
            nativeIsFinite = context.isFinite,
            nativeKeys = getNative(Object, 'keys'),
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeNow = getNative(Date, 'now'),
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random;
        var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
            POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
        var MAX_ARRAY_LENGTH = 4294967295,
            MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
            HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var metaMap = WeakMap && new WeakMap;
        var realNames = {};
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        function baseLodash() {}
        function LodashWrapper(value, chainAll, actions) {
          this.__wrapped__ = value;
          this.__actions__ = actions || [];
          this.__chain__ = !!chainAll;
        }
        var support = lodash.support = {};
        lodash.templateSettings = {
          'escape': reEscape,
          'evaluate': reEvaluate,
          'interpolate': reInterpolate,
          'variable': '',
          'imports': {'_': lodash}
        };
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = POSITIVE_INFINITY;
          this.__views__ = [];
        }
        function lazyClone() {
          var result = new LazyWrapper(this.__wrapped__);
          result.__actions__ = arrayCopy(this.__actions__);
          result.__dir__ = this.__dir__;
          result.__filtered__ = this.__filtered__;
          result.__iteratees__ = arrayCopy(this.__iteratees__);
          result.__takeCount__ = this.__takeCount__;
          result.__views__ = arrayCopy(this.__views__);
          return result;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result = new LazyWrapper(this);
            result.__dir__ = -1;
            result.__filtered__ = true;
          } else {
            result = this.clone();
            result.__dir__ *= -1;
          }
          return result;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(),
              dir = this.__dir__,
              isArr = isArray(array),
              isRight = dir < 0,
              arrLength = isArr ? array.length : 0,
              view = getView(0, arrLength, this.__views__),
              start = view.start,
              end = view.end,
              length = end - start,
              index = isRight ? end : (start - 1),
              iteratees = this.__iteratees__,
              iterLength = iteratees.length,
              resIndex = 0,
              takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
            return baseWrapperValue((isRight && isArr) ? array.reverse() : array, this.__actions__);
          }
          var result = [];
          outer: while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1,
                value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex],
                  iteratee = data.iteratee,
                  type = data.type,
                  computed = iteratee(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result[resIndex++] = value;
          }
          return result;
        }
        function MapCache() {
          this.__data__ = {};
        }
        function mapDelete(key) {
          return this.has(key) && delete this.__data__[key];
        }
        function mapGet(key) {
          return key == '__proto__' ? undefined : this.__data__[key];
        }
        function mapHas(key) {
          return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
        }
        function mapSet(key, value) {
          if (key != '__proto__') {
            this.__data__[key] = value;
          }
          return this;
        }
        function SetCache(values) {
          var length = values ? values.length : 0;
          this.data = {
            'hash': nativeCreate(null),
            'set': new Set
          };
          while (length--) {
            this.push(values[length]);
          }
        }
        function cacheIndexOf(cache, value) {
          var data = cache.data,
              result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
          return result ? 0 : -1;
        }
        function cachePush(value) {
          var data = this.data;
          if (typeof value == 'string' || isObject(value)) {
            data.set.add(value);
          } else {
            data.hash[value] = true;
          }
        }
        function arrayConcat(array, other) {
          var index = -1,
              length = array.length,
              othIndex = -1,
              othLength = other.length,
              result = Array(length + othLength);
          while (++index < length) {
            result[index] = array[index];
          }
          while (++othIndex < othLength) {
            result[index++] = other[othIndex];
          }
          return result;
        }
        function arrayCopy(source, array) {
          var index = -1,
              length = source.length;
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function arrayEach(array, iteratee) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayExtremum(array, iteratee, comparator, exValue) {
          var index = -1,
              length = array.length,
              computed = exValue,
              result = computed;
          while (++index < length) {
            var value = array[index],
                current = +iteratee(value);
            if (comparator(current, computed)) {
              computed = current;
              result = value;
            }
          }
          return result;
        }
        function arrayFilter(array, predicate) {
          var index = -1,
              length = array.length,
              resIndex = -1,
              result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
        function arrayMap(array, iteratee) {
          var index = -1,
              length = array.length,
              result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1,
              length = values.length,
              offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initFromArray) {
          var index = -1,
              length = array.length;
          if (initFromArray && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
          var length = array.length;
          if (initFromArray && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        function arraySum(array, iteratee) {
          var length = array.length,
              result = 0;
          while (length--) {
            result += +iteratee(array[length]) || 0;
          }
          return result;
        }
        function assignDefaults(objectValue, sourceValue) {
          return objectValue === undefined ? sourceValue : objectValue;
        }
        function assignOwnDefaults(objectValue, sourceValue, key, object) {
          return (objectValue === undefined || !hasOwnProperty.call(object, key)) ? sourceValue : objectValue;
        }
        function assignWith(object, source, customizer) {
          var index = -1,
              props = keys(source),
              length = props.length;
          while (++index < length) {
            var key = props[index],
                value = object[key],
                result = customizer(value, source[key], key, object, source);
            if ((result === result ? (result !== value) : (value === value)) || (value === undefined && !(key in object))) {
              object[key] = result;
            }
          }
          return object;
        }
        function baseAssign(object, source) {
          return source == null ? object : baseCopy(source, keys(source), object);
        }
        function baseAt(collection, props) {
          var index = -1,
              isNil = collection == null,
              isArr = !isNil && isArrayLike(collection),
              length = isArr ? collection.length : 0,
              propsLength = props.length,
              result = Array(propsLength);
          while (++index < propsLength) {
            var key = props[index];
            if (isArr) {
              result[index] = isIndex(key, length) ? collection[key] : undefined;
            } else {
              result[index] = isNil ? undefined : collection[key];
            }
          }
          return result;
        }
        function baseCopy(source, props, object) {
          object || (object = {});
          var index = -1,
              length = props.length;
          while (++index < length) {
            var key = props[index];
            object[key] = source[key];
          }
          return object;
        }
        function baseCallback(func, thisArg, argCount) {
          var type = typeof func;
          if (type == 'function') {
            return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
          }
          if (func == null) {
            return identity;
          }
          if (type == 'object') {
            return baseMatches(func);
          }
          return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
        }
        function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
          var result;
          if (customizer) {
            result = object ? customizer(value, key, object) : customizer(value);
          }
          if (result !== undefined) {
            return result;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
              return arrayCopy(value, result);
            }
          } else {
            var tag = objToString.call(value),
                isFunc = tag == funcTag;
            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
              result = initCloneObject(isFunc ? {} : value);
              if (!isDeep) {
                return baseAssign(result, value);
              }
            } else {
              return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : (object ? value : {});
            }
          }
          stackA || (stackA = []);
          stackB || (stackB = []);
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == value) {
              return stackB[length];
            }
          }
          stackA.push(value);
          stackB.push(result);
          (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
            result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
          });
          return result;
        }
        var baseCreate = (function() {
          function object() {}
          return function(prototype) {
            if (isObject(prototype)) {
              object.prototype = prototype;
              var result = new object;
              object.prototype = undefined;
            }
            return result || {};
          };
        }());
        function baseDelay(func, wait, args) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return setTimeout(function() {
            func.apply(undefined, args);
          }, wait);
        }
        function baseDifference(array, values) {
          var length = array ? array.length : 0,
              result = [];
          if (!length) {
            return result;
          }
          var index = -1,
              indexOf = getIndexOf(),
              isCommon = indexOf == baseIndexOf,
              cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
              valuesLength = values.length;
          if (cache) {
            indexOf = cacheIndexOf;
            isCommon = false;
            values = cache;
          }
          outer: while (++index < length) {
            var value = array[index];
            if (isCommon && value === value) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values[valuesIndex] === value) {
                  continue outer;
                }
              }
              result.push(value);
            } else if (indexOf(values, value, 0) < 0) {
              result.push(value);
            }
          }
          return result;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result = true;
          baseEach(collection, function(value, index, collection) {
            result = !!predicate(value, index, collection);
            return result;
          });
          return result;
        }
        function baseExtremum(collection, iteratee, comparator, exValue) {
          var computed = exValue,
              result = computed;
          baseEach(collection, function(value, index, collection) {
            var current = +iteratee(value, index, collection);
            if (comparator(current, computed) || (current === exValue && current === result)) {
              computed = current;
              result = value;
            }
          });
          return result;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : (end >>> 0);
          start >>>= 0;
          while (start < length) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result = [];
          baseEach(collection, function(value, index, collection) {
            if (predicate(value, index, collection)) {
              result.push(value);
            }
          });
          return result;
        }
        function baseFind(collection, predicate, eachFunc, retKey) {
          var result;
          eachFunc(collection, function(value, key, collection) {
            if (predicate(value, key, collection)) {
              result = retKey ? key : value;
              return false;
            }
          });
          return result;
        }
        function baseFlatten(array, isDeep, isStrict, result) {
          result || (result = []);
          var index = -1,
              length = array.length;
          while (++index < length) {
            var value = array[index];
            if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
              if (isDeep) {
                baseFlatten(value, isDeep, isStrict, result);
              } else {
                arrayPush(result, value);
              }
            } else if (!isStrict) {
              result[result.length] = value;
            }
          }
          return result;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForIn(object, iteratee) {
          return baseFor(object, iteratee, keysIn);
        }
        function baseForOwn(object, iteratee) {
          return baseFor(object, iteratee, keys);
        }
        function baseForOwnRight(object, iteratee) {
          return baseForRight(object, iteratee, keys);
        }
        function baseFunctions(object, props) {
          var index = -1,
              length = props.length,
              resIndex = -1,
              result = [];
          while (++index < length) {
            var key = props[index];
            if (isFunction(object[key])) {
              result[++resIndex] = key;
            }
          }
          return result;
        }
        function baseGet(object, path, pathKey) {
          if (object == null) {
            return ;
          }
          if (pathKey !== undefined && pathKey in toObject(object)) {
            path = [pathKey];
          }
          var index = 0,
              length = path.length;
          while (object != null && index < length) {
            object = object[path[index++]];
          }
          return (index && index == length) ? object : undefined;
        }
        function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
        }
        function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objIsArr = isArray(object),
              othIsArr = isArray(other),
              objTag = arrayTag,
              othTag = arrayTag;
          if (!objIsArr) {
            objTag = objToString.call(object);
            if (objTag == argsTag) {
              objTag = objectTag;
            } else if (objTag != objectTag) {
              objIsArr = isTypedArray(object);
            }
          }
          if (!othIsArr) {
            othTag = objToString.call(other);
            if (othTag == argsTag) {
              othTag = objectTag;
            } else if (othTag != objectTag) {
              othIsArr = isTypedArray(other);
            }
          }
          var objIsObj = objTag == objectTag,
              othIsObj = othTag == objectTag,
              isSameTag = objTag == othTag;
          if (isSameTag && !(objIsArr || objIsObj)) {
            return equalByTag(object, other, objTag);
          }
          if (!isLoose) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
            if (objIsWrapped || othIsWrapped) {
              return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stackA || (stackA = []);
          stackB || (stackB = []);
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == object) {
              return stackB[length] == other;
            }
          }
          stackA.push(object);
          stackB.push(other);
          var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
          stackA.pop();
          stackB.pop();
          return result;
        }
        function baseIsMatch(object, matchData, customizer) {
          var index = matchData.length,
              length = index,
              noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = toObject(object);
          while (index--) {
            var data = matchData[index];
            if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0],
                objValue = object[key],
                srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined && !(key in object)) {
                return false;
              }
            } else {
              var result = customizer ? customizer(objValue, srcValue, key) : undefined;
              if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseMap(collection, iteratee) {
          var index = -1,
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function(value, key, collection) {
            result[++index] = iteratee(value, key, collection);
          });
          return result;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            var key = matchData[0][0],
                value = matchData[0][1];
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === value && (value !== undefined || (key in toObject(object)));
            };
          }
          return function(object) {
            return baseIsMatch(object, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          var isArr = isArray(path),
              isCommon = isKey(path) && isStrictComparable(srcValue),
              pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            if (object == null) {
              return false;
            }
            var key = pathKey;
            object = toObject(object);
            if ((isArr || !isCommon) && !(key in object)) {
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              if (object == null) {
                return false;
              }
              key = last(path);
              object = toObject(object);
            }
            return object[key] === srcValue ? (srcValue !== undefined || (key in object)) : baseIsEqual(srcValue, object[key], undefined, true);
          };
        }
        function baseMerge(object, source, customizer, stackA, stackB) {
          if (!isObject(object)) {
            return object;
          }
          var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
              props = isSrcArr ? undefined : keys(source);
          arrayEach(props || source, function(srcValue, key) {
            if (props) {
              key = srcValue;
              srcValue = source[key];
            }
            if (isObjectLike(srcValue)) {
              stackA || (stackA = []);
              stackB || (stackB = []);
              baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
            } else {
              var value = object[key],
                  result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                  isCommon = result === undefined;
              if (isCommon) {
                result = srcValue;
              }
              if ((result !== undefined || (isSrcArr && !(key in object))) && (isCommon || (result === result ? (result !== value) : (value === value)))) {
                object[key] = result;
              }
            }
          });
          return object;
        }
        function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
          var length = stackA.length,
              srcValue = source[key];
          while (length--) {
            if (stackA[length] == srcValue) {
              object[key] = stackB[length];
              return ;
            }
          }
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;
          if (isCommon) {
            result = srcValue;
            if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
              result = isArray(value) ? value : (isArrayLike(value) ? arrayCopy(value) : []);
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              result = isArguments(value) ? toPlainObject(value) : (isPlainObject(value) ? value : {});
            } else {
              isCommon = false;
            }
          }
          stackA.push(srcValue);
          stackB.push(result);
          if (isCommon) {
            object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
          } else if (result === result ? (result !== value) : (value === value)) {
            object[key] = result;
          }
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : object[key];
          };
        }
        function basePropertyDeep(path) {
          var pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            return baseGet(object, path, pathKey);
          };
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0;
          while (length--) {
            var index = indexes[length];
            if (index != previous && isIndex(index)) {
              var previous = index;
              splice.call(array, index, 1);
            }
          }
          return array;
        }
        function baseRandom(min, max) {
          return min + nativeFloor(nativeRandom() * (max - min + 1));
        }
        function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
          eachFunc(collection, function(value, index, collection) {
            accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
          });
          return accumulator;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        function baseSlice(array, start, end) {
          var index = -1,
              length = array.length;
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : ((end - start) >>> 0);
          start >>>= 0;
          var result = Array(length);
          while (++index < length) {
            result[index] = array[index + start];
          }
          return result;
        }
        function baseSome(collection, predicate) {
          var result;
          baseEach(collection, function(value, index, collection) {
            result = predicate(value, index, collection);
            return !result;
          });
          return !!result;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSortByOrder(collection, iteratees, orders) {
          var callback = getCallback(),
              index = -1;
          iteratees = arrayMap(iteratees, function(iteratee) {
            return callback(iteratee);
          });
          var result = baseMap(collection, function(value) {
            var criteria = arrayMap(iteratees, function(iteratee) {
              return iteratee(value);
            });
            return {
              'criteria': criteria,
              'index': ++index,
              'value': value
            };
          });
          return baseSortBy(result, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function baseSum(collection, iteratee) {
          var result = 0;
          baseEach(collection, function(value, index, collection) {
            result += +iteratee(value, index, collection) || 0;
          });
          return result;
        }
        function baseUniq(array, iteratee) {
          var index = -1,
              indexOf = getIndexOf(),
              length = array.length,
              isCommon = indexOf == baseIndexOf,
              isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
              seen = isLarge ? createCache() : null,
              result = [];
          if (seen) {
            indexOf = cacheIndexOf;
            isCommon = false;
          } else {
            isLarge = false;
            seen = iteratee ? [] : result;
          }
          outer: while (++index < length) {
            var value = array[index],
                computed = iteratee ? iteratee(value, index, array) : value;
            if (isCommon && value === value) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (indexOf(seen, computed, 0) < 0) {
              if (iteratee || isLarge) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
          return result;
        }
        function baseValues(object, props) {
          var index = -1,
              length = props.length,
              result = Array(length);
          while (++index < length) {
            result[index] = object[props[index]];
          }
          return result;
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length,
              index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
          return isDrop ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length)) : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
        }
        function baseWrapperValue(value, actions) {
          var result = value;
          if (result instanceof LazyWrapper) {
            result = result.value();
          }
          var index = -1,
              length = actions.length;
          while (++index < length) {
            var action = actions[index];
            result = action.func.apply(action.thisArg, arrayPush([result], action.args));
          }
          return result;
        }
        function binaryIndex(array, value, retHighest) {
          var low = 0,
              high = array ? array.length : low;
          if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = (low + high) >>> 1,
                  computed = array[mid];
              if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return binaryIndexBy(array, value, identity, retHighest);
        }
        function binaryIndexBy(array, value, iteratee, retHighest) {
          value = iteratee(value);
          var low = 0,
              high = array ? array.length : 0,
              valIsNaN = value !== value,
              valIsNull = value === null,
              valIsUndef = value === undefined;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2),
                computed = iteratee(array[mid]),
                isDef = computed !== undefined,
                isReflexive = computed === computed;
            if (valIsNaN) {
              var setLow = isReflexive || retHighest;
            } else if (valIsNull) {
              setLow = isReflexive && isDef && (retHighest || computed != null);
            } else if (valIsUndef) {
              setLow = isReflexive && (retHighest || isDef);
            } else if (computed == null) {
              setLow = false;
            } else {
              setLow = retHighest ? (computed <= value) : (computed < value);
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function bindCallback(func, thisArg, argCount) {
          if (typeof func != 'function') {
            return identity;
          }
          if (thisArg === undefined) {
            return func;
          }
          switch (argCount) {
            case 1:
              return function(value) {
                return func.call(thisArg, value);
              };
            case 3:
              return function(value, index, collection) {
                return func.call(thisArg, value, index, collection);
              };
            case 4:
              return function(accumulator, value, index, collection) {
                return func.call(thisArg, accumulator, value, index, collection);
              };
            case 5:
              return function(value, other, key, object, source) {
                return func.call(thisArg, value, other, key, object, source);
              };
          }
          return function() {
            return func.apply(thisArg, arguments);
          };
        }
        function bufferClone(buffer) {
          var result = new ArrayBuffer(buffer.byteLength),
              view = new Uint8Array(result);
          view.set(new Uint8Array(buffer));
          return result;
        }
        function composeArgs(args, partials, holders) {
          var holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              leftIndex = -1,
              leftLength = partials.length,
              result = Array(leftLength + argsLength);
          while (++leftIndex < leftLength) {
            result[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
          while (argsLength--) {
            result[leftIndex++] = args[argsIndex++];
          }
          return result;
        }
        function composeArgsRight(args, partials, holders) {
          var holdersIndex = -1,
              holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              rightIndex = -1,
              rightLength = partials.length,
              result = Array(argsLength + rightLength);
          while (++argsIndex < argsLength) {
            result[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
          return result;
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee, thisArg) {
            var result = initializer ? initializer() : {};
            iteratee = getCallback(iteratee, thisArg, 3);
            if (isArray(collection)) {
              var index = -1,
                  length = collection.length;
              while (++index < length) {
                var value = collection[index];
                setter(result, value, iteratee(value, index, collection), collection);
              }
            } else {
              baseEach(collection, function(value, key, collection) {
                setter(result, value, iteratee(value, key, collection), collection);
              });
            }
            return result;
          };
        }
        function createAssigner(assigner) {
          return restParam(function(object, sources) {
            var index = -1,
                length = object == null ? 0 : sources.length,
                customizer = length > 2 ? sources[length - 2] : undefined,
                guard = length > 2 ? sources[2] : undefined,
                thisArg = length > 1 ? sources[length - 1] : undefined;
            if (typeof customizer == 'function') {
              customizer = bindCallback(customizer, thisArg, 5);
              length -= 2;
            } else {
              customizer = typeof thisArg == 'function' ? thisArg : undefined;
              length -= (customizer ? 1 : 0);
            }
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined : customizer;
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee) {
            var length = collection ? getLength(collection) : 0;
            if (!isLength(length)) {
              return eachFunc(collection, iteratee);
            }
            var index = fromRight ? length : -1,
                iterable = toObject(collection);
            while ((fromRight ? index-- : ++index < length)) {
              if (iteratee(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee, keysFunc) {
            var iterable = toObject(object),
                props = keysFunc(object),
                length = props.length,
                index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length)) {
              var key = props[index];
              if (iteratee(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBindWrapper(func, thisArg) {
          var Ctor = createCtorWrapper(func);
          function wrapper() {
            var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
            return fn.apply(thisArg, arguments);
          }
          return wrapper;
        }
        function createCache(values) {
          return (nativeCreate && Set) ? new SetCache(values) : null;
        }
        function createCompounder(callback) {
          return function(string) {
            var index = -1,
                array = words(deburr(string)),
                length = array.length,
                result = '';
            while (++index < length) {
              result = callback(result, array[index], index);
            }
            return result;
          };
        }
        function createCtorWrapper(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor;
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype),
                result = Ctor.apply(thisBinding, args);
            return isObject(result) ? result : thisBinding;
          };
        }
        function createCurry(flag) {
          function curryFunc(func, arity, guard) {
            if (guard && isIterateeCall(func, arity, guard)) {
              arity = undefined;
            }
            var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
            result.placeholder = curryFunc.placeholder;
            return result;
          }
          return curryFunc;
        }
        function createDefaults(assigner, customizer) {
          return restParam(function(args) {
            var object = args[0];
            if (object == null) {
              return object;
            }
            args.push(customizer);
            return assigner.apply(undefined, args);
          });
        }
        function createExtremum(comparator, exValue) {
          return function(collection, iteratee, thisArg) {
            if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
              iteratee = undefined;
            }
            iteratee = getCallback(iteratee, thisArg, 3);
            if (iteratee.length == 1) {
              collection = isArray(collection) ? collection : toIterable(collection);
              var result = arrayExtremum(collection, iteratee, comparator, exValue);
              if (!(collection.length && result === exValue)) {
                return result;
              }
            }
            return baseExtremum(collection, iteratee, comparator, exValue);
          };
        }
        function createFind(eachFunc, fromRight) {
          return function(collection, predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 3);
            if (isArray(collection)) {
              var index = baseFindIndex(collection, predicate, fromRight);
              return index > -1 ? collection[index] : undefined;
            }
            return baseFind(collection, predicate, eachFunc);
          };
        }
        function createFindIndex(fromRight) {
          return function(array, predicate, thisArg) {
            if (!(array && array.length)) {
              return -1;
            }
            predicate = getCallback(predicate, thisArg, 3);
            return baseFindIndex(array, predicate, fromRight);
          };
        }
        function createFindKey(objectFunc) {
          return function(object, predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 3);
            return baseFind(object, predicate, objectFunc, true);
          };
        }
        function createFlow(fromRight) {
          return function() {
            var wrapper,
                length = arguments.length,
                index = fromRight ? length : -1,
                leftIndex = 0,
                funcs = Array(length);
            while ((fromRight ? index-- : ++index < length)) {
              var func = funcs[leftIndex++] = arguments[index];
              if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
                wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? -1 : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func),
                  data = funcName == 'wrapper' ? getData(func) : undefined;
              if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments,
                  value = args[0];
              if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
                return wrapper.plant(value).value();
              }
              var index = 0,
                  result = length ? funcs[index].apply(this, args) : value;
              while (++index < length) {
                result = funcs[index].call(this, result);
              }
              return result;
            };
          };
        }
        function createForEach(arrayFunc, eachFunc) {
          return function(collection, iteratee, thisArg) {
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
          };
        }
        function createForIn(objectFunc) {
          return function(object, iteratee, thisArg) {
            if (typeof iteratee != 'function' || thisArg !== undefined) {
              iteratee = bindCallback(iteratee, thisArg, 3);
            }
            return objectFunc(object, iteratee, keysIn);
          };
        }
        function createForOwn(objectFunc) {
          return function(object, iteratee, thisArg) {
            if (typeof iteratee != 'function' || thisArg !== undefined) {
              iteratee = bindCallback(iteratee, thisArg, 3);
            }
            return objectFunc(object, iteratee);
          };
        }
        function createObjectMapper(isMapKeys) {
          return function(object, iteratee, thisArg) {
            var result = {};
            iteratee = getCallback(iteratee, thisArg, 3);
            baseForOwn(object, function(value, key, object) {
              var mapped = iteratee(value, key, object);
              key = isMapKeys ? mapped : key;
              value = isMapKeys ? value : mapped;
              result[key] = value;
            });
            return result;
          };
        }
        function createPadDir(fromRight) {
          return function(string, length, chars) {
            string = baseToString(string);
            return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
          };
        }
        function createPartial(flag) {
          var partialFunc = restParam(function(func, partials) {
            var holders = replaceHolders(partials, partialFunc.placeholder);
            return createWrapper(func, flag, undefined, partials, holders);
          });
          return partialFunc;
        }
        function createReduce(arrayFunc, eachFunc) {
          return function(collection, iteratee, accumulator, thisArg) {
            var initFromArray = arguments.length < 3;
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
          };
        }
        function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
          var isAry = bitmask & ARY_FLAG,
              isBind = bitmask & BIND_FLAG,
              isBindKey = bitmask & BIND_KEY_FLAG,
              isCurry = bitmask & CURRY_FLAG,
              isCurryBound = bitmask & CURRY_BOUND_FLAG,
              isCurryRight = bitmask & CURRY_RIGHT_FLAG,
              Ctor = isBindKey ? undefined : createCtorWrapper(func);
          function wrapper() {
            var length = arguments.length,
                index = length,
                args = Array(length);
            while (index--) {
              args[index] = arguments[index];
            }
            if (partials) {
              args = composeArgs(args, partials, holders);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight);
            }
            if (isCurry || isCurryRight) {
              var placeholder = wrapper.placeholder,
                  argsHolders = replaceHolders(args, placeholder);
              length -= argsHolders.length;
              if (length < arity) {
                var newArgPos = argPos ? arrayCopy(argPos) : undefined,
                    newArity = nativeMax(arity - length, 0),
                    newsHolders = isCurry ? argsHolders : undefined,
                    newHoldersRight = isCurry ? undefined : argsHolders,
                    newPartials = isCurry ? args : undefined,
                    newPartialsRight = isCurry ? undefined : args;
                bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
                bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
                if (!isCurryBound) {
                  bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
                }
                var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                    result = createHybridWrapper.apply(undefined, newData);
                if (isLaziable(func)) {
                  setData(result, newData);
                }
                result.placeholder = placeholder;
                return result;
              }
            }
            var thisBinding = isBind ? thisArg : this,
                fn = isBindKey ? thisBinding[func] : func;
            if (argPos) {
              args = reorder(args, argPos);
            }
            if (isAry && ary < args.length) {
              args.length = ary;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtorWrapper(func);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createPadding(string, length, chars) {
          var strLength = string.length;
          length = +length;
          if (strLength >= length || !nativeIsFinite(length)) {
            return '';
          }
          var padLength = length - strLength;
          chars = chars == null ? ' ' : (chars + '');
          return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
        }
        function createPartialWrapper(func, bitmask, thisArg, partials) {
          var isBind = bitmask & BIND_FLAG,
              Ctor = createCtorWrapper(func);
          function wrapper() {
            var argsIndex = -1,
                argsLength = arguments.length,
                leftIndex = -1,
                leftLength = partials.length,
                args = Array(leftLength + argsLength);
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRound(methodName) {
          var func = Math[methodName];
          return function(number, precision) {
            precision = precision === undefined ? 0 : (+precision || 0);
            if (precision) {
              precision = pow(10, precision);
              return func(number * precision) / precision;
            }
            return func(number);
          };
        }
        function createSortedIndex(retHighest) {
          return function(array, value, iteratee, thisArg) {
            var callback = getCallback(iteratee);
            return (iteratee == null && callback === baseCallback) ? binaryIndex(array, value, retHighest) : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
          };
        }
        function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
          var isBindKey = bitmask & BIND_KEY_FLAG;
          if (!isBindKey && typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
            partials = holders = undefined;
          }
          length -= (holders ? holders.length : 0);
          if (bitmask & PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials,
                holdersRight = holders;
            partials = holders = undefined;
          }
          var data = isBindKey ? undefined : getData(func),
              newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
          if (data) {
            mergeData(newData, data);
            bitmask = newData[1];
            arity = newData[9];
          }
          newData[9] = arity == null ? (isBindKey ? 0 : func.length) : (nativeMax(arity - length, 0) || 0);
          if (bitmask == BIND_FLAG) {
            var result = createBindWrapper(newData[0], newData[2]);
          } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
            result = createPartialWrapper.apply(undefined, newData);
          } else {
            result = createHybridWrapper.apply(undefined, newData);
          }
          var setter = data ? baseSetData : setData;
          return setter(result, newData);
        }
        function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var index = -1,
              arrLength = array.length,
              othLength = other.length;
          if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
            return false;
          }
          while (++index < arrLength) {
            var arrValue = array[index],
                othValue = other[index],
                result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
            if (result !== undefined) {
              if (result) {
                continue;
              }
              return false;
            }
            if (isLoose) {
              if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
                return false;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
              return false;
            }
          }
          return true;
        }
        function equalByTag(object, other, tag) {
          switch (tag) {
            case boolTag:
            case dateTag:
              return +object == +other;
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case numberTag:
              return (object != +object) ? other != +other : object == +other;
            case regexpTag:
            case stringTag:
              return object == (other + '');
          }
          return false;
        }
        function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objProps = keys(object),
              objLength = objProps.length,
              othProps = keys(other),
              othLength = othProps.length;
          if (objLength != othLength && !isLoose) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var skipCtor = isLoose;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key],
                othValue = other[key],
                result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
            if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
              return false;
            }
            skipCtor || (skipCtor = key == 'constructor');
          }
          if (!skipCtor) {
            var objCtor = object.constructor,
                othCtor = other.constructor;
            if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
              return false;
            }
          }
          return true;
        }
        function getCallback(func, thisArg, argCount) {
          var result = lodash.callback || callback;
          result = result === callback ? baseCallback : result;
          return argCount ? result(func, thisArg, argCount) : result;
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result = func.name,
              array = realNames[result],
              length = array ? array.length : 0;
          while (length--) {
            var data = array[length],
                otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result;
        }
        function getIndexOf(collection, target, fromIndex) {
          var result = lodash.indexOf || indexOf;
          result = result === indexOf ? baseIndexOf : result;
          return collection ? result(collection, target, fromIndex) : result;
        }
        var getLength = baseProperty('length');
        function getMatchData(object) {
          var result = pairs(object),
              length = result.length;
          while (length--) {
            result[length][2] = isStrictComparable(result[length][1]);
          }
          return result;
        }
        function getNative(object, key) {
          var value = object == null ? undefined : object[key];
          return isNative(value) ? value : undefined;
        }
        function getView(start, end, transforms) {
          var index = -1,
              length = transforms.length;
          while (++index < length) {
            var data = transforms[index],
                size = data.size;
            switch (data.type) {
              case 'drop':
                start += size;
                break;
              case 'dropRight':
                end -= size;
                break;
              case 'take':
                end = nativeMin(end, start + size);
                break;
              case 'takeRight':
                start = nativeMax(start, end - size);
                break;
            }
          }
          return {
            'start': start,
            'end': end
          };
        }
        function initCloneArray(array) {
          var length = array.length,
              result = new array.constructor(length);
          if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
            result.index = array.index;
            result.input = array.input;
          }
          return result;
        }
        function initCloneObject(object) {
          var Ctor = object.constructor;
          if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
            Ctor = Object;
          }
          return new Ctor;
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return bufferClone(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              var buffer = object.buffer;
              return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              var result = new Ctor(object.source, reFlags.exec(object));
              result.lastIndex = object.lastIndex;
          }
          return result;
        }
        function invokePath(object, path, args) {
          if (object != null && !isKey(path, object)) {
            path = toPath(path);
            object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
            path = last(path);
          }
          var func = object == null ? object : object[path];
          return func == null ? undefined : func.apply(object, args);
        }
        function isArrayLike(value) {
          return value != null && isLength(getLength(value));
        }
        function isIndex(value, length) {
          value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return value > -1 && value % 1 == 0 && value < length;
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
            var other = object[index];
            return value === value ? (value === other) : (other !== other);
          }
          return false;
        }
        function isKey(value, object) {
          var type = typeof value;
          if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
            return true;
          }
          if (isArray(value)) {
            return false;
          }
          var result = !reIsDeepProp.test(value);
          return result || (object != null && value in toObject(object));
        }
        function isLaziable(func) {
          var funcName = getFuncName(func);
          if (!(funcName in LazyWrapper.prototype)) {
            return false;
          }
          var other = lodash[funcName];
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isLength(value) {
          return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function mergeData(data, source) {
          var bitmask = data[1],
              srcBitmask = source[1],
              newBitmask = bitmask | srcBitmask,
              isCommon = newBitmask < ARY_FLAG;
          var isCombo = (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) || (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) || (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
          }
          value = source[7];
          if (value) {
            data[7] = arrayCopy(value);
          }
          if (srcBitmask & ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function mergeDefaults(objectValue, sourceValue) {
          return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
        }
        function pickByArray(object, props) {
          object = toObject(object);
          var index = -1,
              length = props.length,
              result = {};
          while (++index < length) {
            var key = props[index];
            if (key in object) {
              result[key] = object[key];
            }
          }
          return result;
        }
        function pickByCallback(object, predicate) {
          var result = {};
          baseForIn(object, function(value, key, object) {
            if (predicate(value, key, object)) {
              result[key] = value;
            }
          });
          return result;
        }
        function reorder(array, indexes) {
          var arrLength = array.length,
              length = nativeMin(indexes.length, arrLength),
              oldArray = arrayCopy(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
          }
          return array;
        }
        var setData = (function() {
          var count = 0,
              lastCalled = 0;
          return function(key, value) {
            var stamp = now(),
                remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return key;
              }
            } else {
              count = 0;
            }
            return baseSetData(key, value);
          };
        }());
        function shimKeys(object) {
          var props = keysIn(object),
              propsLength = props.length,
              length = propsLength && object.length;
          var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
          var index = -1,
              result = [];
          while (++index < propsLength) {
            var key = props[index];
            if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
              result.push(key);
            }
          }
          return result;
        }
        function toIterable(value) {
          if (value == null) {
            return [];
          }
          if (!isArrayLike(value)) {
            return values(value);
          }
          return isObject(value) ? value : Object(value);
        }
        function toObject(value) {
          return isObject(value) ? value : Object(value);
        }
        function toPath(value) {
          if (isArray(value)) {
            return value;
          }
          var result = [];
          baseToString(value).replace(rePropName, function(match, number, quote, string) {
            result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
          });
          return result;
        }
        function wrapperClone(wrapper) {
          return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
        }
        function chunk(array, size, guard) {
          if (guard ? isIterateeCall(array, size, guard) : size == null) {
            size = 1;
          } else {
            size = nativeMax(nativeFloor(size) || 1, 1);
          }
          var index = 0,
              length = array ? array.length : 0,
              resIndex = -1,
              result = Array(nativeCeil(length / size));
          while (index < length) {
            result[++resIndex] = baseSlice(array, index, (index += size));
          }
          return result;
        }
        function compact(array) {
          var index = -1,
              length = array ? array.length : 0,
              resIndex = -1,
              result = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
        var difference = restParam(function(array, values) {
          return (isObjectLike(array) && isArrayLike(array)) ? baseDifference(array, baseFlatten(values, false, true)) : [];
        });
        function drop(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          return baseSlice(array, n < 0 ? 0 : n);
        }
        function dropRight(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          n = length - (+n || 0);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true) : [];
        }
        function dropWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        var findIndex = createFindIndex();
        var findLastIndex = createFindIndex(true);
        function first(array) {
          return array ? array[0] : undefined;
        }
        function flatten(array, isDeep, guard) {
          var length = array ? array.length : 0;
          if (guard && isIterateeCall(array, isDeep, guard)) {
            isDeep = false;
          }
          return length ? baseFlatten(array, isDeep) : [];
        }
        function flattenDeep(array) {
          var length = array ? array.length : 0;
          return length ? baseFlatten(array, true) : [];
        }
        function indexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          if (typeof fromIndex == 'number') {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
          } else if (fromIndex) {
            var index = binaryIndex(array, value);
            if (index < length && (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
              return index;
            }
            return -1;
          }
          return baseIndexOf(array, value, fromIndex || 0);
        }
        function initial(array) {
          return dropRight(array, 1);
        }
        var intersection = restParam(function(arrays) {
          var othLength = arrays.length,
              othIndex = othLength,
              caches = Array(length),
              indexOf = getIndexOf(),
              isCommon = indexOf == baseIndexOf,
              result = [];
          while (othIndex--) {
            var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
            caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
          }
          var array = arrays[0],
              index = -1,
              length = array ? array.length : 0,
              seen = caches[0];
          outer: while (++index < length) {
            value = array[index];
            if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
              var othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(value);
              }
              result.push(value);
            }
          }
          return result;
        });
        function last(array) {
          var length = array ? array.length : 0;
          return length ? array[length - 1] : undefined;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          var index = length;
          if (typeof fromIndex == 'number') {
            index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
          } else if (fromIndex) {
            index = binaryIndex(array, value, true) - 1;
            var other = array[index];
            if (value === value ? (value === other) : (other !== other)) {
              return index;
            }
            return -1;
          }
          if (value !== value) {
            return indexOfNaN(array, index, true);
          }
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function pull() {
          var args = arguments,
              array = args[0];
          if (!(array && array.length)) {
            return array;
          }
          var index = 0,
              indexOf = getIndexOf(),
              length = args.length;
          while (++index < length) {
            var fromIndex = 0,
                value = args[index];
            while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        var pullAt = restParam(function(array, indexes) {
          indexes = baseFlatten(indexes);
          var result = baseAt(array, indexes);
          basePullAt(array, indexes.sort(baseCompareAscending));
          return result;
        });
        function remove(array, predicate, thisArg) {
          var result = [];
          if (!(array && array.length)) {
            return result;
          }
          var index = -1,
              indexes = [],
              length = array.length;
          predicate = getCallback(predicate, thisArg, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result;
        }
        function rest(array) {
          return drop(array, 1);
        }
        function slice(array, start, end) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          }
          return baseSlice(array, start, end);
        }
        var sortedIndex = createSortedIndex();
        var sortedLastIndex = createSortedIndex(true);
        function take(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          n = length - (+n || 0);
          return baseSlice(array, n < 0 ? 0 : n);
        }
        function takeRightWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true) : [];
        }
        function takeWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3)) : [];
        }
        var union = restParam(function(arrays) {
          return baseUniq(baseFlatten(arrays, false, true));
        });
        function uniq(array, isSorted, iteratee, thisArg) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (isSorted != null && typeof isSorted != 'boolean') {
            thisArg = iteratee;
            iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
            isSorted = false;
          }
          var callback = getCallback();
          if (!(iteratee == null && callback === baseCallback)) {
            iteratee = callback(iteratee, thisArg, 3);
          }
          return (isSorted && getIndexOf() == baseIndexOf) ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var index = -1,
              length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLike(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          var result = Array(length);
          while (++index < length) {
            result[index] = arrayMap(array, baseProperty(index));
          }
          return result;
        }
        function unzipWith(array, iteratee, thisArg) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          var result = unzip(array);
          if (iteratee == null) {
            return result;
          }
          iteratee = bindCallback(iteratee, thisArg, 4);
          return arrayMap(result, function(group) {
            return arrayReduce(group, iteratee, undefined, true);
          });
        }
        var without = restParam(function(array, values) {
          return isArrayLike(array) ? baseDifference(array, values) : [];
        });
        function xor() {
          var index = -1,
              length = arguments.length;
          while (++index < length) {
            var array = arguments[index];
            if (isArrayLike(array)) {
              var result = result ? arrayPush(baseDifference(result, array), baseDifference(array, result)) : array;
            }
          }
          return result ? baseUniq(result) : [];
        }
        var zip = restParam(unzip);
        function zipObject(props, values) {
          var index = -1,
              length = props ? props.length : 0,
              result = {};
          if (length && !values && !isArray(props[0])) {
            values = [];
          }
          while (++index < length) {
            var key = props[index];
            if (values) {
              result[key] = values[index];
            } else if (key) {
              result[key[0]] = key[1];
            }
          }
          return result;
        }
        var zipWith = restParam(function(arrays) {
          var length = arrays.length,
              iteratee = length > 2 ? arrays[length - 2] : undefined,
              thisArg = length > 1 ? arrays[length - 1] : undefined;
          if (length > 2 && typeof iteratee == 'function') {
            length -= 2;
          } else {
            iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
            thisArg = undefined;
          }
          arrays.length = length;
          return unzipWith(arrays, iteratee, thisArg);
        });
        function chain(value) {
          var result = lodash(value);
          result.__chain__ = true;
          return result;
        }
        function tap(value, interceptor, thisArg) {
          interceptor.call(thisArg, value);
          return value;
        }
        function thru(value, interceptor, thisArg) {
          return interceptor.call(thisArg, value);
        }
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        var wrapperConcat = restParam(function(values) {
          values = baseFlatten(values);
          return this.thru(function(array) {
            return arrayConcat(isArray(array) ? array : [toObject(array)], values);
          });
        });
        function wrapperPlant(value) {
          var result,
              parent = this;
          while (parent instanceof baseLodash) {
            var clone = wrapperClone(parent);
            if (result) {
              previous.__wrapped__ = clone;
            } else {
              result = clone;
            }
            var previous = clone;
            parent = parent.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          var interceptor = function(value) {
            return (wrapped && wrapped.__dir__ < 0) ? value : value.reverse();
          };
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              'func': thru,
              'args': [interceptor],
              'thisArg': undefined
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(interceptor);
        }
        function wrapperToString() {
          return (this.value() + '');
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var at = restParam(function(collection, props) {
          return baseAt(collection, baseFlatten(props));
        });
        var countBy = createAggregator(function(result, value, key) {
          hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
        });
        function every(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
            predicate = undefined;
          }
          if (typeof predicate != 'function' || thisArg !== undefined) {
            predicate = getCallback(predicate, thisArg, 3);
          }
          return func(collection, predicate);
        }
        function filter(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          predicate = getCallback(predicate, thisArg, 3);
          return func(collection, predicate);
        }
        var find = createFind(baseEach);
        var findLast = createFind(baseEachRight, true);
        function findWhere(collection, source) {
          return find(collection, baseMatches(source));
        }
        var forEach = createForEach(arrayEach, baseEach);
        var forEachRight = createForEach(arrayEachRight, baseEachRight);
        var groupBy = createAggregator(function(result, value, key) {
          if (hasOwnProperty.call(result, key)) {
            result[key].push(value);
          } else {
            result[key] = [value];
          }
        });
        function includes(collection, target, fromIndex, guard) {
          var length = collection ? getLength(collection) : 0;
          if (!isLength(length)) {
            collection = values(collection);
            length = collection.length;
          }
          if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
            fromIndex = 0;
          } else {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
          }
          return (typeof collection == 'string' || !isArray(collection) && isString(collection)) ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1) : (!!length && getIndexOf(collection, target, fromIndex) > -1);
        }
        var indexBy = createAggregator(function(result, value, key) {
          result[key] = value;
        });
        var invoke = restParam(function(collection, path, args) {
          var index = -1,
              isFunc = typeof path == 'function',
              isProp = isKey(path),
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function(value) {
            var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
            result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
          });
          return result;
        });
        function map(collection, iteratee, thisArg) {
          var func = isArray(collection) ? arrayMap : baseMap;
          iteratee = getCallback(iteratee, thisArg, 3);
          return func(collection, iteratee);
        }
        var partition = createAggregator(function(result, value, key) {
          result[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function pluck(collection, path) {
          return map(collection, property(path));
        }
        var reduce = createReduce(arrayReduce, baseEach);
        var reduceRight = createReduce(arrayReduceRight, baseEachRight);
        function reject(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          predicate = getCallback(predicate, thisArg, 3);
          return func(collection, function(value, index, collection) {
            return !predicate(value, index, collection);
          });
        }
        function sample(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n == null) {
            collection = toIterable(collection);
            var length = collection.length;
            return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
          }
          var index = -1,
              result = toArray(collection),
              length = result.length,
              lastIndex = length - 1;
          n = nativeMin(n < 0 ? 0 : (+n || 0), length);
          while (++index < n) {
            var rand = baseRandom(index, lastIndex),
                value = result[rand];
            result[rand] = result[index];
            result[index] = value;
          }
          result.length = n;
          return result;
        }
        function shuffle(collection) {
          return sample(collection, POSITIVE_INFINITY);
        }
        function size(collection) {
          var length = collection ? getLength(collection) : 0;
          return isLength(length) ? length : keys(collection).length;
        }
        function some(collection, predicate, thisArg) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
            predicate = undefined;
          }
          if (typeof predicate != 'function' || thisArg !== undefined) {
            predicate = getCallback(predicate, thisArg, 3);
          }
          return func(collection, predicate);
        }
        function sortBy(collection, iteratee, thisArg) {
          if (collection == null) {
            return [];
          }
          if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
            iteratee = undefined;
          }
          var index = -1;
          iteratee = getCallback(iteratee, thisArg, 3);
          var result = baseMap(collection, function(value, key, collection) {
            return {
              'criteria': iteratee(value, key, collection),
              'index': ++index,
              'value': value
            };
          });
          return baseSortBy(result, compareAscending);
        }
        var sortByAll = restParam(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var guard = iteratees[2];
          if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
            iteratees.length = 1;
          }
          return baseSortByOrder(collection, baseFlatten(iteratees), []);
        });
        function sortByOrder(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (guard && isIterateeCall(iteratees, orders, guard)) {
            orders = undefined;
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseSortByOrder(collection, iteratees, orders);
        }
        function where(collection, source) {
          return filter(collection, baseMatches(source));
        }
        var now = nativeNow || function() {
          return new Date().getTime();
        };
        function after(n, func) {
          if (typeof func != 'function') {
            if (typeof n == 'function') {
              var temp = n;
              n = func;
              func = temp;
            } else {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
          }
          n = nativeIsFinite(n = +n) ? n : 0;
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          if (guard && isIterateeCall(func, n, guard)) {
            n = undefined;
          }
          n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
          return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
        }
        function before(n, func) {
          var result;
          if (typeof func != 'function') {
            if (typeof n == 'function') {
              var temp = n;
              n = func;
              func = temp;
            } else {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
          }
          return function() {
            if (--n > 0) {
              result = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined;
            }
            return result;
          };
        }
        var bind = restParam(function(func, thisArg, partials) {
          var bitmask = BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bind.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(func, bitmask, thisArg, partials, holders);
        });
        var bindAll = restParam(function(object, methodNames) {
          methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
          var index = -1,
              length = methodNames.length;
          while (++index < length) {
            var key = methodNames[index];
            object[key] = createWrapper(object[key], BIND_FLAG, object);
          }
          return object;
        });
        var bindKey = restParam(function(object, key, partials) {
          var bitmask = BIND_FLAG | BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bindKey.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(key, bitmask, object, partials, holders);
        });
        var curry = createCurry(CURRY_FLAG);
        var curryRight = createCurry(CURRY_RIGHT_FLAG);
        function debounce(func, wait, options) {
          var args,
              maxTimeoutId,
              result,
              stamp,
              thisArg,
              timeoutId,
              trailingCall,
              lastCalled = 0,
              maxWait = false,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = wait < 0 ? 0 : (+wait || 0);
          if (options === true) {
            var leading = true;
            trailing = false;
          } else if (isObject(options)) {
            leading = !!options.leading;
            maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          function cancel() {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            if (maxTimeoutId) {
              clearTimeout(maxTimeoutId);
            }
            lastCalled = 0;
            maxTimeoutId = timeoutId = trailingCall = undefined;
          }
          function complete(isCalled, id) {
            if (id) {
              clearTimeout(id);
            }
            maxTimeoutId = timeoutId = trailingCall = undefined;
            if (isCalled) {
              lastCalled = now();
              result = func.apply(thisArg, args);
              if (!timeoutId && !maxTimeoutId) {
                args = thisArg = undefined;
              }
            }
          }
          function delayed() {
            var remaining = wait - (now() - stamp);
            if (remaining <= 0 || remaining > wait) {
              complete(trailingCall, maxTimeoutId);
            } else {
              timeoutId = setTimeout(delayed, remaining);
            }
          }
          function maxDelayed() {
            complete(trailing, timeoutId);
          }
          function debounced() {
            args = arguments;
            stamp = now();
            thisArg = this;
            trailingCall = trailing && (timeoutId || !leading);
            if (maxWait === false) {
              var leadingCall = leading && !timeoutId;
            } else {
              if (!maxTimeoutId && !leading) {
                lastCalled = stamp;
              }
              var remaining = maxWait - (stamp - lastCalled),
                  isCalled = remaining <= 0 || remaining > maxWait;
              if (isCalled) {
                if (maxTimeoutId) {
                  maxTimeoutId = clearTimeout(maxTimeoutId);
                }
                lastCalled = stamp;
                result = func.apply(thisArg, args);
              } else if (!maxTimeoutId) {
                maxTimeoutId = setTimeout(maxDelayed, remaining);
              }
            }
            if (isCalled && timeoutId) {
              timeoutId = clearTimeout(timeoutId);
            } else if (!timeoutId && wait !== maxWait) {
              timeoutId = setTimeout(delayed, wait);
            }
            if (leadingCall) {
              isCalled = true;
              result = func.apply(thisArg, args);
            }
            if (isCalled && !timeoutId && !maxTimeoutId) {
              args = thisArg = undefined;
            }
            return result;
          }
          debounced.cancel = cancel;
          return debounced;
        }
        var defer = restParam(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = restParam(function(func, wait, args) {
          return baseDelay(func, wait, args);
        });
        var flow = createFlow();
        var flowRight = createFlow(true);
        function memoize(func, resolver) {
          if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments,
                key = resolver ? resolver.apply(this, args) : args[0],
                cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result);
            return result;
          };
          memoized.cache = new memoize.Cache;
          return memoized;
        }
        var modArgs = restParam(function(func, transforms) {
          transforms = baseFlatten(transforms);
          if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = transforms.length;
          return restParam(function(args) {
            var index = nativeMin(args.length, length);
            while (index--) {
              args[index] = transforms[index](args[index]);
            }
            return func.apply(this, args);
          });
        });
        function negate(predicate) {
          if (typeof predicate != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function() {
            return !predicate.apply(this, arguments);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var partial = createPartial(PARTIAL_FLAG);
        var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
        var rearg = restParam(function(func, indexes) {
          return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
        });
        function restParam(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
          return function() {
            var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                rest = Array(length);
            while (++index < length) {
              rest[index] = args[start + index];
            }
            switch (start) {
              case 0:
                return func.call(this, rest);
              case 1:
                return func.call(this, args[0], rest);
              case 2:
                return func.call(this, args[0], args[1], rest);
            }
            var otherArgs = Array(start + 1);
            index = -1;
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = rest;
            return func.apply(this, otherArgs);
          };
        }
        function spread(func) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function(array) {
            return func.apply(this, array);
          };
        }
        function throttle(func, wait, options) {
          var leading = true,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (options === false) {
            leading = false;
          } else if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            'leading': leading,
            'maxWait': +wait,
            'trailing': trailing
          });
        }
        function wrap(value, wrapper) {
          wrapper = wrapper == null ? identity : wrapper;
          return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
        }
        function clone(value, isDeep, customizer, thisArg) {
          if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
            isDeep = false;
          } else if (typeof isDeep == 'function') {
            thisArg = customizer;
            customizer = isDeep;
            isDeep = false;
          }
          return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1)) : baseClone(value, isDeep);
        }
        function cloneDeep(value, customizer, thisArg) {
          return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 1)) : baseClone(value, true);
        }
        function gt(value, other) {
          return value > other;
        }
        function gte(value, other) {
          return value >= other;
        }
        function isArguments(value) {
          return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
        }
        var isArray = nativeIsArray || function(value) {
          return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };
        function isBoolean(value) {
          return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
        }
        function isDate(value) {
          return isObjectLike(value) && objToString.call(value) == dateTag;
        }
        function isElement(value) {
          return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || (isObjectLike(value) && isFunction(value.splice)))) {
            return !value.length;
          }
          return !keys(value).length;
        }
        function isEqual(value, other, customizer, thisArg) {
          customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
          var result = customizer ? customizer(value, other) : undefined;
          return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
        }
        function isError(value) {
          return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
        }
        function isFinite(value) {
          return typeof value == 'number' && nativeIsFinite(value);
        }
        function isFunction(value) {
          return isObject(value) && objToString.call(value) == funcTag;
        }
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == 'object' || type == 'function');
        }
        function isMatch(object, source, customizer, thisArg) {
          customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
          return baseIsMatch(object, getMatchData(source), customizer);
        }
        function isNaN(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (value == null) {
            return false;
          }
          if (isFunction(value)) {
            return reIsNative.test(fnToString.call(value));
          }
          return isObjectLike(value) && reIsHostCtor.test(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNumber(value) {
          return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
        }
        function isPlainObject(value) {
          var Ctor;
          if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
            return false;
          }
          var result;
          baseForIn(value, function(subValue, key) {
            result = key;
          });
          return result === undefined || hasOwnProperty.call(value, result);
        }
        function isRegExp(value) {
          return isObject(value) && objToString.call(value) == regexpTag;
        }
        function isString(value) {
          return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }
        function isTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
        }
        function isUndefined(value) {
          return value === undefined;
        }
        function lt(value, other) {
          return value < other;
        }
        function lte(value, other) {
          return value <= other;
        }
        function toArray(value) {
          var length = value ? getLength(value) : 0;
          if (!isLength(length)) {
            return values(value);
          }
          if (!length) {
            return [];
          }
          return arrayCopy(value);
        }
        function toPlainObject(value) {
          return baseCopy(value, keysIn(value));
        }
        var merge = createAssigner(baseMerge);
        var assign = createAssigner(function(object, source, customizer) {
          return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
        });
        function create(prototype, properties, guard) {
          var result = baseCreate(prototype);
          if (guard && isIterateeCall(prototype, properties, guard)) {
            properties = undefined;
          }
          return properties ? baseAssign(result, properties) : result;
        }
        var defaults = createDefaults(assign, assignDefaults);
        var defaultsDeep = createDefaults(merge, mergeDefaults);
        var findKey = createFindKey(baseForOwn);
        var findLastKey = createFindKey(baseForOwnRight);
        var forIn = createForIn(baseFor);
        var forInRight = createForIn(baseForRight);
        var forOwn = createForOwn(baseForOwn);
        var forOwnRight = createForOwn(baseForOwnRight);
        function functions(object) {
          return baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
          return result === undefined ? defaultValue : result;
        }
        function has(object, path) {
          if (object == null) {
            return false;
          }
          var result = hasOwnProperty.call(object, path);
          if (!result && !isKey(path)) {
            path = toPath(path);
            object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
            if (object == null) {
              return false;
            }
            path = last(path);
            result = hasOwnProperty.call(object, path);
          }
          return result || (isLength(object.length) && isIndex(path, object.length) && (isArray(object) || isArguments(object)));
        }
        function invert(object, multiValue, guard) {
          if (guard && isIterateeCall(object, multiValue, guard)) {
            multiValue = undefined;
          }
          var index = -1,
              props = keys(object),
              length = props.length,
              result = {};
          while (++index < length) {
            var key = props[index],
                value = object[key];
            if (multiValue) {
              if (hasOwnProperty.call(result, value)) {
                result[value].push(key);
              } else {
                result[value] = [key];
              }
            } else {
              result[value] = key;
            }
          }
          return result;
        }
        var keys = !nativeKeys ? shimKeys : function(object) {
          var Ctor = object == null ? undefined : object.constructor;
          if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object != 'function' && isArrayLike(object))) {
            return shimKeys(object);
          }
          return isObject(object) ? nativeKeys(object) : [];
        };
        function keysIn(object) {
          if (object == null) {
            return [];
          }
          if (!isObject(object)) {
            object = Object(object);
          }
          var length = object.length;
          length = (length && isLength(length) && (isArray(object) || isArguments(object)) && length) || 0;
          var Ctor = object.constructor,
              index = -1,
              isProto = typeof Ctor == 'function' && Ctor.prototype === object,
              result = Array(length),
              skipIndexes = length > 0;
          while (++index < length) {
            result[index] = (index + '');
          }
          for (var key in object) {
            if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          return result;
        }
        var mapKeys = createObjectMapper(true);
        var mapValues = createObjectMapper();
        var omit = restParam(function(object, props) {
          if (object == null) {
            return {};
          }
          if (typeof props[0] != 'function') {
            var props = arrayMap(baseFlatten(props), String);
            return pickByArray(object, baseDifference(keysIn(object), props));
          }
          var predicate = bindCallback(props[0], props[1], 3);
          return pickByCallback(object, function(value, key, object) {
            return !predicate(value, key, object);
          });
        });
        function pairs(object) {
          object = toObject(object);
          var index = -1,
              props = keys(object),
              length = props.length,
              result = Array(length);
          while (++index < length) {
            var key = props[index];
            result[index] = [key, object[key]];
          }
          return result;
        }
        var pick = restParam(function(object, props) {
          if (object == null) {
            return {};
          }
          return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
        });
        function result(object, path, defaultValue) {
          var result = object == null ? undefined : object[path];
          if (result === undefined) {
            if (object != null && !isKey(path, object)) {
              path = toPath(path);
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              result = object == null ? undefined : object[last(path)];
            }
            result = result === undefined ? defaultValue : result;
          }
          return isFunction(result) ? result.call(object) : result;
        }
        function set(object, path, value) {
          if (object == null) {
            return object;
          }
          var pathKey = (path + '');
          path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
          var index = -1,
              length = path.length,
              lastIndex = length - 1,
              nested = object;
          while (nested != null && ++index < length) {
            var key = path[index];
            if (isObject(nested)) {
              if (index == lastIndex) {
                nested[key] = value;
              } else if (nested[key] == null) {
                nested[key] = isIndex(path[index + 1]) ? [] : {};
              }
            }
            nested = nested[key];
          }
          return object;
        }
        function transform(object, iteratee, accumulator, thisArg) {
          var isArr = isArray(object) || isTypedArray(object);
          iteratee = getCallback(iteratee, thisArg, 4);
          if (accumulator == null) {
            if (isArr || isObject(object)) {
              var Ctor = object.constructor;
              if (isArr) {
                accumulator = isArray(object) ? new Ctor : [];
              } else {
                accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
              }
            } else {
              accumulator = {};
            }
          }
          (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
            return iteratee(accumulator, value, index, object);
          });
          return accumulator;
        }
        function values(object) {
          return baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return baseValues(object, keysIn(object));
        }
        function inRange(value, start, end) {
          start = +start || 0;
          if (end === undefined) {
            end = start;
            start = 0;
          } else {
            end = +end || 0;
          }
          return value >= nativeMin(start, end) && value < nativeMax(start, end);
        }
        function random(min, max, floating) {
          if (floating && isIterateeCall(min, max, floating)) {
            max = floating = undefined;
          }
          var noMin = min == null,
              noMax = max == null;
          if (floating == null) {
            if (noMax && typeof min == 'boolean') {
              floating = min;
              min = 1;
            } else if (typeof max == 'boolean') {
              floating = max;
              noMax = true;
            }
          }
          if (noMin && noMax) {
            max = 1;
            noMax = false;
          }
          min = +min || 0;
          if (noMax) {
            max = min;
            min = 0;
          } else {
            max = +max || 0;
          }
          if (floating || min % 1 || max % 1) {
            var rand = nativeRandom();
            return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
          }
          return baseRandom(min, max);
        }
        var camelCase = createCompounder(function(result, word, index) {
          word = word.toLowerCase();
          return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
        });
        function capitalize(string) {
          string = baseToString(string);
          return string && (string.charAt(0).toUpperCase() + string.slice(1));
        }
        function deburr(string) {
          string = baseToString(string);
          return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
        }
        function endsWith(string, target, position) {
          string = baseToString(string);
          target = (target + '');
          var length = string.length;
          position = position === undefined ? length : nativeMin(position < 0 ? 0 : (+position || 0), length);
          position -= target.length;
          return position >= 0 && string.indexOf(target, position) == position;
        }
        function escape(string) {
          string = baseToString(string);
          return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = baseToString(string);
          return (string && reHasRegExpChars.test(string)) ? string.replace(reRegExpChars, escapeRegExpChar) : (string || '(?:)');
        }
        var kebabCase = createCompounder(function(result, word, index) {
          return result + (index ? '-' : '') + word.toLowerCase();
        });
        function pad(string, length, chars) {
          string = baseToString(string);
          length = +length;
          var strLength = string.length;
          if (strLength >= length || !nativeIsFinite(length)) {
            return string;
          }
          var mid = (length - strLength) / 2,
              leftLength = nativeFloor(mid),
              rightLength = nativeCeil(mid);
          chars = createPadding('', rightLength, chars);
          return chars.slice(0, leftLength) + string + chars;
        }
        var padLeft = createPadDir();
        var padRight = createPadDir(true);
        function parseInt(string, radix, guard) {
          if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          string = trim(string);
          return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
        }
        function repeat(string, n) {
          var result = '';
          string = baseToString(string);
          n = +n;
          if (n < 1 || !string || !nativeIsFinite(n)) {
            return result;
          }
          do {
            if (n % 2) {
              result += string;
            }
            n = nativeFloor(n / 2);
            string += string;
          } while (n);
          return result;
        }
        var snakeCase = createCompounder(function(result, word, index) {
          return result + (index ? '_' : '') + word.toLowerCase();
        });
        var startCase = createCompounder(function(result, word, index) {
          return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
        });
        function startsWith(string, target, position) {
          string = baseToString(string);
          position = position == null ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
          return string.lastIndexOf(target, position) == position;
        }
        function template(string, options, otherOptions) {
          var settings = lodash.templateSettings;
          if (otherOptions && isIterateeCall(string, options, otherOptions)) {
            options = otherOptions = undefined;
          }
          string = baseToString(string);
          options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
          var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
              importsKeys = keys(imports),
              importsValues = baseValues(imports, importsKeys);
          var isEscaping,
              isEvaluating,
              index = 0,
              interpolate = options.interpolate || reNoMatch,
              source = "__p += '";
          var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
          var sourceURL = '//# sourceURL=' + ('sourceURL' in options ? options.sourceURL : ('lodash.templateSources[' + (++templateCounter) + ']')) + '\n';
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = options.variable;
          if (!variable) {
            source = 'with (obj) {\n' + source + '\n}\n';
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
          source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
          var result = attempt(function() {
            return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
          });
          result.source = source;
          if (isError(result)) {
            throw result;
          }
          return result;
        }
        function trim(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
          }
          chars = (chars + '');
          return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
        }
        function trimLeft(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(trimmedLeftIndex(string));
          }
          return string.slice(charsLeftIndex(string, (chars + '')));
        }
        function trimRight(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(0, trimmedRightIndex(string) + 1);
          }
          return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
        }
        function trunc(string, options, guard) {
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined;
          }
          var length = DEFAULT_TRUNC_LENGTH,
              omission = DEFAULT_TRUNC_OMISSION;
          if (options != null) {
            if (isObject(options)) {
              var separator = 'separator' in options ? options.separator : separator;
              length = 'length' in options ? (+options.length || 0) : length;
              omission = 'omission' in options ? baseToString(options.omission) : omission;
            } else {
              length = +options || 0;
            }
          }
          string = baseToString(string);
          if (length >= string.length) {
            return string;
          }
          var end = length - omission.length;
          if (end < 1) {
            return omission;
          }
          var result = string.slice(0, end);
          if (separator == null) {
            return result + omission;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match,
                  newEnd,
                  substring = string.slice(0, end);
              if (!separator.global) {
                separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
              }
              separator.lastIndex = 0;
              while ((match = separator.exec(substring))) {
                newEnd = match.index;
              }
              result = result.slice(0, newEnd == null ? end : newEnd);
            }
          } else if (string.indexOf(separator, end) != end) {
            var index = result.lastIndexOf(separator);
            if (index > -1) {
              result = result.slice(0, index);
            }
          }
          return result + omission;
        }
        function unescape(string) {
          string = baseToString(string);
          return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        function words(string, pattern, guard) {
          if (guard && isIterateeCall(string, pattern, guard)) {
            pattern = undefined;
          }
          string = baseToString(string);
          return string.match(pattern || reWords) || [];
        }
        var attempt = restParam(function(func, args) {
          try {
            return func.apply(undefined, args);
          } catch (e) {
            return isError(e) ? e : new Error(e);
          }
        });
        function callback(func, thisArg, guard) {
          if (guard && isIterateeCall(func, thisArg, guard)) {
            thisArg = undefined;
          }
          return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function identity(value) {
          return value;
        }
        function matches(source) {
          return baseMatches(baseClone(source, true));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, true));
        }
        var method = restParam(function(path, args) {
          return function(object) {
            return invokePath(object, path, args);
          };
        });
        var methodOf = restParam(function(object, args) {
          return function(path) {
            return invokePath(object, path, args);
          };
        });
        function mixin(object, source, options) {
          if (options == null) {
            var isObj = isObject(source),
                props = isObj ? keys(source) : undefined,
                methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;
            if (!(methodNames ? methodNames.length : isObj)) {
              methodNames = false;
              options = source;
              source = object;
              object = this;
            }
          }
          if (!methodNames) {
            methodNames = baseFunctions(source, keys(source));
          }
          var chain = true,
              index = -1,
              isFunc = isFunction(object),
              length = methodNames.length;
          if (options === false) {
            chain = false;
          } else if (isObject(options) && 'chain' in options) {
            chain = options.chain;
          }
          while (++index < length) {
            var methodName = methodNames[index],
                func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = (function(func) {
                return function() {
                  var chainAll = this.__chain__;
                  if (chain || chainAll) {
                    var result = object(this.__wrapped__),
                        actions = result.__actions__ = arrayCopy(this.__actions__);
                    actions.push({
                      'func': func,
                      'args': arguments,
                      'thisArg': object
                    });
                    result.__chain__ = chainAll;
                    return result;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }(func));
            }
          }
          return object;
        }
        function noConflict() {
          root._ = oldDash;
          return this;
        }
        function noop() {}
        function property(path) {
          return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return baseGet(object, toPath(path), path + '');
          };
        }
        function range(start, end, step) {
          if (step && isIterateeCall(start, end, step)) {
            end = step = undefined;
          }
          start = +start || 0;
          step = step == null ? 1 : (+step || 0);
          if (end == null) {
            end = start;
            start = 0;
          } else {
            end = +end || 0;
          }
          var index = -1,
              length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
              result = Array(length);
          while (++index < length) {
            result[index] = start;
            start += step;
          }
          return result;
        }
        function times(n, iteratee, thisArg) {
          n = nativeFloor(n);
          if (n < 1 || !nativeIsFinite(n)) {
            return [];
          }
          var index = -1,
              result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
          iteratee = bindCallback(iteratee, thisArg, 1);
          while (++index < n) {
            if (index < MAX_ARRAY_LENGTH) {
              result[index] = iteratee(index);
            } else {
              iteratee(index);
            }
          }
          return result;
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return baseToString(prefix) + id;
        }
        function add(augend, addend) {
          return (+augend || 0) + (+addend || 0);
        }
        var ceil = createRound('ceil');
        var floor = createRound('floor');
        var max = createExtremum(gt, NEGATIVE_INFINITY);
        var min = createExtremum(lt, POSITIVE_INFINITY);
        var round = createRound('round');
        function sum(collection, iteratee, thisArg) {
          if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
            iteratee = undefined;
          }
          iteratee = getCallback(iteratee, thisArg, 3);
          return iteratee.length == 1 ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee) : baseSum(collection, iteratee);
        }
        lodash.prototype = baseLodash.prototype;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        MapCache.prototype['delete'] = mapDelete;
        MapCache.prototype.get = mapGet;
        MapCache.prototype.has = mapHas;
        MapCache.prototype.set = mapSet;
        SetCache.prototype.push = cachePush;
        memoize.Cache = MapCache;
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.callback = callback;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.functions = functions;
        lodash.groupBy = groupBy;
        lodash.indexBy = indexBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.invert = invert;
        lodash.invoke = invoke;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.modArgs = modArgs;
        lodash.negate = negate;
        lodash.omit = omit;
        lodash.once = once;
        lodash.pairs = pairs;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pluck = pluck;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.restParam = restParam;
        lodash.set = set;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortByAll = sortByAll;
        lodash.sortByOrder = sortByOrder;
        lodash.spread = spread;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.times = times;
        lodash.toArray = toArray;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.union = union;
        lodash.uniq = uniq;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.where = where;
        lodash.without = without;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipWith = zipWith;
        lodash.backflow = flowRight;
        lodash.collect = map;
        lodash.compose = flowRight;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.extend = assign;
        lodash.iteratee = callback;
        lodash.methods = functions;
        lodash.object = zipObject;
        lodash.select = filter;
        lodash.tail = rest;
        lodash.unique = uniq;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.deburr = deburr;
        lodash.endsWith = endsWith;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.findWhere = findWhere;
        lodash.first = first;
        lodash.floor = floor;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isBoolean = isBoolean;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isMatch = isMatch;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isString = isString;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.min = min;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padLeft = padLeft;
        lodash.padRight = padRight;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.sum = sum;
        lodash.template = template;
        lodash.trim = trim;
        lodash.trimLeft = trimLeft;
        lodash.trimRight = trimRight;
        lodash.trunc = trunc;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.words = words;
        lodash.all = every;
        lodash.any = some;
        lodash.contains = includes;
        lodash.eq = isEqual;
        lodash.detect = find;
        lodash.foldl = reduce;
        lodash.foldr = reduceRight;
        lodash.head = first;
        lodash.include = includes;
        lodash.inject = reduce;
        mixin(lodash, (function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!lodash.prototype[methodName]) {
              source[methodName] = func;
            }
          });
          return source;
        }()), false);
        lodash.sample = sample;
        lodash.prototype.sample = function(n) {
          if (!this.__chain__ && n == null) {
            return sample(this.value());
          }
          return this.thru(function(value) {
            return sample(value, n);
          });
        };
        lodash.VERSION = VERSION;
        arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(['drop', 'take'], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            var filtered = this.__filtered__;
            if (filtered && !index) {
              return new LazyWrapper(this);
            }
            n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);
            var result = this.clone();
            if (filtered) {
              result.__takeCount__ = nativeMin(result.__takeCount__, n);
            } else {
              result.__views__.push({
                'size': n,
                'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
              });
            }
            return result;
          };
          LazyWrapper.prototype[methodName + 'Right'] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
          var type = index + 1,
              isFilter = type != LAZY_MAP_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
            var result = this.clone();
            result.__iteratees__.push({
              'iteratee': getCallback(iteratee, thisArg, 1),
              'type': type
            });
            result.__filtered__ = result.__filtered__ || isFilter;
            return result;
          };
        });
        arrayEach(['first', 'last'], function(methodName, index) {
          var takeName = 'take' + (index ? 'Right' : '');
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(['initial', 'rest'], function(methodName, index) {
          var dropName = 'drop' + (index ? '' : 'Right');
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        arrayEach(['pluck', 'where'], function(methodName, index) {
          var operationName = index ? 'filter' : 'map',
              createCallback = index ? baseMatches : property;
          LazyWrapper.prototype[methodName] = function(value) {
            return this[operationName](createCallback(value));
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.reject = function(predicate, thisArg) {
          predicate = getCallback(predicate, thisArg, 1);
          return this.filter(function(value) {
            return !predicate(value);
          });
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = start == null ? 0 : (+start || 0);
          var result = this;
          if (result.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result);
          }
          if (start < 0) {
            result = result.takeRight(-start);
          } else if (start) {
            result = result.drop(start);
          }
          if (end !== undefined) {
            end = (+end || 0);
            result = end < 0 ? result.dropRight(-end) : result.take(end - start);
          }
          return result;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
          return this.reverse().takeWhile(predicate, thisArg).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(POSITIVE_INFINITY);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
              retUnwrapped = /^(?:first|last)$/.test(methodName),
              lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];
          if (!lodashFunc) {
            return ;
          }
          lodash.prototype[methodName] = function() {
            var args = retUnwrapped ? [1] : arguments,
                chainAll = this.__chain__,
                value = this.__wrapped__,
                isHybrid = !!this.__actions__.length,
                isLazy = value instanceof LazyWrapper,
                iteratee = args[0],
                useLazy = isLazy || isArray(value);
            if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
              isLazy = useLazy = false;
            }
            var interceptor = function(value) {
              return (retUnwrapped && chainAll) ? lodashFunc(value, 1)[0] : lodashFunc.apply(undefined, arrayPush([value], args));
            };
            var action = {
              'func': thru,
              'args': [interceptor],
              'thisArg': undefined
            },
                onlyLazy = isLazy && !isHybrid;
            if (retUnwrapped && !chainAll) {
              if (onlyLazy) {
                value = value.clone();
                value.__actions__.push(action);
                return func.call(value);
              }
              return lodashFunc.call(undefined, this.value())[0];
            }
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result = func.apply(value, args);
              result.__actions__.push(action);
              return new LodashWrapper(result, chainAll);
            }
            return this.thru(interceptor);
          };
        });
        arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
          var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
              chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
              retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              return func.apply(this.value(), args);
            }
            return this[chainName](function(value) {
              return func.apply(value, args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name,
                names = realNames[key] || (realNames[key] = []);
            names.push({
              'name': methodName,
              'func': lodashFunc
            });
          }
        });
        realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{
          'name': 'wrapper',
          'func': undefined
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.concat = wrapperConcat;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toString = wrapperToString;
        lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.collect = lodash.prototype.map;
        lodash.prototype.head = lodash.prototype.first;
        lodash.prototype.select = lodash.prototype.filter;
        lodash.prototype.tail = lodash.prototype.rest;
        return lodash;
      }
      var _ = runInContext();
      if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeExports && freeModule) {
        if (moduleExports) {
          (freeModule.exports = _)._ = _;
        } else {
          freeExports._ = _;
        }
      } else {
        root._ = _;
      }
    }.call(this));
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:estraverse@1.9.3/estraverse", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
      define(["exports"], factory);
    } else if (typeof exports !== 'undefined') {
      factory(exports);
    } else {
      factory((root.estraverse = {}));
    }
  }(this, function clone(exports) {
    'use strict';
    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        objectCreate,
        objectKeys,
        BREAK,
        SKIP,
        REMOVE;
    function ignoreJSHintError() {}
    isArray = Array.isArray;
    if (!isArray) {
      isArray = function isArray(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
      };
    }
    function deepCopy(obj) {
      var ret = {},
          key,
          val;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          val = obj[key];
          if (typeof val === 'object' && val !== null) {
            ret[key] = deepCopy(val);
          } else {
            ret[key] = val;
          }
        }
      }
      return ret;
    }
    function shallowCopy(obj) {
      var ret = {},
          key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
    ignoreJSHintError(shallowCopy);
    function upperBound(array, func) {
      var diff,
          len,
          i,
          current;
      len = array.length;
      i = 0;
      while (len) {
        diff = len >>> 1;
        current = i + diff;
        if (func(array[current])) {
          len = diff;
        } else {
          i = current + 1;
          len -= diff + 1;
        }
      }
      return i;
    }
    function lowerBound(array, func) {
      var diff,
          len,
          i,
          current;
      len = array.length;
      i = 0;
      while (len) {
        diff = len >>> 1;
        current = i + diff;
        if (func(array[current])) {
          i = current + 1;
          len -= diff + 1;
        } else {
          len = diff;
        }
      }
      return i;
    }
    ignoreJSHintError(lowerBound);
    objectCreate = Object.create || (function() {
      function F() {}
      return function(o) {
        F.prototype = o;
        return new F();
      };
    })();
    objectKeys = Object.keys || function(o) {
      var keys = [],
          key;
      for (key in o) {
        keys.push(key);
      }
      return keys;
    };
    function extend(to, from) {
      var keys = objectKeys(from),
          key,
          i,
          len;
      for (i = 0, len = keys.length; i < len; i += 1) {
        key = keys[i];
        to[key] = from[key];
      }
      return to;
    }
    Syntax = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      ArrayPattern: 'ArrayPattern',
      ArrowFunctionExpression: 'ArrowFunctionExpression',
      AwaitExpression: 'AwaitExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ClassBody: 'ClassBody',
      ClassDeclaration: 'ClassDeclaration',
      ClassExpression: 'ClassExpression',
      ComprehensionBlock: 'ComprehensionBlock',
      ComprehensionExpression: 'ComprehensionExpression',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DebuggerStatement: 'DebuggerStatement',
      DirectiveStatement: 'DirectiveStatement',
      DoWhileStatement: 'DoWhileStatement',
      EmptyStatement: 'EmptyStatement',
      ExportBatchSpecifier: 'ExportBatchSpecifier',
      ExportDeclaration: 'ExportDeclaration',
      ExportSpecifier: 'ExportSpecifier',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      ForOfStatement: 'ForOfStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      GeneratorExpression: 'GeneratorExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      ImportDeclaration: 'ImportDeclaration',
      ImportDefaultSpecifier: 'ImportDefaultSpecifier',
      ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
      ImportSpecifier: 'ImportSpecifier',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      MethodDefinition: 'MethodDefinition',
      ModuleSpecifier: 'ModuleSpecifier',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      ObjectPattern: 'ObjectPattern',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SpreadElement: 'SpreadElement',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      TaggedTemplateExpression: 'TaggedTemplateExpression',
      TemplateElement: 'TemplateElement',
      TemplateLiteral: 'TemplateLiteral',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement',
      YieldExpression: 'YieldExpression'
    };
    VisitorKeys = {
      AssignmentExpression: ['left', 'right'],
      ArrayExpression: ['elements'],
      ArrayPattern: ['elements'],
      ArrowFunctionExpression: ['params', 'defaults', 'rest', 'body'],
      AwaitExpression: ['argument'],
      BlockStatement: ['body'],
      BinaryExpression: ['left', 'right'],
      BreakStatement: ['label'],
      CallExpression: ['callee', 'arguments'],
      CatchClause: ['param', 'body'],
      ClassBody: ['body'],
      ClassDeclaration: ['id', 'body', 'superClass'],
      ClassExpression: ['id', 'body', 'superClass'],
      ComprehensionBlock: ['left', 'right'],
      ComprehensionExpression: ['blocks', 'filter', 'body'],
      ConditionalExpression: ['test', 'consequent', 'alternate'],
      ContinueStatement: ['label'],
      DebuggerStatement: [],
      DirectiveStatement: [],
      DoWhileStatement: ['body', 'test'],
      EmptyStatement: [],
      ExportBatchSpecifier: [],
      ExportDeclaration: ['declaration', 'specifiers', 'source'],
      ExportSpecifier: ['id', 'name'],
      ExpressionStatement: ['expression'],
      ForStatement: ['init', 'test', 'update', 'body'],
      ForInStatement: ['left', 'right', 'body'],
      ForOfStatement: ['left', 'right', 'body'],
      FunctionDeclaration: ['id', 'params', 'defaults', 'rest', 'body'],
      FunctionExpression: ['id', 'params', 'defaults', 'rest', 'body'],
      GeneratorExpression: ['blocks', 'filter', 'body'],
      Identifier: [],
      IfStatement: ['test', 'consequent', 'alternate'],
      ImportDeclaration: ['specifiers', 'source'],
      ImportDefaultSpecifier: ['id'],
      ImportNamespaceSpecifier: ['id'],
      ImportSpecifier: ['id', 'name'],
      Literal: [],
      LabeledStatement: ['label', 'body'],
      LogicalExpression: ['left', 'right'],
      MemberExpression: ['object', 'property'],
      MethodDefinition: ['key', 'value'],
      ModuleSpecifier: [],
      NewExpression: ['callee', 'arguments'],
      ObjectExpression: ['properties'],
      ObjectPattern: ['properties'],
      Program: ['body'],
      Property: ['key', 'value'],
      ReturnStatement: ['argument'],
      SequenceExpression: ['expressions'],
      SpreadElement: ['argument'],
      SwitchStatement: ['discriminant', 'cases'],
      SwitchCase: ['test', 'consequent'],
      TaggedTemplateExpression: ['tag', 'quasi'],
      TemplateElement: [],
      TemplateLiteral: ['quasis', 'expressions'],
      ThisExpression: [],
      ThrowStatement: ['argument'],
      TryStatement: ['block', 'handlers', 'handler', 'guardedHandlers', 'finalizer'],
      UnaryExpression: ['argument'],
      UpdateExpression: ['argument'],
      VariableDeclaration: ['declarations'],
      VariableDeclarator: ['id', 'init'],
      WhileStatement: ['test', 'body'],
      WithStatement: ['object', 'body'],
      YieldExpression: ['argument']
    };
    BREAK = {};
    SKIP = {};
    REMOVE = {};
    VisitorOption = {
      Break: BREAK,
      Skip: SKIP,
      Remove: REMOVE
    };
    function Reference(parent, key) {
      this.parent = parent;
      this.key = key;
    }
    Reference.prototype.replace = function replace(node) {
      this.parent[this.key] = node;
    };
    Reference.prototype.remove = function remove() {
      if (isArray(this.parent)) {
        this.parent.splice(this.key, 1);
        return true;
      } else {
        this.replace(null);
        return false;
      }
    };
    function Element(node, path, wrap, ref) {
      this.node = node;
      this.path = path;
      this.wrap = wrap;
      this.ref = ref;
    }
    function Controller() {}
    Controller.prototype.path = function path() {
      var i,
          iz,
          j,
          jz,
          result,
          element;
      function addToPath(result, path) {
        if (isArray(path)) {
          for (j = 0, jz = path.length; j < jz; ++j) {
            result.push(path[j]);
          }
        } else {
          result.push(path);
        }
      }
      if (!this.__current.path) {
        return null;
      }
      result = [];
      for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
        element = this.__leavelist[i];
        addToPath(result, element.path);
      }
      addToPath(result, this.__current.path);
      return result;
    };
    Controller.prototype.type = function() {
      var node = this.current();
      return node.type || this.__current.wrap;
    };
    Controller.prototype.parents = function parents() {
      var i,
          iz,
          result;
      result = [];
      for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
        result.push(this.__leavelist[i].node);
      }
      return result;
    };
    Controller.prototype.current = function current() {
      return this.__current.node;
    };
    Controller.prototype.__execute = function __execute(callback, element) {
      var previous,
          result;
      result = undefined;
      previous = this.__current;
      this.__current = element;
      this.__state = null;
      if (callback) {
        result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
      }
      this.__current = previous;
      return result;
    };
    Controller.prototype.notify = function notify(flag) {
      this.__state = flag;
    };
    Controller.prototype.skip = function() {
      this.notify(SKIP);
    };
    Controller.prototype['break'] = function() {
      this.notify(BREAK);
    };
    Controller.prototype.remove = function() {
      this.notify(REMOVE);
    };
    Controller.prototype.__initialize = function(root, visitor) {
      this.visitor = visitor;
      this.root = root;
      this.__worklist = [];
      this.__leavelist = [];
      this.__current = null;
      this.__state = null;
      this.__fallback = visitor.fallback === 'iteration';
      this.__keys = VisitorKeys;
      if (visitor.keys) {
        this.__keys = extend(objectCreate(this.__keys), visitor.keys);
      }
    };
    function isNode(node) {
      if (node == null) {
        return false;
      }
      return typeof node === 'object' && typeof node.type === 'string';
    }
    function isProperty(nodeType, key) {
      return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }
    Controller.prototype.traverse = function traverse(root, visitor) {
      var worklist,
          leavelist,
          element,
          node,
          nodeType,
          ret,
          key,
          current,
          current2,
          candidates,
          candidate,
          sentinel;
      this.__initialize(root, visitor);
      sentinel = {};
      worklist = this.__worklist;
      leavelist = this.__leavelist;
      worklist.push(new Element(root, null, null, null));
      leavelist.push(new Element(null, null, null, null));
      while (worklist.length) {
        element = worklist.pop();
        if (element === sentinel) {
          element = leavelist.pop();
          ret = this.__execute(visitor.leave, element);
          if (this.__state === BREAK || ret === BREAK) {
            return ;
          }
          continue;
        }
        if (element.node) {
          ret = this.__execute(visitor.enter, element);
          if (this.__state === BREAK || ret === BREAK) {
            return ;
          }
          worklist.push(sentinel);
          leavelist.push(element);
          if (this.__state === SKIP || ret === SKIP) {
            continue;
          }
          node = element.node;
          nodeType = element.wrap || node.type;
          candidates = this.__keys[nodeType];
          if (!candidates) {
            if (this.__fallback) {
              candidates = objectKeys(node);
            } else {
              throw new Error('Unknown node type ' + nodeType + '.');
            }
          }
          current = candidates.length;
          while ((current -= 1) >= 0) {
            key = candidates[current];
            candidate = node[key];
            if (!candidate) {
              continue;
            }
            if (isArray(candidate)) {
              current2 = candidate.length;
              while ((current2 -= 1) >= 0) {
                if (!candidate[current2]) {
                  continue;
                }
                if (isProperty(nodeType, candidates[current])) {
                  element = new Element(candidate[current2], [key, current2], 'Property', null);
                } else if (isNode(candidate[current2])) {
                  element = new Element(candidate[current2], [key, current2], null, null);
                } else {
                  continue;
                }
                worklist.push(element);
              }
            } else if (isNode(candidate)) {
              worklist.push(new Element(candidate, key, null, null));
            }
          }
        }
      }
    };
    Controller.prototype.replace = function replace(root, visitor) {
      function removeElem(element) {
        var i,
            key,
            nextElem,
            parent;
        if (element.ref.remove()) {
          key = element.ref.key;
          parent = element.ref.parent;
          i = worklist.length;
          while (i--) {
            nextElem = worklist[i];
            if (nextElem.ref && nextElem.ref.parent === parent) {
              if (nextElem.ref.key < key) {
                break;
              }
              --nextElem.ref.key;
            }
          }
        }
      }
      var worklist,
          leavelist,
          node,
          nodeType,
          target,
          element,
          current,
          current2,
          candidates,
          candidate,
          sentinel,
          outer,
          key;
      this.__initialize(root, visitor);
      sentinel = {};
      worklist = this.__worklist;
      leavelist = this.__leavelist;
      outer = {root: root};
      element = new Element(root, null, null, new Reference(outer, 'root'));
      worklist.push(element);
      leavelist.push(element);
      while (worklist.length) {
        element = worklist.pop();
        if (element === sentinel) {
          element = leavelist.pop();
          target = this.__execute(visitor.leave, element);
          if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
            element.ref.replace(target);
          }
          if (this.__state === REMOVE || target === REMOVE) {
            removeElem(element);
          }
          if (this.__state === BREAK || target === BREAK) {
            return outer.root;
          }
          continue;
        }
        target = this.__execute(visitor.enter, element);
        if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
          element.ref.replace(target);
          element.node = target;
        }
        if (this.__state === REMOVE || target === REMOVE) {
          removeElem(element);
          element.node = null;
        }
        if (this.__state === BREAK || target === BREAK) {
          return outer.root;
        }
        node = element.node;
        if (!node) {
          continue;
        }
        worklist.push(sentinel);
        leavelist.push(element);
        if (this.__state === SKIP || target === SKIP) {
          continue;
        }
        nodeType = element.wrap || node.type;
        candidates = this.__keys[nodeType];
        if (!candidates) {
          if (this.__fallback) {
            candidates = objectKeys(node);
          } else {
            throw new Error('Unknown node type ' + nodeType + '.');
          }
        }
        current = candidates.length;
        while ((current -= 1) >= 0) {
          key = candidates[current];
          candidate = node[key];
          if (!candidate) {
            continue;
          }
          if (isArray(candidate)) {
            current2 = candidate.length;
            while ((current2 -= 1) >= 0) {
              if (!candidate[current2]) {
                continue;
              }
              if (isProperty(nodeType, candidates[current])) {
                element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
              } else if (isNode(candidate[current2])) {
                element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
              } else {
                continue;
              }
              worklist.push(element);
            }
          } else if (isNode(candidate)) {
            worklist.push(new Element(candidate, key, null, new Reference(node, key)));
          }
        }
      }
      return outer.root;
    };
    function traverse(root, visitor) {
      var controller = new Controller();
      return controller.traverse(root, visitor);
    }
    function replace(root, visitor) {
      var controller = new Controller();
      return controller.replace(root, visitor);
    }
    function extendCommentRange(comment, tokens) {
      var target;
      target = upperBound(tokens, function search(token) {
        return token.range[0] > comment.range[0];
      });
      comment.extendedRange = [comment.range[0], comment.range[1]];
      if (target !== tokens.length) {
        comment.extendedRange[1] = tokens[target].range[0];
      }
      target -= 1;
      if (target >= 0) {
        comment.extendedRange[0] = tokens[target].range[1];
      }
      return comment;
    }
    function attachComments(tree, providedComments, tokens) {
      var comments = [],
          comment,
          len,
          i,
          cursor;
      if (!tree.range) {
        throw new Error('attachComments needs range information');
      }
      if (!tokens.length) {
        if (providedComments.length) {
          for (i = 0, len = providedComments.length; i < len; i += 1) {
            comment = deepCopy(providedComments[i]);
            comment.extendedRange = [0, tree.range[0]];
            comments.push(comment);
          }
          tree.leadingComments = comments;
        }
        return tree;
      }
      for (i = 0, len = providedComments.length; i < len; i += 1) {
        comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
      }
      cursor = 0;
      traverse(tree, {enter: function(node) {
          var comment;
          while (cursor < comments.length) {
            comment = comments[cursor];
            if (comment.extendedRange[1] > node.range[0]) {
              break;
            }
            if (comment.extendedRange[1] === node.range[0]) {
              if (!node.leadingComments) {
                node.leadingComments = [];
              }
              node.leadingComments.push(comment);
              comments.splice(cursor, 1);
            } else {
              cursor += 1;
            }
          }
          if (cursor === comments.length) {
            return VisitorOption.Break;
          }
          if (comments[cursor].extendedRange[0] > node.range[1]) {
            return VisitorOption.Skip;
          }
        }});
      cursor = 0;
      traverse(tree, {leave: function(node) {
          var comment;
          while (cursor < comments.length) {
            comment = comments[cursor];
            if (node.range[1] < comment.extendedRange[0]) {
              break;
            }
            if (node.range[1] === comment.extendedRange[0]) {
              if (!node.trailingComments) {
                node.trailingComments = [];
              }
              node.trailingComments.push(comment);
              comments.splice(cursor, 1);
            } else {
              cursor += 1;
            }
          }
          if (cursor === comments.length) {
            return VisitorOption.Break;
          }
          if (comments[cursor].extendedRange[0] > node.range[1]) {
            return VisitorOption.Skip;
          }
        }});
      return tree;
    }
    exports.version = '1.8.1-dev';
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
    exports.cloneEnvironment = function() {
      return clone({});
    };
    return exports;
  }));
  global.define = __define;
  return module.exports;
});

System.register("npm:esutils@1.1.6/lib/ast", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function() {
    'use strict';
    function isExpression(node) {
      if (node == null) {
        return false;
      }
      switch (node.type) {
        case 'ArrayExpression':
        case 'AssignmentExpression':
        case 'BinaryExpression':
        case 'CallExpression':
        case 'ConditionalExpression':
        case 'FunctionExpression':
        case 'Identifier':
        case 'Literal':
        case 'LogicalExpression':
        case 'MemberExpression':
        case 'NewExpression':
        case 'ObjectExpression':
        case 'SequenceExpression':
        case 'ThisExpression':
        case 'UnaryExpression':
        case 'UpdateExpression':
          return true;
      }
      return false;
    }
    function isIterationStatement(node) {
      if (node == null) {
        return false;
      }
      switch (node.type) {
        case 'DoWhileStatement':
        case 'ForInStatement':
        case 'ForStatement':
        case 'WhileStatement':
          return true;
      }
      return false;
    }
    function isStatement(node) {
      if (node == null) {
        return false;
      }
      switch (node.type) {
        case 'BlockStatement':
        case 'BreakStatement':
        case 'ContinueStatement':
        case 'DebuggerStatement':
        case 'DoWhileStatement':
        case 'EmptyStatement':
        case 'ExpressionStatement':
        case 'ForInStatement':
        case 'ForStatement':
        case 'IfStatement':
        case 'LabeledStatement':
        case 'ReturnStatement':
        case 'SwitchStatement':
        case 'ThrowStatement':
        case 'TryStatement':
        case 'VariableDeclaration':
        case 'WhileStatement':
        case 'WithStatement':
          return true;
      }
      return false;
    }
    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }
    function trailingStatement(node) {
      switch (node.type) {
        case 'IfStatement':
          if (node.alternate != null) {
            return node.alternate;
          }
          return node.consequent;
        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
          return node.body;
      }
      return null;
    }
    function isProblematicIfStatement(node) {
      var current;
      if (node.type !== 'IfStatement') {
        return false;
      }
      if (node.alternate == null) {
        return false;
      }
      current = node.consequent;
      do {
        if (current.type === 'IfStatement') {
          if (current.alternate == null) {
            return true;
          }
        }
        current = trailingStatement(current);
      } while (current);
      return false;
    }
    module.exports = {
      isExpression: isExpression,
      isStatement: isStatement,
      isIterationStatement: isIterationStatement,
      isSourceElement: isSourceElement,
      isProblematicIfStatement: isProblematicIfStatement,
      trailingStatement: trailingStatement
    };
  }());
  global.define = __define;
  return module.exports;
});

System.register("npm:esutils@1.1.6/lib/code", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function() {
    'use strict';
    var Regex,
        NON_ASCII_WHITESPACES;
    Regex = {
      NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
      NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };
    function isDecimalDigit(ch) {
      return (ch >= 48 && ch <= 57);
    }
    function isHexDigit(ch) {
      return isDecimalDigit(ch) || (97 <= ch && ch <= 102) || (65 <= ch && ch <= 70);
    }
    function isOctalDigit(ch) {
      return (ch >= 48 && ch <= 55);
    }
    NON_ASCII_WHITESPACES = [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF];
    function isWhiteSpace(ch) {
      return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) || (ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0);
    }
    function isLineTerminator(ch) {
      return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    }
    function isIdentifierStart(ch) {
      return (ch >= 97 && ch <= 122) || (ch >= 65 && ch <= 90) || (ch === 36) || (ch === 95) || (ch === 92) || ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }
    function isIdentifierPart(ch) {
      return (ch >= 97 && ch <= 122) || (ch >= 65 && ch <= 90) || (ch >= 48 && ch <= 57) || (ch === 36) || (ch === 95) || (ch === 92) || ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }
    module.exports = {
      isDecimalDigit: isDecimalDigit,
      isHexDigit: isHexDigit,
      isOctalDigit: isOctalDigit,
      isWhiteSpace: isWhiteSpace,
      isLineTerminator: isLineTerminator,
      isIdentifierStart: isIdentifierStart,
      isIdentifierPart: isIdentifierPart
    };
  }());
  global.define = __define;
  return module.exports;
});

System.register("npm:esutils@1.1.6/lib/keyword", ["npm:esutils@1.1.6/lib/code"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function() {
    'use strict';
    var code = require("npm:esutils@1.1.6/lib/code");
    function isStrictModeReservedWordES6(id) {
      switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
          return true;
        default:
          return false;
      }
    }
    function isKeywordES5(id, strict) {
      if (!strict && id === 'yield') {
        return false;
      }
      return isKeywordES6(id, strict);
    }
    function isKeywordES6(id, strict) {
      if (strict && isStrictModeReservedWordES6(id)) {
        return true;
      }
      switch (id.length) {
        case 2:
          return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
          return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
          return (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
          return (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw') || (id === 'const') || (id === 'yield') || (id === 'class') || (id === 'super');
        case 6:
          return (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
          return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
          return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
          return (id === 'instanceof');
        default:
          return false;
      }
    }
    function isReservedWordES5(id, strict) {
      return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }
    function isReservedWordES6(id, strict) {
      return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }
    function isRestrictedWord(id) {
      return id === 'eval' || id === 'arguments';
    }
    function isIdentifierName(id) {
      var i,
          iz,
          ch;
      if (id.length === 0) {
        return false;
      }
      ch = id.charCodeAt(0);
      if (!code.isIdentifierStart(ch) || ch === 92) {
        return false;
      }
      for (i = 1, iz = id.length; i < iz; ++i) {
        ch = id.charCodeAt(i);
        if (!code.isIdentifierPart(ch) || ch === 92) {
          return false;
        }
      }
      return true;
    }
    function isIdentifierES5(id, strict) {
      return isIdentifierName(id) && !isReservedWordES5(id, strict);
    }
    function isIdentifierES6(id, strict) {
      return isIdentifierName(id) && !isReservedWordES6(id, strict);
    }
    module.exports = {
      isKeywordES5: isKeywordES5,
      isKeywordES6: isKeywordES6,
      isReservedWordES5: isReservedWordES5,
      isReservedWordES6: isReservedWordES6,
      isRestrictedWord: isRestrictedWord,
      isIdentifierName: isIdentifierName,
      isIdentifierES5: isIdentifierES5,
      isIdentifierES6: isIdentifierES6
    };
  }());
  global.define = __define;
  return module.exports;
});

System.register("npm:amdefine@1.0.0/amdefine", ["github:jspm/nodelibs-path@0.1.0", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __filename = "/jspm_packages/npm/amdefine@1.0.0/amdefine.js",
      __dirname = "/jspm_packages/npm/amdefine@1.0.0";
  (function(process) {
    'use strict';
    function amdefine(module, requireFn) {
      'use strict';
      var defineCache = {},
          loaderCache = {},
          alreadyCalled = false,
          path = require("github:jspm/nodelibs-path@0.1.0"),
          makeRequire,
          stringRequire;
      function trimDots(ary) {
        var i,
            part;
        for (i = 0; ary[i]; i += 1) {
          part = ary[i];
          if (part === '.') {
            ary.splice(i, 1);
            i -= 1;
          } else if (part === '..') {
            if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
              break;
            } else if (i > 0) {
              ary.splice(i - 1, 2);
              i -= 2;
            }
          }
        }
      }
      function normalize(name, baseName) {
        var baseParts;
        if (name && name.charAt(0) === '.') {
          if (baseName) {
            baseParts = baseName.split('/');
            baseParts = baseParts.slice(0, baseParts.length - 1);
            baseParts = baseParts.concat(name.split('/'));
            trimDots(baseParts);
            name = baseParts.join('/');
          }
        }
        return name;
      }
      function makeNormalize(relName) {
        return function(name) {
          return normalize(name, relName);
        };
      }
      function makeLoad(id) {
        function load(value) {
          loaderCache[id] = value;
        }
        load.fromText = function(id, text) {
          throw new Error('amdefine does not implement load.fromText');
        };
        return load;
      }
      makeRequire = function(systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
          if (typeof deps === 'string') {
            return stringRequire(systemRequire, exports, module, deps, relId);
          } else {
            deps = deps.map(function(depName) {
              return stringRequire(systemRequire, exports, module, depName, relId);
            });
            if (callback) {
              process.nextTick(function() {
                callback.apply(null, deps);
              });
            }
          }
        }
        amdRequire.toUrl = function(filePath) {
          if (filePath.indexOf('.') === 0) {
            return normalize(filePath, path.dirname(module.filename));
          } else {
            return filePath;
          }
        };
        return amdRequire;
      };
      requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
      };
      function runFactory(id, deps, factory) {
        var r,
            e,
            m,
            result;
        if (id) {
          e = loaderCache[id] = {};
          m = {
            id: id,
            uri: __filename,
            exports: e
          };
          r = makeRequire(requireFn, e, m, id);
        } else {
          if (alreadyCalled) {
            throw new Error('amdefine with no module ID cannot be called more than once per file.');
          }
          alreadyCalled = true;
          e = module.exports;
          m = module;
          r = makeRequire(requireFn, e, m, module.id);
        }
        if (deps) {
          deps = deps.map(function(depName) {
            return r(depName);
          });
        }
        if (typeof factory === 'function') {
          result = factory.apply(m.exports, deps);
        } else {
          result = factory;
        }
        if (result !== undefined) {
          m.exports = result;
          if (id) {
            loaderCache[id] = m.exports;
          }
        }
      }
      stringRequire = function(systemRequire, exports, module, id, relId) {
        var index = id.indexOf('!'),
            originalId = id,
            prefix,
            plugin;
        if (index === -1) {
          id = normalize(id, relId);
          if (id === 'require') {
            return makeRequire(systemRequire, exports, module, relId);
          } else if (id === 'exports') {
            return exports;
          } else if (id === 'module') {
            return module;
          } else if (loaderCache.hasOwnProperty(id)) {
            return loaderCache[id];
          } else if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
          } else {
            if (systemRequire) {
              return systemRequire(originalId);
            } else {
              throw new Error('No module with ID: ' + id);
            }
          }
        } else {
          prefix = id.substring(0, index);
          id = id.substring(index + 1, id.length);
          plugin = stringRequire(systemRequire, exports, module, prefix, relId);
          if (plugin.normalize) {
            id = plugin.normalize(id, makeNormalize(relId));
          } else {
            id = normalize(id, relId);
          }
          if (loaderCache[id]) {
            return loaderCache[id];
          } else {
            plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});
            return loaderCache[id];
          }
        }
      };
      function define(id, deps, factory) {
        if (Array.isArray(id)) {
          factory = deps;
          deps = id;
          id = undefined;
        } else if (typeof id !== 'string') {
          factory = id;
          id = deps = undefined;
        }
        if (deps && !Array.isArray(deps)) {
          factory = deps;
          deps = undefined;
        }
        if (!deps) {
          deps = ['require', 'exports', 'module'];
        }
        if (id) {
          defineCache[id] = [id, deps, factory];
        } else {
          runFactory(id, deps, factory);
        }
      }
      define.require = function(id) {
        if (loaderCache[id]) {
          return loaderCache[id];
        }
        if (defineCache[id]) {
          runFactory.apply(null, defineCache[id]);
          return loaderCache[id];
        }
      };
      define.amd = {};
      return define;
    }
    module.exports = amdefine;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/base64", ["npm:amdefine@1.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    var charToIntMap = {};
    var intToCharMap = {};
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('').forEach(function(ch, index) {
      charToIntMap[ch] = index;
      intToCharMap[index] = ch;
    });
    exports.encode = function base64_encode(aNumber) {
      if (aNumber in intToCharMap) {
        return intToCharMap[aNumber];
      }
      throw new TypeError("Must be between 0 and 63: " + aNumber);
    };
    exports.decode = function base64_decode(aChar) {
      if (aChar in charToIntMap) {
        return charToIntMap[aChar];
      }
      throw new TypeError("Not a valid base 64 digit: " + aChar);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/util", ["npm:amdefine@1.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = '';
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ':';
      }
      url += '//';
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + '@';
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = (path.charAt(0) === '/');
      var parts = path.split(/\/+/);
      for (var part,
          up = 0,
          i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === '.') {
          parts.splice(i, 1);
        } else if (part === '..') {
          up++;
        } else if (up > 0) {
          if (part === '') {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join('/');
      if (path === '') {
        path = isAbsolute ? '/' : '.';
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    }
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || '/';
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, '');
      var url = urlParse(aRoot);
      if (aPath.charAt(0) == "/" && url && url.path == "/") {
        return aPath.slice(1);
      }
      return aPath.indexOf(aRoot + '/') === 0 ? aPath.substr(aRoot.length + 1) : aPath;
    }
    exports.relative = relative;
    function toSetString(aStr) {
      return '$' + aStr;
    }
    exports.toSetString = toSetString;
    function fromSetString(aStr) {
      return aStr.substr(1);
    }
    exports.fromSetString = fromSetString;
    function strcmp(aStr1, aStr2) {
      var s1 = aStr1 || "";
      var s2 = aStr2 || "";
      return (s1 > s2) - (s1 < s2);
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp;
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp || onlyCompareOriginal) {
        return cmp;
      }
      cmp = strcmp(mappingA.name, mappingB.name);
      if (cmp) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp) {
        return cmp;
      }
      return mappingA.generatedColumn - mappingB.generatedColumn;
    }
    ;
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
      var cmp;
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    ;
    exports.compareByGeneratedPositions = compareByGeneratedPositions;
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/array-set", ["npm:amdefine@1.0.0", "npm:source-map@0.1.43/lib/source-map/util"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    var util = require("npm:source-map@0.1.43/lib/source-map/util");
    function ArraySet() {
      this._array = [];
      this._set = {};
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0,
          len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var isDuplicate = this.has(aStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        this._set[util.toSetString(aStr)] = idx;
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      return Object.prototype.hasOwnProperty.call(this._set, util.toSetString(aStr));
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (this.has(aStr)) {
        return this._set[util.toSetString(aStr)];
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error('No element indexed by ' + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports.ArraySet = ArraySet;
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/mapping-list", ["npm:amdefine@1.0.0", "npm:source-map@0.1.43/lib/source-map/util"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    var util = require("npm:source-map@0.1.43/lib/source-map/util");
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositions(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = {
        generatedLine: -1,
        generatedColumn: 0
      };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      var mapping;
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositions);
        this._sorted = true;
      }
      return this._array;
    };
    exports.MappingList = MappingList;
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/binary-search", ["npm:amdefine@1.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
        }
        return mid;
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
        }
        return aLow < 0 ? -1 : aLow;
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare) {
      if (aHaystack.length === 0) {
        return -1;
      }
      return recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/source-node", ["npm:amdefine@1.0.0", "npm:source-map@0.1.43/lib/source-map/source-map-generator", "npm:source-map@0.1.43/lib/source-map/util", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    if (typeof define !== 'function') {
      var define = require("npm:amdefine@1.0.0")(module, require);
    }
    define(function(require, exports, module) {
      var SourceMapGenerator = require("npm:source-map@0.1.43/lib/source-map/source-map-generator").SourceMapGenerator;
      var util = require("npm:source-map@0.1.43/lib/source-map/util");
      var REGEX_NEWLINE = /(\r?\n)/;
      var NEWLINE_CODE = 10;
      var isSourceNode = "$$$isSourceNode$$$";
      function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
        this.children = [];
        this.sourceContents = {};
        this.line = aLine == null ? null : aLine;
        this.column = aColumn == null ? null : aColumn;
        this.source = aSource == null ? null : aSource;
        this.name = aName == null ? null : aName;
        this[isSourceNode] = true;
        if (aChunks != null)
          this.add(aChunks);
      }
      SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        var node = new SourceNode();
        var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
        var shiftNextLine = function() {
          var lineContents = remainingLines.shift();
          var newLine = remainingLines.shift() || "";
          return lineContents + newLine;
        };
        var lastGeneratedLine = 1,
            lastGeneratedColumn = 0;
        var lastMapping = null;
        aSourceMapConsumer.eachMapping(function(mapping) {
          if (lastMapping !== null) {
            if (lastGeneratedLine < mapping.generatedLine) {
              var code = "";
              addMappingWithCode(lastMapping, shiftNextLine());
              lastGeneratedLine++;
              lastGeneratedColumn = 0;
            } else {
              var nextLine = remainingLines[0];
              var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
              remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
              lastGeneratedColumn = mapping.generatedColumn;
              addMappingWithCode(lastMapping, code);
              lastMapping = mapping;
              return ;
            }
          }
          while (lastGeneratedLine < mapping.generatedLine) {
            node.add(shiftNextLine());
            lastGeneratedLine++;
          }
          if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[0];
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[0] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
          }
          lastMapping = mapping;
        }, this);
        if (remainingLines.length > 0) {
          if (lastMapping) {
            addMappingWithCode(lastMapping, shiftNextLine());
          }
          node.add(remainingLines.join(""));
        }
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            if (aRelativePath != null) {
              sourceFile = util.join(aRelativePath, sourceFile);
            }
            node.setSourceContent(sourceFile, content);
          }
        });
        return node;
        function addMappingWithCode(mapping, code) {
          if (mapping === null || mapping.source === undefined) {
            node.add(code);
          } else {
            var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
            node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
          }
        }
      };
      SourceNode.prototype.add = function SourceNode_add(aChunk) {
        if (Array.isArray(aChunk)) {
          aChunk.forEach(function(chunk) {
            this.add(chunk);
          }, this);
        } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
          if (aChunk) {
            this.children.push(aChunk);
          }
        } else {
          throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
        }
        return this;
      };
      SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
        if (Array.isArray(aChunk)) {
          for (var i = aChunk.length - 1; i >= 0; i--) {
            this.prepend(aChunk[i]);
          }
        } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
          this.children.unshift(aChunk);
        } else {
          throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
        }
        return this;
      };
      SourceNode.prototype.walk = function SourceNode_walk(aFn) {
        var chunk;
        for (var i = 0,
            len = this.children.length; i < len; i++) {
          chunk = this.children[i];
          if (chunk[isSourceNode]) {
            chunk.walk(aFn);
          } else {
            if (chunk !== '') {
              aFn(chunk, {
                source: this.source,
                line: this.line,
                column: this.column,
                name: this.name
              });
            }
          }
        }
      };
      SourceNode.prototype.join = function SourceNode_join(aSep) {
        var newChildren;
        var i;
        var len = this.children.length;
        if (len > 0) {
          newChildren = [];
          for (i = 0; i < len - 1; i++) {
            newChildren.push(this.children[i]);
            newChildren.push(aSep);
          }
          newChildren.push(this.children[i]);
          this.children = newChildren;
        }
        return this;
      };
      SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
        var lastChild = this.children[this.children.length - 1];
        if (lastChild[isSourceNode]) {
          lastChild.replaceRight(aPattern, aReplacement);
        } else if (typeof lastChild === 'string') {
          this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
        } else {
          this.children.push(''.replace(aPattern, aReplacement));
        }
        return this;
      };
      SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
      };
      SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
        for (var i = 0,
            len = this.children.length; i < len; i++) {
          if (this.children[i][isSourceNode]) {
            this.children[i].walkSourceContents(aFn);
          }
        }
        var sources = Object.keys(this.sourceContents);
        for (var i = 0,
            len = sources.length; i < len; i++) {
          aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
        }
      };
      SourceNode.prototype.toString = function SourceNode_toString() {
        var str = "";
        this.walk(function(chunk) {
          str += chunk;
        });
        return str;
      };
      SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
        var generated = {
          code: "",
          line: 1,
          column: 0
        };
        var map = new SourceMapGenerator(aArgs);
        var sourceMappingActive = false;
        var lastOriginalSource = null;
        var lastOriginalLine = null;
        var lastOriginalColumn = null;
        var lastOriginalName = null;
        this.walk(function(chunk, original) {
          generated.code += chunk;
          if (original.source !== null && original.line !== null && original.column !== null) {
            if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
            lastOriginalSource = original.source;
            lastOriginalLine = original.line;
            lastOriginalColumn = original.column;
            lastOriginalName = original.name;
            sourceMappingActive = true;
          } else if (sourceMappingActive) {
            map.addMapping({generated: {
                line: generated.line,
                column: generated.column
              }});
            lastOriginalSource = null;
            sourceMappingActive = false;
          }
          for (var idx = 0,
              length = chunk.length; idx < length; idx++) {
            if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
              generated.line++;
              generated.column = 0;
              if (idx + 1 === length) {
                lastOriginalSource = null;
                sourceMappingActive = false;
              } else if (sourceMappingActive) {
                map.addMapping({
                  source: original.source,
                  original: {
                    line: original.line,
                    column: original.column
                  },
                  generated: {
                    line: generated.line,
                    column: generated.column
                  },
                  name: original.name
                });
              }
            } else {
              generated.column++;
            }
          }
        });
        this.walkSourceContents(function(sourceFile, sourceContent) {
          map.setSourceContent(sourceFile, sourceContent);
        });
        return {
          code: generated.code,
          map: map
        };
      };
      exports.SourceNode = SourceNode;
    });
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:escodegen@1.6.1/package.json!github:systemjs/plugin-json@0.1.0", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "name": "escodegen",
    "description": "ECMAScript code generator",
    "homepage": "http://github.com/estools/escodegen",
    "main": "escodegen.js",
    "bin": {
      "esgenerate": "./bin/esgenerate.js",
      "escodegen": "./bin/escodegen.js"
    },
    "files": ["LICENSE.BSD", "LICENSE.source-map", "README.md", "bin", "escodegen.js", "package.json"],
    "version": "1.6.1",
    "engines": {"node": ">=0.10.0"},
    "maintainers": [{
      "name": "Yusuke Suzuki",
      "email": "utatane.tea@gmail.com",
      "web": "http://github.com/Constellation"
    }],
    "repository": {
      "type": "git",
      "url": "http://github.com/estools/escodegen.git"
    },
    "dependencies": {
      "estraverse": "^1.9.1",
      "esutils": "^1.1.6",
      "esprima": "^1.2.2",
      "optionator": "^0.5.0"
    },
    "optionalDependencies": {"source-map": "~0.1.40"},
    "devDependencies": {
      "acorn-6to5": "^0.11.1-25",
      "bluebird": "^2.3.11",
      "bower-registry-client": "^0.2.1",
      "chai": "^1.10.0",
      "commonjs-everywhere": "^0.9.7",
      "esprima-moz": "*",
      "gulp": "^3.8.10",
      "gulp-eslint": "^0.2.0",
      "gulp-mocha": "^2.0.0",
      "semver": "^4.1.0"
    },
    "licenses": [{
      "type": "BSD",
      "url": "http://github.com/estools/escodegen/raw/master/LICENSE.BSD"
    }],
    "scripts": {
      "test": "gulp travis",
      "unit-test": "gulp test",
      "lint": "gulp lint",
      "release": "node tools/release.js",
      "build-min": "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
      "build": "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js"
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("lib/templateFactory", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
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
        `,
    dynamic(inOrderInlinedVarArr, callBackFunctionBody) {
      let inOrderInlinedVarNames = inOrderInlinedVarArr.join(',');
      return `
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [${inOrderInlinedVarNames}],
              __ready_call_fun__ = ${callBackFunctionBody},
            `;
    },
    tail(tplContentText) {
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
        tplContentText.forEach((v) => {
          arr.push(iterator(v));
        });
        return arr.join('');
      }
      function iterator(fun) {
        return `
                    function(module, exports, __webpack_require__) {
                        module.exports = ${fun};
                    },
               `;
      }
    },
    requireFunVarName(index) {
      return `__webpack_require__(${index})`;
    },
    defineWrapper(name, depsStr, varsStr, bodyStr) {
      return `define(${name}, [${depsStr}], function (${varsStr}) {${bodyStr}})`;
    },
    defineWrapperOnlyFunctionBody(bodyStr) {
      return `(function() {${bodyStr}}())`;
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:esprima@2.4.1/esprima", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    (function(root, factory) {
      'use strict';
      if (typeof define === 'function' && define.amd) {
        define(["exports"], factory);
      } else if (typeof exports !== 'undefined') {
        factory(exports);
      } else {
        factory((root.esprima = {}));
      }
    }(this, function(exports) {
      'use strict';
      var Token,
          TokenName,
          FnExprTokens,
          Syntax,
          PlaceHolders,
          Messages,
          Regex,
          source,
          strict,
          sourceType,
          index,
          lineNumber,
          lineStart,
          hasLineTerminator,
          lastIndex,
          lastLineNumber,
          lastLineStart,
          startIndex,
          startLineNumber,
          startLineStart,
          scanning,
          length,
          lookahead,
          state,
          extra,
          isBindingElement,
          isAssignmentTarget,
          firstCoverInitializedNameError;
      Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8,
        RegularExpression: 9,
        Template: 10
      };
      TokenName = {};
      TokenName[Token.BooleanLiteral] = 'Boolean';
      TokenName[Token.EOF] = '<end>';
      TokenName[Token.Identifier] = 'Identifier';
      TokenName[Token.Keyword] = 'Keyword';
      TokenName[Token.NullLiteral] = 'Null';
      TokenName[Token.NumericLiteral] = 'Numeric';
      TokenName[Token.Punctuator] = 'Punctuator';
      TokenName[Token.StringLiteral] = 'String';
      TokenName[Token.RegularExpression] = 'RegularExpression';
      TokenName[Token.Template] = 'Template';
      FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new', 'return', 'case', 'delete', 'throw', 'void', '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', ',', '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=', '<=', '<', '>', '!=', '!=='];
      Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForOfStatement: 'ForOfStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchCase: 'SwitchCase',
        SwitchStatement: 'SwitchStatement',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
      };
      PlaceHolders = {ArrowParameterPlaceHolder: 'ArrowParameterPlaceHolder'};
      Messages = {
        UnexpectedToken: 'Unexpected token %0',
        UnexpectedNumber: 'Unexpected number',
        UnexpectedString: 'Unexpected string',
        UnexpectedIdentifier: 'Unexpected identifier',
        UnexpectedReserved: 'Unexpected reserved word',
        UnexpectedTemplate: 'Unexpected quasi %0',
        UnexpectedEOS: 'Unexpected end of input',
        NewlineAfterThrow: 'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp: 'Invalid regular expression: missing /',
        InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
        InvalidLHSInForIn: 'Invalid left-hand side in for-in',
        InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NoCatchOrFinally: 'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalReturn: 'Illegal return statement',
        IllegalYield: 'Unexpected token yield',
        StrictModeWith: 'Strict mode code may not include a with statement',
        StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
        StrictVarName: 'Variable name may not be eval or arguments in strict mode',
        StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
        StrictDelete: 'Delete of an unqualified identifier in strict mode.',
        StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord: 'Use of future reserved word in strict mode',
        TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
        ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
        DefaultRestParameter: 'Unexpected token =',
        ObjectPatternAsRestParameter: 'Unexpected token {',
        DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
        ConstructorSpecialMethod: 'Class constructor may not be an accessor',
        DuplicateConstructor: 'A class may only have one constructor',
        StaticPrototype: 'Classes may not have static property named prototype',
        MissingFromClause: 'Unexpected token',
        NoAsAfterImportNamespace: 'Unexpected token',
        InvalidModuleSpecifier: 'Unexpected token',
        IllegalImportDeclaration: 'Unexpected token',
        IllegalExportDeclaration: 'Unexpected token',
        DuplicateBinding: 'Duplicate binding %0'
      };
      Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
      };
      function assert(condition, message) {
        if (!condition) {
          throw new Error('ASSERT: ' + message);
        }
      }
      function isDecimalDigit(ch) {
        return (ch >= 0x30 && ch <= 0x39);
      }
      function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
      }
      function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
      }
      function octalToDecimal(ch) {
        var octal = (ch !== '0'),
            code = '01234567'.indexOf(ch);
        if (index < length && isOctalDigit(source[index])) {
          octal = true;
          code = code * 8 + '01234567'.indexOf(source[index++]);
          if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
            code = code * 8 + '01234567'.indexOf(source[index++]);
          }
        }
        return {
          code: code,
          octal: octal
        };
      }
      function isWhiteSpace(ch) {
        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) || (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
      }
      function isLineTerminator(ch) {
        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
      }
      function isIdentifierStart(ch) {
        return (ch === 0x24) || (ch === 0x5F) || (ch >= 0x41 && ch <= 0x5A) || (ch >= 0x61 && ch <= 0x7A) || (ch === 0x5C) || ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
      }
      function isIdentifierPart(ch) {
        return (ch === 0x24) || (ch === 0x5F) || (ch >= 0x41 && ch <= 0x5A) || (ch >= 0x61 && ch <= 0x7A) || (ch >= 0x30 && ch <= 0x39) || (ch === 0x5C) || ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
      }
      function isFutureReservedWord(id) {
        switch (id) {
          case 'enum':
          case 'export':
          case 'import':
          case 'super':
            return true;
          default:
            return false;
        }
      }
      function isStrictModeReservedWord(id) {
        switch (id) {
          case 'implements':
          case 'interface':
          case 'package':
          case 'private':
          case 'protected':
          case 'public':
          case 'static':
          case 'yield':
          case 'let':
            return true;
          default:
            return false;
        }
      }
      function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
      }
      function isKeyword(id) {
        switch (id.length) {
          case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
          case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try') || (id === 'let');
          case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with') || (id === 'enum');
          case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw') || (id === 'const') || (id === 'yield') || (id === 'class') || (id === 'super');
          case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch') || (id === 'export') || (id === 'import');
          case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
          case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
          case 10:
            return (id === 'instanceof');
          default:
            return false;
        }
      }
      function addComment(type, value, start, end, loc) {
        var comment;
        assert(typeof start === 'number', 'Comment must have valid position');
        state.lastCommentStart = start;
        comment = {
          type: type,
          value: value
        };
        if (extra.range) {
          comment.range = [start, end];
        }
        if (extra.loc) {
          comment.loc = loc;
        }
        extra.comments.push(comment);
        if (extra.attachComment) {
          extra.leadingComments.push(comment);
          extra.trailingComments.push(comment);
        }
      }
      function skipSingleLineComment(offset) {
        var start,
            loc,
            ch,
            comment;
        start = index - offset;
        loc = {start: {
            line: lineNumber,
            column: index - lineStart - offset
          }};
        while (index < length) {
          ch = source.charCodeAt(index);
          ++index;
          if (isLineTerminator(ch)) {
            hasLineTerminator = true;
            if (extra.comments) {
              comment = source.slice(start + offset, index - 1);
              loc.end = {
                line: lineNumber,
                column: index - lineStart - 1
              };
              addComment('Line', comment, start, index - 1, loc);
            }
            if (ch === 13 && source.charCodeAt(index) === 10) {
              ++index;
            }
            ++lineNumber;
            lineStart = index;
            return ;
          }
        }
        if (extra.comments) {
          comment = source.slice(start + offset, index);
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };
          addComment('Line', comment, start, index, loc);
        }
      }
      function skipMultiLineComment() {
        var start,
            loc,
            ch,
            comment;
        if (extra.comments) {
          start = index - 2;
          loc = {start: {
              line: lineNumber,
              column: index - lineStart - 2
            }};
        }
        while (index < length) {
          ch = source.charCodeAt(index);
          if (isLineTerminator(ch)) {
            if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
              ++index;
            }
            hasLineTerminator = true;
            ++lineNumber;
            ++index;
            lineStart = index;
          } else if (ch === 0x2A) {
            if (source.charCodeAt(index + 1) === 0x2F) {
              ++index;
              ++index;
              if (extra.comments) {
                comment = source.slice(start + 2, index - 2);
                loc.end = {
                  line: lineNumber,
                  column: index - lineStart
                };
                addComment('Block', comment, start, index, loc);
              }
              return ;
            }
            ++index;
          } else {
            ++index;
          }
        }
        if (extra.comments) {
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };
          comment = source.slice(start + 2, index);
          addComment('Block', comment, start, index, loc);
        }
        tolerateUnexpectedToken();
      }
      function skipComment() {
        var ch,
            start;
        hasLineTerminator = false;
        start = (index === 0);
        while (index < length) {
          ch = source.charCodeAt(index);
          if (isWhiteSpace(ch)) {
            ++index;
          } else if (isLineTerminator(ch)) {
            hasLineTerminator = true;
            ++index;
            if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
              ++index;
            }
            ++lineNumber;
            lineStart = index;
            start = true;
          } else if (ch === 0x2F) {
            ch = source.charCodeAt(index + 1);
            if (ch === 0x2F) {
              ++index;
              ++index;
              skipSingleLineComment(2);
              start = true;
            } else if (ch === 0x2A) {
              ++index;
              ++index;
              skipMultiLineComment();
            } else {
              break;
            }
          } else if (start && ch === 0x2D) {
            if ((source.charCodeAt(index + 1) === 0x2D) && (source.charCodeAt(index + 2) === 0x3E)) {
              index += 3;
              skipSingleLineComment(3);
            } else {
              break;
            }
          } else if (ch === 0x3C) {
            if (source.slice(index + 1, index + 4) === '!--') {
              ++index;
              ++index;
              ++index;
              ++index;
              skipSingleLineComment(4);
            } else {
              break;
            }
          } else {
            break;
          }
        }
      }
      function scanHexEscape(prefix) {
        var i,
            len,
            ch,
            code = 0;
        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
          if (index < length && isHexDigit(source[index])) {
            ch = source[index++];
            code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
          } else {
            return '';
          }
        }
        return String.fromCharCode(code);
      }
      function scanUnicodeCodePointEscape() {
        var ch,
            code,
            cu1,
            cu2;
        ch = source[index];
        code = 0;
        if (ch === '}') {
          throwUnexpectedToken();
        }
        while (index < length) {
          ch = source[index++];
          if (!isHexDigit(ch)) {
            break;
          }
          code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
        }
        if (code > 0x10FFFF || ch !== '}') {
          throwUnexpectedToken();
        }
        if (code <= 0xFFFF) {
          return String.fromCharCode(code);
        }
        cu1 = ((code - 0x10000) >> 10) + 0xD800;
        cu2 = ((code - 0x10000) & 1023) + 0xDC00;
        return String.fromCharCode(cu1, cu2);
      }
      function getEscapedIdentifier() {
        var ch,
            id;
        ch = source.charCodeAt(index++);
        id = String.fromCharCode(ch);
        if (ch === 0x5C) {
          if (source.charCodeAt(index) !== 0x75) {
            throwUnexpectedToken();
          }
          ++index;
          ch = scanHexEscape('u');
          if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
            throwUnexpectedToken();
          }
          id = ch;
        }
        while (index < length) {
          ch = source.charCodeAt(index);
          if (!isIdentifierPart(ch)) {
            break;
          }
          ++index;
          id += String.fromCharCode(ch);
          if (ch === 0x5C) {
            id = id.substr(0, id.length - 1);
            if (source.charCodeAt(index) !== 0x75) {
              throwUnexpectedToken();
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
              throwUnexpectedToken();
            }
            id += ch;
          }
        }
        return id;
      }
      function getIdentifier() {
        var start,
            ch;
        start = index++;
        while (index < length) {
          ch = source.charCodeAt(index);
          if (ch === 0x5C) {
            index = start;
            return getEscapedIdentifier();
          }
          if (isIdentifierPart(ch)) {
            ++index;
          } else {
            break;
          }
        }
        return source.slice(start, index);
      }
      function scanIdentifier() {
        var start,
            id,
            type;
        start = index;
        id = (source.charCodeAt(index) === 0x5C) ? getEscapedIdentifier() : getIdentifier();
        if (id.length === 1) {
          type = Token.Identifier;
        } else if (isKeyword(id)) {
          type = Token.Keyword;
        } else if (id === 'null') {
          type = Token.NullLiteral;
        } else if (id === 'true' || id === 'false') {
          type = Token.BooleanLiteral;
        } else {
          type = Token.Identifier;
        }
        return {
          type: type,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }
      function scanPunctuator() {
        var token,
            str;
        token = {
          type: Token.Punctuator,
          value: '',
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: index,
          end: index
        };
        str = source[index];
        switch (str) {
          case '(':
            if (extra.tokenize) {
              extra.openParenToken = extra.tokens.length;
            }
            ++index;
            break;
          case '{':
            if (extra.tokenize) {
              extra.openCurlyToken = extra.tokens.length;
            }
            state.curlyStack.push('{');
            ++index;
            break;
          case '.':
            ++index;
            if (source[index] === '.' && source[index + 1] === '.') {
              index += 2;
              str = '...';
            }
            break;
          case '}':
            ++index;
            state.curlyStack.pop();
            break;
          case ')':
          case ';':
          case ',':
          case '[':
          case ']':
          case ':':
          case '?':
          case '~':
            ++index;
            break;
          default:
            str = source.substr(index, 4);
            if (str === '>>>=') {
              index += 4;
            } else {
              str = str.substr(0, 3);
              if (str === '===' || str === '!==' || str === '>>>' || str === '<<=' || str === '>>=') {
                index += 3;
              } else {
                str = str.substr(0, 2);
                if (str === '&&' || str === '||' || str === '==' || str === '!=' || str === '+=' || str === '-=' || str === '*=' || str === '/=' || str === '++' || str === '--' || str === '<<' || str === '>>' || str === '&=' || str === '|=' || str === '^=' || str === '%=' || str === '<=' || str === '>=' || str === '=>') {
                  index += 2;
                } else {
                  str = source[index];
                  if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
                    ++index;
                  }
                }
              }
            }
        }
        if (index === token.start) {
          throwUnexpectedToken();
        }
        token.end = index;
        token.value = str;
        return token;
      }
      function scanHexLiteral(start) {
        var number = '';
        while (index < length) {
          if (!isHexDigit(source[index])) {
            break;
          }
          number += source[index++];
        }
        if (number.length === 0) {
          throwUnexpectedToken();
        }
        if (isIdentifierStart(source.charCodeAt(index))) {
          throwUnexpectedToken();
        }
        return {
          type: Token.NumericLiteral,
          value: parseInt('0x' + number, 16),
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }
      function scanBinaryLiteral(start) {
        var ch,
            number;
        number = '';
        while (index < length) {
          ch = source[index];
          if (ch !== '0' && ch !== '1') {
            break;
          }
          number += source[index++];
        }
        if (number.length === 0) {
          throwUnexpectedToken();
        }
        if (index < length) {
          ch = source.charCodeAt(index);
          if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
            throwUnexpectedToken();
          }
        }
        return {
          type: Token.NumericLiteral,
          value: parseInt(number, 2),
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }
      function scanOctalLiteral(prefix, start) {
        var number,
            octal;
        if (isOctalDigit(prefix)) {
          octal = true;
          number = '0' + source[index++];
        } else {
          octal = false;
          ++index;
          number = '';
        }
        while (index < length) {
          if (!isOctalDigit(source[index])) {
            break;
          }
          number += source[index++];
        }
        if (!octal && number.length === 0) {
          throwUnexpectedToken();
        }
        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
          throwUnexpectedToken();
        }
        return {
          type: Token.NumericLiteral,
          value: parseInt(number, 8),
          octal: octal,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }
      function isImplicitOctalLiteral() {
        var i,
            ch;
        for (i = index + 1; i < length; ++i) {
          ch = source[i];
          if (ch === '8' || ch === '9') {
            return false;
          }
          if (!isOctalDigit(ch)) {
            return true;
          }
        }
        return true;
      }
      function scanNumericLiteral() {
        var number,
            start,
            ch;
        ch = source[index];
        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
        start = index;
        number = '';
        if (ch !== '.') {
          number = source[index++];
          ch = source[index];
          if (number === '0') {
            if (ch === 'x' || ch === 'X') {
              ++index;
              return scanHexLiteral(start);
            }
            if (ch === 'b' || ch === 'B') {
              ++index;
              return scanBinaryLiteral(start);
            }
            if (ch === 'o' || ch === 'O') {
              return scanOctalLiteral(ch, start);
            }
            if (isOctalDigit(ch)) {
              if (isImplicitOctalLiteral()) {
                return scanOctalLiteral(ch, start);
              }
            }
          }
          while (isDecimalDigit(source.charCodeAt(index))) {
            number += source[index++];
          }
          ch = source[index];
        }
        if (ch === '.') {
          number += source[index++];
          while (isDecimalDigit(source.charCodeAt(index))) {
            number += source[index++];
          }
          ch = source[index];
        }
        if (ch === 'e' || ch === 'E') {
          number += source[index++];
          ch = source[index];
          if (ch === '+' || ch === '-') {
            number += source[index++];
          }
          if (isDecimalDigit(source.charCodeAt(index))) {
            while (isDecimalDigit(source.charCodeAt(index))) {
              number += source[index++];
            }
          } else {
            throwUnexpectedToken();
          }
        }
        if (isIdentifierStart(source.charCodeAt(index))) {
          throwUnexpectedToken();
        }
        return {
          type: Token.NumericLiteral,
          value: parseFloat(number),
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }
      function scanStringLiteral() {
        var str = '',
            quote,
            start,
            ch,
            unescaped,
            octToDec,
            octal = false;
        quote = source[index];
        assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
        start = index;
        ++index;
        while (index < length) {
          ch = source[index++];
          if (ch === quote) {
            quote = '';
            break;
          } else if (ch === '\\') {
            ch = source[index++];
            if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
              switch (ch) {
                case 'u':
                case 'x':
                  if (source[index] === '{') {
                    ++index;
                    str += scanUnicodeCodePointEscape();
                  } else {
                    unescaped = scanHexEscape(ch);
                    if (!unescaped) {
                      throw throwUnexpectedToken();
                    }
                    str += unescaped;
                  }
                  break;
                case 'n':
                  str += '\n';
                  break;
                case 'r':
                  str += '\r';
                  break;
                case 't':
                  str += '\t';
                  break;
                case 'b':
                  str += '\b';
                  break;
                case 'f':
                  str += '\f';
                  break;
                case 'v':
                  str += '\x0B';
                  break;
                case '8':
                case '9':
                  throw throwUnexpectedToken();
                default:
                  if (isOctalDigit(ch)) {
                    octToDec = octalToDecimal(ch);
                    octal = octToDec.octal || octal;
                    str += String.fromCharCode(octToDec.code);
                  } else {
                    str += ch;
                  }
                  break;
              }
            } else {
              ++lineNumber;
              if (ch === '\r' && source[index] === '\n') {
                ++index;
              }
              lineStart = index;
            }
          } else if (isLineTerminator(ch.charCodeAt(0))) {
            break;
          } else {
            str += ch;
          }
        }
        if (quote !== '') {
          throwUnexpectedToken();
        }
        return {
          type: Token.StringLiteral,
          value: str,
          octal: octal,
          lineNumber: startLineNumber,
          lineStart: startLineStart,
          start: start,
          end: index
        };
      }
      function scanTemplate() {
        var cooked = '',
            ch,
            start,
            rawOffset,
            terminated,
            head,
            tail,
            restore,
            unescaped;
        terminated = false;
        tail = false;
        start = index;
        head = (source[index] === '`');
        rawOffset = 2;
        ++index;
        while (index < length) {
          ch = source[index++];
          if (ch === '`') {
            rawOffset = 1;
            tail = true;
            terminated = true;
            break;
          } else if (ch === '$') {
            if (source[index] === '{') {
              state.curlyStack.push('${');
              ++index;
              terminated = true;
              break;
            }
            cooked += ch;
          } else if (ch === '\\') {
            ch = source[index++];
            if (!isLineTerminator(ch.charCodeAt(0))) {
              switch (ch) {
                case 'n':
                  cooked += '\n';
                  break;
                case 'r':
                  cooked += '\r';
                  break;
                case 't':
                  cooked += '\t';
                  break;
                case 'u':
                case 'x':
                  if (source[index] === '{') {
                    ++index;
                    cooked += scanUnicodeCodePointEscape();
                  } else {
                    restore = index;
                    unescaped = scanHexEscape(ch);
                    if (unescaped) {
                      cooked += unescaped;
                    } else {
                      index = restore;
                      cooked += ch;
                    }
                  }
                  break;
                case 'b':
                  cooked += '\b';
                  break;
                case 'f':
                  cooked += '\f';
                  break;
                case 'v':
                  cooked += '\v';
                  break;
                default:
                  if (ch === '0') {
                    if (isDecimalDigit(source.charCodeAt(index))) {
                      throwError(Messages.TemplateOctalLiteral);
                    }
                    cooked += '\0';
                  } else if (isOctalDigit(ch)) {
                    throwError(Messages.TemplateOctalLiteral);
                  } else {
                    cooked += ch;
                  }
                  break;
              }
            } else {
              ++lineNumber;
              if (ch === '\r' && source[index] === '\n') {
                ++index;
              }
              lineStart = index;
            }
          } else if (isLineTerminator(ch.charCodeAt(0))) {
            ++lineNumber;
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
            lineStart = index;
            cooked += '\n';
          } else {
            cooked += ch;
          }
        }
        if (!terminated) {
          throwUnexpectedToken();
        }
        if (!head) {
          state.curlyStack.pop();
        }
        return {
          type: Token.Template,
          value: {
            cooked: cooked,
            raw: source.slice(start + 1, index - rawOffset)
          },
          head: head,
          tail: tail,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }
      function testRegExp(pattern, flags) {
        var astralSubstitute = '\uFFFF',
            tmp = pattern;
        if (flags.indexOf('u') >= 0) {
          tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function($0, $1, $2) {
            var codePoint = parseInt($1 || $2, 16);
            if (codePoint > 0x10FFFF) {
              throwUnexpectedToken(null, Messages.InvalidRegExp);
            }
            if (codePoint <= 0xFFFF) {
              return String.fromCharCode(codePoint);
            }
            return astralSubstitute;
          }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
        }
        try {
          RegExp(tmp);
        } catch (e) {
          throwUnexpectedToken(null, Messages.InvalidRegExp);
        }
        try {
          return new RegExp(pattern, flags);
        } catch (exception) {
          return null;
        }
      }
      function scanRegExpBody() {
        var ch,
            str,
            classMarker,
            terminated,
            body;
        ch = source[index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = source[index++];
        classMarker = false;
        terminated = false;
        while (index < length) {
          ch = source[index++];
          str += ch;
          if (ch === '\\') {
            ch = source[index++];
            if (isLineTerminator(ch.charCodeAt(0))) {
              throwUnexpectedToken(null, Messages.UnterminatedRegExp);
            }
            str += ch;
          } else if (isLineTerminator(ch.charCodeAt(0))) {
            throwUnexpectedToken(null, Messages.UnterminatedRegExp);
          } else if (classMarker) {
            if (ch === ']') {
              classMarker = false;
            }
          } else {
            if (ch === '/') {
              terminated = true;
              break;
            } else if (ch === '[') {
              classMarker = true;
            }
          }
        }
        if (!terminated) {
          throwUnexpectedToken(null, Messages.UnterminatedRegExp);
        }
        body = str.substr(1, str.length - 2);
        return {
          value: body,
          literal: str
        };
      }
      function scanRegExpFlags() {
        var ch,
            str,
            flags,
            restore;
        str = '';
        flags = '';
        while (index < length) {
          ch = source[index];
          if (!isIdentifierPart(ch.charCodeAt(0))) {
            break;
          }
          ++index;
          if (ch === '\\' && index < length) {
            ch = source[index];
            if (ch === 'u') {
              ++index;
              restore = index;
              ch = scanHexEscape('u');
              if (ch) {
                flags += ch;
                for (str += '\\u'; restore < index; ++restore) {
                  str += source[restore];
                }
              } else {
                index = restore;
                flags += 'u';
                str += '\\u';
              }
              tolerateUnexpectedToken();
            } else {
              str += '\\';
              tolerateUnexpectedToken();
            }
          } else {
            flags += ch;
            str += ch;
          }
        }
        return {
          value: flags,
          literal: str
        };
      }
      function scanRegExp() {
        scanning = true;
        var start,
            body,
            flags,
            value;
        lookahead = null;
        skipComment();
        start = index;
        body = scanRegExpBody();
        flags = scanRegExpFlags();
        value = testRegExp(body.value, flags.value);
        scanning = false;
        if (extra.tokenize) {
          return {
            type: Token.RegularExpression,
            value: value,
            regex: {
              pattern: body.value,
              flags: flags.value
            },
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };
        }
        return {
          literal: body.literal + flags.literal,
          value: value,
          regex: {
            pattern: body.value,
            flags: flags.value
          },
          start: start,
          end: index
        };
      }
      function collectRegex() {
        var pos,
            loc,
            regex,
            token;
        skipComment();
        pos = index;
        loc = {start: {
            line: lineNumber,
            column: index - lineStart
          }};
        regex = scanRegExp();
        loc.end = {
          line: lineNumber,
          column: index - lineStart
        };
        if (!extra.tokenize) {
          if (extra.tokens.length > 0) {
            token = extra.tokens[extra.tokens.length - 1];
            if (token.range[0] === pos && token.type === 'Punctuator') {
              if (token.value === '/' || token.value === '/=') {
                extra.tokens.pop();
              }
            }
          }
          extra.tokens.push({
            type: 'RegularExpression',
            value: regex.literal,
            regex: regex.regex,
            range: [pos, index],
            loc: loc
          });
        }
        return regex;
      }
      function isIdentifierName(token) {
        return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
      }
      function advanceSlash() {
        var prevToken,
            checkToken;
        prevToken = extra.tokens[extra.tokens.length - 1];
        if (!prevToken) {
          return collectRegex();
        }
        if (prevToken.type === 'Punctuator') {
          if (prevToken.value === ']') {
            return scanPunctuator();
          }
          if (prevToken.value === ')') {
            checkToken = extra.tokens[extra.openParenToken - 1];
            if (checkToken && checkToken.type === 'Keyword' && (checkToken.value === 'if' || checkToken.value === 'while' || checkToken.value === 'for' || checkToken.value === 'with')) {
              return collectRegex();
            }
            return scanPunctuator();
          }
          if (prevToken.value === '}') {
            if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
              checkToken = extra.tokens[extra.openCurlyToken - 4];
              if (!checkToken) {
                return scanPunctuator();
              }
            } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
              checkToken = extra.tokens[extra.openCurlyToken - 5];
              if (!checkToken) {
                return collectRegex();
              }
            } else {
              return scanPunctuator();
            }
            if (FnExprTokens.indexOf(checkToken.value) >= 0) {
              return scanPunctuator();
            }
            return collectRegex();
          }
          return collectRegex();
        }
        if (prevToken.type === 'Keyword' && prevToken.value !== 'this') {
          return collectRegex();
        }
        return scanPunctuator();
      }
      function advance() {
        var ch,
            token;
        if (index >= length) {
          return {
            type: Token.EOF,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: index,
            end: index
          };
        }
        ch = source.charCodeAt(index);
        if (isIdentifierStart(ch)) {
          token = scanIdentifier();
          if (strict && isStrictModeReservedWord(token.value)) {
            token.type = Token.Keyword;
          }
          return token;
        }
        if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
          return scanPunctuator();
        }
        if (ch === 0x27 || ch === 0x22) {
          return scanStringLiteral();
        }
        if (ch === 0x2E) {
          if (isDecimalDigit(source.charCodeAt(index + 1))) {
            return scanNumericLiteral();
          }
          return scanPunctuator();
        }
        if (isDecimalDigit(ch)) {
          return scanNumericLiteral();
        }
        if (extra.tokenize && ch === 0x2F) {
          return advanceSlash();
        }
        if (ch === 0x60 || (ch === 0x7D && state.curlyStack[state.curlyStack.length - 1] === '${')) {
          return scanTemplate();
        }
        return scanPunctuator();
      }
      function collectToken() {
        var loc,
            token,
            value,
            entry;
        loc = {start: {
            line: lineNumber,
            column: index - lineStart
          }};
        token = advance();
        loc.end = {
          line: lineNumber,
          column: index - lineStart
        };
        if (token.type !== Token.EOF) {
          value = source.slice(token.start, token.end);
          entry = {
            type: TokenName[token.type],
            value: value,
            range: [token.start, token.end],
            loc: loc
          };
          if (token.regex) {
            entry.regex = {
              pattern: token.regex.pattern,
              flags: token.regex.flags
            };
          }
          extra.tokens.push(entry);
        }
        return token;
      }
      function lex() {
        var token;
        scanning = true;
        lastIndex = index;
        lastLineNumber = lineNumber;
        lastLineStart = lineStart;
        skipComment();
        token = lookahead;
        startIndex = index;
        startLineNumber = lineNumber;
        startLineStart = lineStart;
        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
        scanning = false;
        return token;
      }
      function peek() {
        scanning = true;
        skipComment();
        lastIndex = index;
        lastLineNumber = lineNumber;
        lastLineStart = lineStart;
        startIndex = index;
        startLineNumber = lineNumber;
        startLineStart = lineStart;
        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
        scanning = false;
      }
      function Position() {
        this.line = startLineNumber;
        this.column = startIndex - startLineStart;
      }
      function SourceLocation() {
        this.start = new Position();
        this.end = null;
      }
      function WrappingSourceLocation(startToken) {
        this.start = {
          line: startToken.lineNumber,
          column: startToken.start - startToken.lineStart
        };
        this.end = null;
      }
      function Node() {
        if (extra.range) {
          this.range = [startIndex, 0];
        }
        if (extra.loc) {
          this.loc = new SourceLocation();
        }
      }
      function WrappingNode(startToken) {
        if (extra.range) {
          this.range = [startToken.start, 0];
        }
        if (extra.loc) {
          this.loc = new WrappingSourceLocation(startToken);
        }
      }
      WrappingNode.prototype = Node.prototype = {
        processComment: function() {
          var lastChild,
              leadingComments,
              trailingComments,
              bottomRight = extra.bottomRightStack,
              i,
              comment,
              last = bottomRight[bottomRight.length - 1];
          if (this.type === Syntax.Program) {
            if (this.body.length > 0) {
              return ;
            }
          }
          if (extra.trailingComments.length > 0) {
            trailingComments = [];
            for (i = extra.trailingComments.length - 1; i >= 0; --i) {
              comment = extra.trailingComments[i];
              if (comment.range[0] >= this.range[1]) {
                trailingComments.unshift(comment);
                extra.trailingComments.splice(i, 1);
              }
            }
            extra.trailingComments = [];
          } else {
            if (last && last.trailingComments && last.trailingComments[0].range[0] >= this.range[1]) {
              trailingComments = last.trailingComments;
              delete last.trailingComments;
            }
          }
          while (last && last.range[0] >= this.range[0]) {
            lastChild = bottomRight.pop();
            last = bottomRight[bottomRight.length - 1];
          }
          if (lastChild) {
            if (lastChild.leadingComments) {
              leadingComments = [];
              for (i = lastChild.leadingComments.length - 1; i >= 0; --i) {
                comment = lastChild.leadingComments[i];
                if (comment.range[1] <= this.range[0]) {
                  leadingComments.unshift(comment);
                  lastChild.leadingComments.splice(i, 1);
                }
              }
              if (!lastChild.leadingComments.length) {
                lastChild.leadingComments = undefined;
              }
            }
          } else if (extra.leadingComments.length > 0) {
            leadingComments = [];
            for (i = extra.leadingComments.length - 1; i >= 0; --i) {
              comment = extra.leadingComments[i];
              if (comment.range[1] <= this.range[0]) {
                leadingComments.unshift(comment);
                extra.leadingComments.splice(i, 1);
              }
            }
          }
          if (leadingComments && leadingComments.length > 0) {
            this.leadingComments = leadingComments;
          }
          if (trailingComments && trailingComments.length > 0) {
            this.trailingComments = trailingComments;
          }
          bottomRight.push(this);
        },
        finish: function() {
          if (extra.range) {
            this.range[1] = lastIndex;
          }
          if (extra.loc) {
            this.loc.end = {
              line: lastLineNumber,
              column: lastIndex - lastLineStart
            };
            if (extra.source) {
              this.loc.source = extra.source;
            }
          }
          if (extra.attachComment) {
            this.processComment();
          }
        },
        finishArrayExpression: function(elements) {
          this.type = Syntax.ArrayExpression;
          this.elements = elements;
          this.finish();
          return this;
        },
        finishArrayPattern: function(elements) {
          this.type = Syntax.ArrayPattern;
          this.elements = elements;
          this.finish();
          return this;
        },
        finishArrowFunctionExpression: function(params, defaults, body, expression) {
          this.type = Syntax.ArrowFunctionExpression;
          this.id = null;
          this.params = params;
          this.defaults = defaults;
          this.body = body;
          this.generator = false;
          this.expression = expression;
          this.finish();
          return this;
        },
        finishAssignmentExpression: function(operator, left, right) {
          this.type = Syntax.AssignmentExpression;
          this.operator = operator;
          this.left = left;
          this.right = right;
          this.finish();
          return this;
        },
        finishAssignmentPattern: function(left, right) {
          this.type = Syntax.AssignmentPattern;
          this.left = left;
          this.right = right;
          this.finish();
          return this;
        },
        finishBinaryExpression: function(operator, left, right) {
          this.type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression : Syntax.BinaryExpression;
          this.operator = operator;
          this.left = left;
          this.right = right;
          this.finish();
          return this;
        },
        finishBlockStatement: function(body) {
          this.type = Syntax.BlockStatement;
          this.body = body;
          this.finish();
          return this;
        },
        finishBreakStatement: function(label) {
          this.type = Syntax.BreakStatement;
          this.label = label;
          this.finish();
          return this;
        },
        finishCallExpression: function(callee, args) {
          this.type = Syntax.CallExpression;
          this.callee = callee;
          this.arguments = args;
          this.finish();
          return this;
        },
        finishCatchClause: function(param, body) {
          this.type = Syntax.CatchClause;
          this.param = param;
          this.body = body;
          this.finish();
          return this;
        },
        finishClassBody: function(body) {
          this.type = Syntax.ClassBody;
          this.body = body;
          this.finish();
          return this;
        },
        finishClassDeclaration: function(id, superClass, body) {
          this.type = Syntax.ClassDeclaration;
          this.id = id;
          this.superClass = superClass;
          this.body = body;
          this.finish();
          return this;
        },
        finishClassExpression: function(id, superClass, body) {
          this.type = Syntax.ClassExpression;
          this.id = id;
          this.superClass = superClass;
          this.body = body;
          this.finish();
          return this;
        },
        finishConditionalExpression: function(test, consequent, alternate) {
          this.type = Syntax.ConditionalExpression;
          this.test = test;
          this.consequent = consequent;
          this.alternate = alternate;
          this.finish();
          return this;
        },
        finishContinueStatement: function(label) {
          this.type = Syntax.ContinueStatement;
          this.label = label;
          this.finish();
          return this;
        },
        finishDebuggerStatement: function() {
          this.type = Syntax.DebuggerStatement;
          this.finish();
          return this;
        },
        finishDoWhileStatement: function(body, test) {
          this.type = Syntax.DoWhileStatement;
          this.body = body;
          this.test = test;
          this.finish();
          return this;
        },
        finishEmptyStatement: function() {
          this.type = Syntax.EmptyStatement;
          this.finish();
          return this;
        },
        finishExpressionStatement: function(expression) {
          this.type = Syntax.ExpressionStatement;
          this.expression = expression;
          this.finish();
          return this;
        },
        finishForStatement: function(init, test, update, body) {
          this.type = Syntax.ForStatement;
          this.init = init;
          this.test = test;
          this.update = update;
          this.body = body;
          this.finish();
          return this;
        },
        finishForOfStatement: function(left, right, body) {
          this.type = Syntax.ForOfStatement;
          this.left = left;
          this.right = right;
          this.body = body;
          this.finish();
          return this;
        },
        finishForInStatement: function(left, right, body) {
          this.type = Syntax.ForInStatement;
          this.left = left;
          this.right = right;
          this.body = body;
          this.each = false;
          this.finish();
          return this;
        },
        finishFunctionDeclaration: function(id, params, defaults, body, generator) {
          this.type = Syntax.FunctionDeclaration;
          this.id = id;
          this.params = params;
          this.defaults = defaults;
          this.body = body;
          this.generator = generator;
          this.expression = false;
          this.finish();
          return this;
        },
        finishFunctionExpression: function(id, params, defaults, body, generator) {
          this.type = Syntax.FunctionExpression;
          this.id = id;
          this.params = params;
          this.defaults = defaults;
          this.body = body;
          this.generator = generator;
          this.expression = false;
          this.finish();
          return this;
        },
        finishIdentifier: function(name) {
          this.type = Syntax.Identifier;
          this.name = name;
          this.finish();
          return this;
        },
        finishIfStatement: function(test, consequent, alternate) {
          this.type = Syntax.IfStatement;
          this.test = test;
          this.consequent = consequent;
          this.alternate = alternate;
          this.finish();
          return this;
        },
        finishLabeledStatement: function(label, body) {
          this.type = Syntax.LabeledStatement;
          this.label = label;
          this.body = body;
          this.finish();
          return this;
        },
        finishLiteral: function(token) {
          this.type = Syntax.Literal;
          this.value = token.value;
          this.raw = source.slice(token.start, token.end);
          if (token.regex) {
            this.regex = token.regex;
          }
          this.finish();
          return this;
        },
        finishMemberExpression: function(accessor, object, property) {
          this.type = Syntax.MemberExpression;
          this.computed = accessor === '[';
          this.object = object;
          this.property = property;
          this.finish();
          return this;
        },
        finishNewExpression: function(callee, args) {
          this.type = Syntax.NewExpression;
          this.callee = callee;
          this.arguments = args;
          this.finish();
          return this;
        },
        finishObjectExpression: function(properties) {
          this.type = Syntax.ObjectExpression;
          this.properties = properties;
          this.finish();
          return this;
        },
        finishObjectPattern: function(properties) {
          this.type = Syntax.ObjectPattern;
          this.properties = properties;
          this.finish();
          return this;
        },
        finishPostfixExpression: function(operator, argument) {
          this.type = Syntax.UpdateExpression;
          this.operator = operator;
          this.argument = argument;
          this.prefix = false;
          this.finish();
          return this;
        },
        finishProgram: function(body) {
          this.type = Syntax.Program;
          this.body = body;
          if (sourceType === 'module') {
            this.sourceType = sourceType;
          }
          this.finish();
          return this;
        },
        finishProperty: function(kind, key, computed, value, method, shorthand) {
          this.type = Syntax.Property;
          this.key = key;
          this.computed = computed;
          this.value = value;
          this.kind = kind;
          this.method = method;
          this.shorthand = shorthand;
          this.finish();
          return this;
        },
        finishRestElement: function(argument) {
          this.type = Syntax.RestElement;
          this.argument = argument;
          this.finish();
          return this;
        },
        finishReturnStatement: function(argument) {
          this.type = Syntax.ReturnStatement;
          this.argument = argument;
          this.finish();
          return this;
        },
        finishSequenceExpression: function(expressions) {
          this.type = Syntax.SequenceExpression;
          this.expressions = expressions;
          this.finish();
          return this;
        },
        finishSpreadElement: function(argument) {
          this.type = Syntax.SpreadElement;
          this.argument = argument;
          this.finish();
          return this;
        },
        finishSwitchCase: function(test, consequent) {
          this.type = Syntax.SwitchCase;
          this.test = test;
          this.consequent = consequent;
          this.finish();
          return this;
        },
        finishSuper: function() {
          this.type = Syntax.Super;
          this.finish();
          return this;
        },
        finishSwitchStatement: function(discriminant, cases) {
          this.type = Syntax.SwitchStatement;
          this.discriminant = discriminant;
          this.cases = cases;
          this.finish();
          return this;
        },
        finishTaggedTemplateExpression: function(tag, quasi) {
          this.type = Syntax.TaggedTemplateExpression;
          this.tag = tag;
          this.quasi = quasi;
          this.finish();
          return this;
        },
        finishTemplateElement: function(value, tail) {
          this.type = Syntax.TemplateElement;
          this.value = value;
          this.tail = tail;
          this.finish();
          return this;
        },
        finishTemplateLiteral: function(quasis, expressions) {
          this.type = Syntax.TemplateLiteral;
          this.quasis = quasis;
          this.expressions = expressions;
          this.finish();
          return this;
        },
        finishThisExpression: function() {
          this.type = Syntax.ThisExpression;
          this.finish();
          return this;
        },
        finishThrowStatement: function(argument) {
          this.type = Syntax.ThrowStatement;
          this.argument = argument;
          this.finish();
          return this;
        },
        finishTryStatement: function(block, handler, finalizer) {
          this.type = Syntax.TryStatement;
          this.block = block;
          this.guardedHandlers = [];
          this.handlers = handler ? [handler] : [];
          this.handler = handler;
          this.finalizer = finalizer;
          this.finish();
          return this;
        },
        finishUnaryExpression: function(operator, argument) {
          this.type = (operator === '++' || operator === '--') ? Syntax.UpdateExpression : Syntax.UnaryExpression;
          this.operator = operator;
          this.argument = argument;
          this.prefix = true;
          this.finish();
          return this;
        },
        finishVariableDeclaration: function(declarations) {
          this.type = Syntax.VariableDeclaration;
          this.declarations = declarations;
          this.kind = 'var';
          this.finish();
          return this;
        },
        finishLexicalDeclaration: function(declarations, kind) {
          this.type = Syntax.VariableDeclaration;
          this.declarations = declarations;
          this.kind = kind;
          this.finish();
          return this;
        },
        finishVariableDeclarator: function(id, init) {
          this.type = Syntax.VariableDeclarator;
          this.id = id;
          this.init = init;
          this.finish();
          return this;
        },
        finishWhileStatement: function(test, body) {
          this.type = Syntax.WhileStatement;
          this.test = test;
          this.body = body;
          this.finish();
          return this;
        },
        finishWithStatement: function(object, body) {
          this.type = Syntax.WithStatement;
          this.object = object;
          this.body = body;
          this.finish();
          return this;
        },
        finishExportSpecifier: function(local, exported) {
          this.type = Syntax.ExportSpecifier;
          this.exported = exported || local;
          this.local = local;
          this.finish();
          return this;
        },
        finishImportDefaultSpecifier: function(local) {
          this.type = Syntax.ImportDefaultSpecifier;
          this.local = local;
          this.finish();
          return this;
        },
        finishImportNamespaceSpecifier: function(local) {
          this.type = Syntax.ImportNamespaceSpecifier;
          this.local = local;
          this.finish();
          return this;
        },
        finishExportNamedDeclaration: function(declaration, specifiers, src) {
          this.type = Syntax.ExportNamedDeclaration;
          this.declaration = declaration;
          this.specifiers = specifiers;
          this.source = src;
          this.finish();
          return this;
        },
        finishExportDefaultDeclaration: function(declaration) {
          this.type = Syntax.ExportDefaultDeclaration;
          this.declaration = declaration;
          this.finish();
          return this;
        },
        finishExportAllDeclaration: function(src) {
          this.type = Syntax.ExportAllDeclaration;
          this.source = src;
          this.finish();
          return this;
        },
        finishImportSpecifier: function(local, imported) {
          this.type = Syntax.ImportSpecifier;
          this.local = local || imported;
          this.imported = imported;
          this.finish();
          return this;
        },
        finishImportDeclaration: function(specifiers, src) {
          this.type = Syntax.ImportDeclaration;
          this.specifiers = specifiers;
          this.source = src;
          this.finish();
          return this;
        },
        finishYieldExpression: function(argument, delegate) {
          this.type = Syntax.YieldExpression;
          this.argument = argument;
          this.delegate = delegate;
          this.finish();
          return this;
        }
      };
      function recordError(error) {
        var e,
            existing;
        for (e = 0; e < extra.errors.length; e++) {
          existing = extra.errors[e];
          if (existing.index === error.index && existing.message === error.message) {
            return ;
          }
        }
        extra.errors.push(error);
      }
      function createError(line, pos, description) {
        var error = new Error('Line ' + line + ': ' + description);
        error.index = pos;
        error.lineNumber = line;
        error.column = pos - (scanning ? lineStart : lastLineStart) + 1;
        error.description = description;
        return error;
      }
      function throwError(messageFormat) {
        var args,
            msg;
        args = Array.prototype.slice.call(arguments, 1);
        msg = messageFormat.replace(/%(\d)/g, function(whole, idx) {
          assert(idx < args.length, 'Message reference must be in range');
          return args[idx];
        });
        throw createError(lastLineNumber, lastIndex, msg);
      }
      function tolerateError(messageFormat) {
        var args,
            msg,
            error;
        args = Array.prototype.slice.call(arguments, 1);
        msg = messageFormat.replace(/%(\d)/g, function(whole, idx) {
          assert(idx < args.length, 'Message reference must be in range');
          return args[idx];
        });
        error = createError(lineNumber, lastIndex, msg);
        if (extra.errors) {
          recordError(error);
        } else {
          throw error;
        }
      }
      function unexpectedTokenError(token, message) {
        var value,
            msg = message || Messages.UnexpectedToken;
        if (token) {
          if (!message) {
            msg = (token.type === Token.EOF) ? Messages.UnexpectedEOS : (token.type === Token.Identifier) ? Messages.UnexpectedIdentifier : (token.type === Token.NumericLiteral) ? Messages.UnexpectedNumber : (token.type === Token.StringLiteral) ? Messages.UnexpectedString : (token.type === Token.Template) ? Messages.UnexpectedTemplate : Messages.UnexpectedToken;
            if (token.type === Token.Keyword) {
              if (isFutureReservedWord(token.value)) {
                msg = Messages.UnexpectedReserved;
              } else if (strict && isStrictModeReservedWord(token.value)) {
                msg = Messages.StrictReservedWord;
              }
            }
          }
          value = (token.type === Token.Template) ? token.value.raw : token.value;
        } else {
          value = 'ILLEGAL';
        }
        msg = msg.replace('%0', value);
        return (token && typeof token.lineNumber === 'number') ? createError(token.lineNumber, token.start, msg) : createError(scanning ? lineNumber : lastLineNumber, scanning ? index : lastIndex, msg);
      }
      function throwUnexpectedToken(token, message) {
        throw unexpectedTokenError(token, message);
      }
      function tolerateUnexpectedToken(token, message) {
        var error = unexpectedTokenError(token, message);
        if (extra.errors) {
          recordError(error);
        } else {
          throw error;
        }
      }
      function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
          throwUnexpectedToken(token);
        }
      }
      function expectCommaSeparator() {
        var token;
        if (extra.errors) {
          token = lookahead;
          if (token.type === Token.Punctuator && token.value === ',') {
            lex();
          } else if (token.type === Token.Punctuator && token.value === ';') {
            lex();
            tolerateUnexpectedToken(token);
          } else {
            tolerateUnexpectedToken(token, Messages.UnexpectedToken);
          }
        } else {
          expect(',');
        }
      }
      function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
          throwUnexpectedToken(token);
        }
      }
      function match(value) {
        return lookahead.type === Token.Punctuator && lookahead.value === value;
      }
      function matchKeyword(keyword) {
        return lookahead.type === Token.Keyword && lookahead.value === keyword;
      }
      function matchContextualKeyword(keyword) {
        return lookahead.type === Token.Identifier && lookahead.value === keyword;
      }
      function matchAssign() {
        var op;
        if (lookahead.type !== Token.Punctuator) {
          return false;
        }
        op = lookahead.value;
        return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
      }
      function consumeSemicolon() {
        if (source.charCodeAt(startIndex) === 0x3B || match(';')) {
          lex();
          return ;
        }
        if (hasLineTerminator) {
          return ;
        }
        lastIndex = startIndex;
        lastLineNumber = startLineNumber;
        lastLineStart = startLineStart;
        if (lookahead.type !== Token.EOF && !match('}')) {
          throwUnexpectedToken(lookahead);
        }
      }
      function isolateCoverGrammar(parser) {
        var oldIsBindingElement = isBindingElement,
            oldIsAssignmentTarget = isAssignmentTarget,
            oldFirstCoverInitializedNameError = firstCoverInitializedNameError,
            result;
        isBindingElement = true;
        isAssignmentTarget = true;
        firstCoverInitializedNameError = null;
        result = parser();
        if (firstCoverInitializedNameError !== null) {
          throwUnexpectedToken(firstCoverInitializedNameError);
        }
        isBindingElement = oldIsBindingElement;
        isAssignmentTarget = oldIsAssignmentTarget;
        firstCoverInitializedNameError = oldFirstCoverInitializedNameError;
        return result;
      }
      function inheritCoverGrammar(parser) {
        var oldIsBindingElement = isBindingElement,
            oldIsAssignmentTarget = isAssignmentTarget,
            oldFirstCoverInitializedNameError = firstCoverInitializedNameError,
            result;
        isBindingElement = true;
        isAssignmentTarget = true;
        firstCoverInitializedNameError = null;
        result = parser();
        isBindingElement = isBindingElement && oldIsBindingElement;
        isAssignmentTarget = isAssignmentTarget && oldIsAssignmentTarget;
        firstCoverInitializedNameError = oldFirstCoverInitializedNameError || firstCoverInitializedNameError;
        return result;
      }
      function parseArrayPattern(params) {
        var node = new Node(),
            elements = [],
            rest,
            restNode;
        expect('[');
        while (!match(']')) {
          if (match(',')) {
            lex();
            elements.push(null);
          } else {
            if (match('...')) {
              restNode = new Node();
              lex();
              params.push(lookahead);
              rest = parseVariableIdentifier(params);
              elements.push(restNode.finishRestElement(rest));
              break;
            } else {
              elements.push(parsePatternWithDefault(params));
            }
            if (!match(']')) {
              expect(',');
            }
          }
        }
        expect(']');
        return node.finishArrayPattern(elements);
      }
      function parsePropertyPattern(params) {
        var node = new Node(),
            key,
            keyToken,
            computed = match('['),
            init;
        if (lookahead.type === Token.Identifier) {
          keyToken = lookahead;
          key = parseVariableIdentifier();
          if (match('=')) {
            params.push(keyToken);
            lex();
            init = parseAssignmentExpression();
            return node.finishProperty('init', key, false, new WrappingNode(keyToken).finishAssignmentPattern(key, init), false, false);
          } else if (!match(':')) {
            params.push(keyToken);
            return node.finishProperty('init', key, false, key, false, true);
          }
        } else {
          key = parseObjectPropertyKey(params);
        }
        expect(':');
        init = parsePatternWithDefault(params);
        return node.finishProperty('init', key, computed, init, false, false);
      }
      function parseObjectPattern(params) {
        var node = new Node(),
            properties = [];
        expect('{');
        while (!match('}')) {
          properties.push(parsePropertyPattern(params));
          if (!match('}')) {
            expect(',');
          }
        }
        lex();
        return node.finishObjectPattern(properties);
      }
      function parsePattern(params) {
        var identifier;
        if (lookahead.type === Token.Identifier) {
          params.push(lookahead);
          identifier = parseVariableIdentifier();
          return identifier;
        } else if (match('[')) {
          return parseArrayPattern(params);
        } else if (match('{')) {
          return parseObjectPattern(params);
        }
        throwUnexpectedToken(lookahead);
      }
      function parsePatternWithDefault(params) {
        var startToken = lookahead,
            pattern,
            right;
        pattern = parsePattern(params);
        if (match('=')) {
          lex();
          right = isolateCoverGrammar(parseAssignmentExpression);
          pattern = new WrappingNode(startToken).finishAssignmentPattern(pattern, right);
        }
        return pattern;
      }
      function parseArrayInitialiser() {
        var elements = [],
            node = new Node(),
            restSpread;
        expect('[');
        while (!match(']')) {
          if (match(',')) {
            lex();
            elements.push(null);
          } else if (match('...')) {
            restSpread = new Node();
            lex();
            restSpread.finishSpreadElement(inheritCoverGrammar(parseAssignmentExpression));
            if (!match(']')) {
              isAssignmentTarget = isBindingElement = false;
              expect(',');
            }
            elements.push(restSpread);
          } else {
            elements.push(inheritCoverGrammar(parseAssignmentExpression));
            if (!match(']')) {
              expect(',');
            }
          }
        }
        lex();
        return node.finishArrayExpression(elements);
      }
      function parsePropertyFunction(node, paramInfo, isGenerator) {
        var previousStrict,
            body;
        isAssignmentTarget = isBindingElement = false;
        previousStrict = strict;
        body = isolateCoverGrammar(parseFunctionSourceElements);
        if (strict && paramInfo.firstRestricted) {
          tolerateUnexpectedToken(paramInfo.firstRestricted, paramInfo.message);
        }
        if (strict && paramInfo.stricted) {
          tolerateUnexpectedToken(paramInfo.stricted, paramInfo.message);
        }
        strict = previousStrict;
        return node.finishFunctionExpression(null, paramInfo.params, paramInfo.defaults, body, isGenerator);
      }
      function parsePropertyMethodFunction() {
        var params,
            method,
            node = new Node(),
            previousAllowYield = state.allowYield;
        state.allowYield = false;
        params = parseParams();
        state.allowYield = previousAllowYield;
        state.allowYield = false;
        method = parsePropertyFunction(node, params, false);
        state.allowYield = previousAllowYield;
        return method;
      }
      function parseObjectPropertyKey() {
        var token,
            node = new Node(),
            expr;
        token = lex();
        switch (token.type) {
          case Token.StringLiteral:
          case Token.NumericLiteral:
            if (strict && token.octal) {
              tolerateUnexpectedToken(token, Messages.StrictOctalLiteral);
            }
            return node.finishLiteral(token);
          case Token.Identifier:
          case Token.BooleanLiteral:
          case Token.NullLiteral:
          case Token.Keyword:
            return node.finishIdentifier(token.value);
          case Token.Punctuator:
            if (token.value === '[') {
              expr = isolateCoverGrammar(parseAssignmentExpression);
              expect(']');
              return expr;
            }
            break;
        }
        throwUnexpectedToken(token);
      }
      function lookaheadPropertyName() {
        switch (lookahead.type) {
          case Token.Identifier:
          case Token.StringLiteral:
          case Token.BooleanLiteral:
          case Token.NullLiteral:
          case Token.NumericLiteral:
          case Token.Keyword:
            return true;
          case Token.Punctuator:
            return lookahead.value === '[';
        }
        return false;
      }
      function tryParseMethodDefinition(token, key, computed, node) {
        var value,
            options,
            methodNode,
            params,
            previousAllowYield = state.allowYield;
        if (token.type === Token.Identifier) {
          if (token.value === 'get' && lookaheadPropertyName()) {
            computed = match('[');
            key = parseObjectPropertyKey();
            methodNode = new Node();
            expect('(');
            expect(')');
            state.allowYield = false;
            value = parsePropertyFunction(methodNode, {
              params: [],
              defaults: [],
              stricted: null,
              firstRestricted: null,
              message: null
            }, false);
            state.allowYield = previousAllowYield;
            return node.finishProperty('get', key, computed, value, false, false);
          } else if (token.value === 'set' && lookaheadPropertyName()) {
            computed = match('[');
            key = parseObjectPropertyKey();
            methodNode = new Node();
            expect('(');
            options = {
              params: [],
              defaultCount: 0,
              defaults: [],
              firstRestricted: null,
              paramSet: {}
            };
            if (match(')')) {
              tolerateUnexpectedToken(lookahead);
            } else {
              state.allowYield = false;
              parseParam(options);
              state.allowYield = previousAllowYield;
              if (options.defaultCount === 0) {
                options.defaults = [];
              }
            }
            expect(')');
            state.allowYield = false;
            value = parsePropertyFunction(methodNode, options, false);
            state.allowYield = previousAllowYield;
            return node.finishProperty('set', key, computed, value, false, false);
          }
        } else if (token.type === Token.Punctuator && token.value === '*' && lookaheadPropertyName()) {
          computed = match('[');
          key = parseObjectPropertyKey();
          methodNode = new Node();
          state.allowYield = false;
          params = parseParams();
          state.allowYield = previousAllowYield;
          state.allowYield = true;
          value = parsePropertyFunction(methodNode, params, true);
          state.allowYield = previousAllowYield;
          return node.finishProperty('init', key, computed, value, true, false);
        }
        if (key && match('(')) {
          value = parsePropertyMethodFunction();
          return node.finishProperty('init', key, computed, value, true, false);
        }
        return null;
      }
      function checkProto(key, computed, hasProto) {
        if (computed === false && (key.type === Syntax.Identifier && key.name === '__proto__' || key.type === Syntax.Literal && key.value === '__proto__')) {
          if (hasProto.value) {
            tolerateError(Messages.DuplicateProtoProperty);
          } else {
            hasProto.value = true;
          }
        }
      }
      function parseObjectProperty(hasProto) {
        var token = lookahead,
            node = new Node(),
            computed,
            key,
            maybeMethod,
            value;
        computed = match('[');
        if (match('*')) {
          lex();
        } else {
          key = parseObjectPropertyKey();
        }
        maybeMethod = tryParseMethodDefinition(token, key, computed, node);
        if (maybeMethod) {
          checkProto(maybeMethod.key, maybeMethod.computed, hasProto);
          return maybeMethod;
        }
        if (!key) {
          throwUnexpectedToken(lookahead);
        }
        checkProto(key, computed, hasProto);
        if (match(':')) {
          lex();
          value = inheritCoverGrammar(parseAssignmentExpression);
          return node.finishProperty('init', key, computed, value, false, false);
        }
        if (token.type === Token.Identifier) {
          if (match('=')) {
            firstCoverInitializedNameError = lookahead;
            lex();
            value = isolateCoverGrammar(parseAssignmentExpression);
            return node.finishProperty('init', key, computed, new WrappingNode(token).finishAssignmentPattern(key, value), false, true);
          }
          return node.finishProperty('init', key, computed, key, false, true);
        }
        throwUnexpectedToken(lookahead);
      }
      function parseObjectInitialiser() {
        var properties = [],
            hasProto = {value: false},
            node = new Node();
        expect('{');
        while (!match('}')) {
          properties.push(parseObjectProperty(hasProto));
          if (!match('}')) {
            expectCommaSeparator();
          }
        }
        expect('}');
        return node.finishObjectExpression(properties);
      }
      function reinterpretExpressionAsPattern(expr) {
        var i;
        switch (expr.type) {
          case Syntax.Identifier:
          case Syntax.MemberExpression:
          case Syntax.RestElement:
          case Syntax.AssignmentPattern:
            break;
          case Syntax.SpreadElement:
            expr.type = Syntax.RestElement;
            reinterpretExpressionAsPattern(expr.argument);
            break;
          case Syntax.ArrayExpression:
            expr.type = Syntax.ArrayPattern;
            for (i = 0; i < expr.elements.length; i++) {
              if (expr.elements[i] !== null) {
                reinterpretExpressionAsPattern(expr.elements[i]);
              }
            }
            break;
          case Syntax.ObjectExpression:
            expr.type = Syntax.ObjectPattern;
            for (i = 0; i < expr.properties.length; i++) {
              reinterpretExpressionAsPattern(expr.properties[i].value);
            }
            break;
          case Syntax.AssignmentExpression:
            expr.type = Syntax.AssignmentPattern;
            reinterpretExpressionAsPattern(expr.left);
            break;
          default:
            break;
        }
      }
      function parseTemplateElement(option) {
        var node,
            token;
        if (lookahead.type !== Token.Template || (option.head && !lookahead.head)) {
          throwUnexpectedToken();
        }
        node = new Node();
        token = lex();
        return node.finishTemplateElement({
          raw: token.value.raw,
          cooked: token.value.cooked
        }, token.tail);
      }
      function parseTemplateLiteral() {
        var quasi,
            quasis,
            expressions,
            node = new Node();
        quasi = parseTemplateElement({head: true});
        quasis = [quasi];
        expressions = [];
        while (!quasi.tail) {
          expressions.push(parseExpression());
          quasi = parseTemplateElement({head: false});
          quasis.push(quasi);
        }
        return node.finishTemplateLiteral(quasis, expressions);
      }
      function parseGroupExpression() {
        var expr,
            expressions,
            startToken,
            i,
            params = [];
        expect('(');
        if (match(')')) {
          lex();
          if (!match('=>')) {
            expect('=>');
          }
          return {
            type: PlaceHolders.ArrowParameterPlaceHolder,
            params: [],
            rawParams: []
          };
        }
        startToken = lookahead;
        if (match('...')) {
          expr = parseRestElement(params);
          expect(')');
          if (!match('=>')) {
            expect('=>');
          }
          return {
            type: PlaceHolders.ArrowParameterPlaceHolder,
            params: [expr]
          };
        }
        isBindingElement = true;
        expr = inheritCoverGrammar(parseAssignmentExpression);
        if (match(',')) {
          isAssignmentTarget = false;
          expressions = [expr];
          while (startIndex < length) {
            if (!match(',')) {
              break;
            }
            lex();
            if (match('...')) {
              if (!isBindingElement) {
                throwUnexpectedToken(lookahead);
              }
              expressions.push(parseRestElement(params));
              expect(')');
              if (!match('=>')) {
                expect('=>');
              }
              isBindingElement = false;
              for (i = 0; i < expressions.length; i++) {
                reinterpretExpressionAsPattern(expressions[i]);
              }
              return {
                type: PlaceHolders.ArrowParameterPlaceHolder,
                params: expressions
              };
            }
            expressions.push(inheritCoverGrammar(parseAssignmentExpression));
          }
          expr = new WrappingNode(startToken).finishSequenceExpression(expressions);
        }
        expect(')');
        if (match('=>')) {
          if (!isBindingElement) {
            throwUnexpectedToken(lookahead);
          }
          if (expr.type === Syntax.SequenceExpression) {
            for (i = 0; i < expr.expressions.length; i++) {
              reinterpretExpressionAsPattern(expr.expressions[i]);
            }
          } else {
            reinterpretExpressionAsPattern(expr);
          }
          expr = {
            type: PlaceHolders.ArrowParameterPlaceHolder,
            params: expr.type === Syntax.SequenceExpression ? expr.expressions : [expr]
          };
        }
        isBindingElement = false;
        return expr;
      }
      function parsePrimaryExpression() {
        var type,
            token,
            expr,
            node;
        if (match('(')) {
          isBindingElement = false;
          return inheritCoverGrammar(parseGroupExpression);
        }
        if (match('[')) {
          return inheritCoverGrammar(parseArrayInitialiser);
        }
        if (match('{')) {
          return inheritCoverGrammar(parseObjectInitialiser);
        }
        type = lookahead.type;
        node = new Node();
        if (type === Token.Identifier) {
          expr = node.finishIdentifier(lex().value);
        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
          isAssignmentTarget = isBindingElement = false;
          if (strict && lookahead.octal) {
            tolerateUnexpectedToken(lookahead, Messages.StrictOctalLiteral);
          }
          expr = node.finishLiteral(lex());
        } else if (type === Token.Keyword) {
          isAssignmentTarget = isBindingElement = false;
          if (matchKeyword('function')) {
            return parseFunctionExpression();
          }
          if (matchKeyword('this')) {
            lex();
            return node.finishThisExpression();
          }
          if (matchKeyword('class')) {
            return parseClassExpression();
          }
          throwUnexpectedToken(lex());
        } else if (type === Token.BooleanLiteral) {
          isAssignmentTarget = isBindingElement = false;
          token = lex();
          token.value = (token.value === 'true');
          expr = node.finishLiteral(token);
        } else if (type === Token.NullLiteral) {
          isAssignmentTarget = isBindingElement = false;
          token = lex();
          token.value = null;
          expr = node.finishLiteral(token);
        } else if (match('/') || match('/=')) {
          isAssignmentTarget = isBindingElement = false;
          index = startIndex;
          if (typeof extra.tokens !== 'undefined') {
            token = collectRegex();
          } else {
            token = scanRegExp();
          }
          lex();
          expr = node.finishLiteral(token);
        } else if (type === Token.Template) {
          expr = parseTemplateLiteral();
        } else {
          throwUnexpectedToken(lex());
        }
        return expr;
      }
      function parseArguments() {
        var args = [],
            expr;
        expect('(');
        if (!match(')')) {
          while (startIndex < length) {
            if (match('...')) {
              expr = new Node();
              lex();
              expr.finishSpreadElement(isolateCoverGrammar(parseAssignmentExpression));
            } else {
              expr = isolateCoverGrammar(parseAssignmentExpression);
            }
            args.push(expr);
            if (match(')')) {
              break;
            }
            expectCommaSeparator();
          }
        }
        expect(')');
        return args;
      }
      function parseNonComputedProperty() {
        var token,
            node = new Node();
        token = lex();
        if (!isIdentifierName(token)) {
          throwUnexpectedToken(token);
        }
        return node.finishIdentifier(token.value);
      }
      function parseNonComputedMember() {
        expect('.');
        return parseNonComputedProperty();
      }
      function parseComputedMember() {
        var expr;
        expect('[');
        expr = isolateCoverGrammar(parseExpression);
        expect(']');
        return expr;
      }
      function parseNewExpression() {
        var callee,
            args,
            node = new Node();
        expectKeyword('new');
        callee = isolateCoverGrammar(parseLeftHandSideExpression);
        args = match('(') ? parseArguments() : [];
        isAssignmentTarget = isBindingElement = false;
        return node.finishNewExpression(callee, args);
      }
      function parseLeftHandSideExpressionAllowCall() {
        var quasi,
            expr,
            args,
            property,
            startToken,
            previousAllowIn = state.allowIn;
        startToken = lookahead;
        state.allowIn = true;
        if (matchKeyword('super') && state.inFunctionBody) {
          expr = new Node();
          lex();
          expr = expr.finishSuper();
          if (!match('(') && !match('.') && !match('[')) {
            throwUnexpectedToken(lookahead);
          }
        } else {
          expr = inheritCoverGrammar(matchKeyword('new') ? parseNewExpression : parsePrimaryExpression);
        }
        for (; ; ) {
          if (match('.')) {
            isBindingElement = false;
            isAssignmentTarget = true;
            property = parseNonComputedMember();
            expr = new WrappingNode(startToken).finishMemberExpression('.', expr, property);
          } else if (match('(')) {
            isBindingElement = false;
            isAssignmentTarget = false;
            args = parseArguments();
            expr = new WrappingNode(startToken).finishCallExpression(expr, args);
          } else if (match('[')) {
            isBindingElement = false;
            isAssignmentTarget = true;
            property = parseComputedMember();
            expr = new WrappingNode(startToken).finishMemberExpression('[', expr, property);
          } else if (lookahead.type === Token.Template && lookahead.head) {
            quasi = parseTemplateLiteral();
            expr = new WrappingNode(startToken).finishTaggedTemplateExpression(expr, quasi);
          } else {
            break;
          }
        }
        state.allowIn = previousAllowIn;
        return expr;
      }
      function parseLeftHandSideExpression() {
        var quasi,
            expr,
            property,
            startToken;
        assert(state.allowIn, 'callee of new expression always allow in keyword.');
        startToken = lookahead;
        if (matchKeyword('super') && state.inFunctionBody) {
          expr = new Node();
          lex();
          expr = expr.finishSuper();
          if (!match('[') && !match('.')) {
            throwUnexpectedToken(lookahead);
          }
        } else {
          expr = inheritCoverGrammar(matchKeyword('new') ? parseNewExpression : parsePrimaryExpression);
        }
        for (; ; ) {
          if (match('[')) {
            isBindingElement = false;
            isAssignmentTarget = true;
            property = parseComputedMember();
            expr = new WrappingNode(startToken).finishMemberExpression('[', expr, property);
          } else if (match('.')) {
            isBindingElement = false;
            isAssignmentTarget = true;
            property = parseNonComputedMember();
            expr = new WrappingNode(startToken).finishMemberExpression('.', expr, property);
          } else if (lookahead.type === Token.Template && lookahead.head) {
            quasi = parseTemplateLiteral();
            expr = new WrappingNode(startToken).finishTaggedTemplateExpression(expr, quasi);
          } else {
            break;
          }
        }
        return expr;
      }
      function parsePostfixExpression() {
        var expr,
            token,
            startToken = lookahead;
        expr = inheritCoverGrammar(parseLeftHandSideExpressionAllowCall);
        if (!hasLineTerminator && lookahead.type === Token.Punctuator) {
          if (match('++') || match('--')) {
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
              tolerateError(Messages.StrictLHSPostfix);
            }
            if (!isAssignmentTarget) {
              tolerateError(Messages.InvalidLHSInAssignment);
            }
            isAssignmentTarget = isBindingElement = false;
            token = lex();
            expr = new WrappingNode(startToken).finishPostfixExpression(token.value, expr);
          }
        }
        return expr;
      }
      function parseUnaryExpression() {
        var token,
            expr,
            startToken;
        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
          expr = parsePostfixExpression();
        } else if (match('++') || match('--')) {
          startToken = lookahead;
          token = lex();
          expr = inheritCoverGrammar(parseUnaryExpression);
          if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
            tolerateError(Messages.StrictLHSPrefix);
          }
          if (!isAssignmentTarget) {
            tolerateError(Messages.InvalidLHSInAssignment);
          }
          expr = new WrappingNode(startToken).finishUnaryExpression(token.value, expr);
          isAssignmentTarget = isBindingElement = false;
        } else if (match('+') || match('-') || match('~') || match('!')) {
          startToken = lookahead;
          token = lex();
          expr = inheritCoverGrammar(parseUnaryExpression);
          expr = new WrappingNode(startToken).finishUnaryExpression(token.value, expr);
          isAssignmentTarget = isBindingElement = false;
        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
          startToken = lookahead;
          token = lex();
          expr = inheritCoverGrammar(parseUnaryExpression);
          expr = new WrappingNode(startToken).finishUnaryExpression(token.value, expr);
          if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
            tolerateError(Messages.StrictDelete);
          }
          isAssignmentTarget = isBindingElement = false;
        } else {
          expr = parsePostfixExpression();
        }
        return expr;
      }
      function binaryPrecedence(token, allowIn) {
        var prec = 0;
        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
          return 0;
        }
        switch (token.value) {
          case '||':
            prec = 1;
            break;
          case '&&':
            prec = 2;
            break;
          case '|':
            prec = 3;
            break;
          case '^':
            prec = 4;
            break;
          case '&':
            prec = 5;
            break;
          case '==':
          case '!=':
          case '===':
          case '!==':
            prec = 6;
            break;
          case '<':
          case '>':
          case '<=':
          case '>=':
          case 'instanceof':
            prec = 7;
            break;
          case 'in':
            prec = allowIn ? 7 : 0;
            break;
          case '<<':
          case '>>':
          case '>>>':
            prec = 8;
            break;
          case '+':
          case '-':
            prec = 9;
            break;
          case '*':
          case '/':
          case '%':
            prec = 11;
            break;
          default:
            break;
        }
        return prec;
      }
      function parseBinaryExpression() {
        var marker,
            markers,
            expr,
            token,
            prec,
            stack,
            right,
            operator,
            left,
            i;
        marker = lookahead;
        left = inheritCoverGrammar(parseUnaryExpression);
        token = lookahead;
        prec = binaryPrecedence(token, state.allowIn);
        if (prec === 0) {
          return left;
        }
        isAssignmentTarget = isBindingElement = false;
        token.prec = prec;
        lex();
        markers = [marker, lookahead];
        right = isolateCoverGrammar(parseUnaryExpression);
        stack = [left, token, right];
        while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
          while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
            right = stack.pop();
            operator = stack.pop().value;
            left = stack.pop();
            markers.pop();
            expr = new WrappingNode(markers[markers.length - 1]).finishBinaryExpression(operator, left, right);
            stack.push(expr);
          }
          token = lex();
          token.prec = prec;
          stack.push(token);
          markers.push(lookahead);
          expr = isolateCoverGrammar(parseUnaryExpression);
          stack.push(expr);
        }
        i = stack.length - 1;
        expr = stack[i];
        markers.pop();
        while (i > 1) {
          expr = new WrappingNode(markers.pop()).finishBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
          i -= 2;
        }
        return expr;
      }
      function parseConditionalExpression() {
        var expr,
            previousAllowIn,
            consequent,
            alternate,
            startToken;
        startToken = lookahead;
        expr = inheritCoverGrammar(parseBinaryExpression);
        if (match('?')) {
          lex();
          previousAllowIn = state.allowIn;
          state.allowIn = true;
          consequent = isolateCoverGrammar(parseAssignmentExpression);
          state.allowIn = previousAllowIn;
          expect(':');
          alternate = isolateCoverGrammar(parseAssignmentExpression);
          expr = new WrappingNode(startToken).finishConditionalExpression(expr, consequent, alternate);
          isAssignmentTarget = isBindingElement = false;
        }
        return expr;
      }
      function parseConciseBody() {
        if (match('{')) {
          return parseFunctionSourceElements();
        }
        return isolateCoverGrammar(parseAssignmentExpression);
      }
      function checkPatternParam(options, param) {
        var i;
        switch (param.type) {
          case Syntax.Identifier:
            validateParam(options, param, param.name);
            break;
          case Syntax.RestElement:
            checkPatternParam(options, param.argument);
            break;
          case Syntax.AssignmentPattern:
            checkPatternParam(options, param.left);
            break;
          case Syntax.ArrayPattern:
            for (i = 0; i < param.elements.length; i++) {
              if (param.elements[i] !== null) {
                checkPatternParam(options, param.elements[i]);
              }
            }
            break;
          default:
            assert(param.type === Syntax.ObjectPattern, 'Invalid type');
            for (i = 0; i < param.properties.length; i++) {
              checkPatternParam(options, param.properties[i].value);
            }
            break;
        }
      }
      function reinterpretAsCoverFormalsList(expr) {
        var i,
            len,
            param,
            params,
            defaults,
            defaultCount,
            options,
            token;
        defaults = [];
        defaultCount = 0;
        params = [expr];
        switch (expr.type) {
          case Syntax.Identifier:
            break;
          case PlaceHolders.ArrowParameterPlaceHolder:
            params = expr.params;
            break;
          default:
            return null;
        }
        options = {paramSet: {}};
        for (i = 0, len = params.length; i < len; i += 1) {
          param = params[i];
          switch (param.type) {
            case Syntax.AssignmentPattern:
              params[i] = param.left;
              defaults.push(param.right);
              ++defaultCount;
              checkPatternParam(options, param.left);
              break;
            default:
              checkPatternParam(options, param);
              params[i] = param;
              defaults.push(null);
              break;
          }
        }
        if (options.message === Messages.StrictParamDupe) {
          token = strict ? options.stricted : options.firstRestricted;
          throwUnexpectedToken(token, options.message);
        }
        if (defaultCount === 0) {
          defaults = [];
        }
        return {
          params: params,
          defaults: defaults,
          stricted: options.stricted,
          firstRestricted: options.firstRestricted,
          message: options.message
        };
      }
      function parseArrowFunctionExpression(options, node) {
        var previousStrict,
            body;
        if (hasLineTerminator) {
          tolerateUnexpectedToken(lookahead);
        }
        expect('=>');
        previousStrict = strict;
        body = parseConciseBody();
        if (strict && options.firstRestricted) {
          throwUnexpectedToken(options.firstRestricted, options.message);
        }
        if (strict && options.stricted) {
          tolerateUnexpectedToken(options.stricted, options.message);
        }
        strict = previousStrict;
        return node.finishArrowFunctionExpression(options.params, options.defaults, body, body.type !== Syntax.BlockStatement);
      }
      function parseYieldExpression() {
        var argument,
            expr,
            delegate;
        expr = new Node();
        if (!state.allowYield) {
          tolerateUnexpectedToken(lookahead, Messages.IllegalYield);
        }
        expectKeyword('yield');
        if (!hasLineTerminator) {
          delegate = match('*');
          if (delegate) {
            lex();
            argument = parseExpression();
          } else {
            if (!match(';') && !match('}') && lookahead.type !== Token.EOF) {
              argument = parseExpression();
            }
          }
        }
        return expr.finishYieldExpression(argument, delegate);
      }
      function parseAssignmentExpression() {
        var token,
            expr,
            right,
            list,
            startToken;
        startToken = lookahead;
        token = lookahead;
        if (matchKeyword('yield')) {
          return parseYieldExpression();
        }
        expr = parseConditionalExpression();
        if (expr.type === PlaceHolders.ArrowParameterPlaceHolder || match('=>')) {
          isAssignmentTarget = isBindingElement = false;
          list = reinterpretAsCoverFormalsList(expr);
          if (list) {
            firstCoverInitializedNameError = null;
            return parseArrowFunctionExpression(list, new WrappingNode(startToken));
          }
          return expr;
        }
        if (matchAssign()) {
          if (!isAssignmentTarget) {
            tolerateError(Messages.InvalidLHSInAssignment);
          }
          if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
            tolerateUnexpectedToken(token, Messages.StrictLHSAssignment);
          }
          if (!match('=')) {
            isAssignmentTarget = isBindingElement = false;
          } else {
            reinterpretExpressionAsPattern(expr);
          }
          token = lex();
          right = isolateCoverGrammar(parseAssignmentExpression);
          expr = new WrappingNode(startToken).finishAssignmentExpression(token.value, expr, right);
          firstCoverInitializedNameError = null;
        }
        return expr;
      }
      function parseExpression() {
        var expr,
            startToken = lookahead,
            expressions;
        expr = isolateCoverGrammar(parseAssignmentExpression);
        if (match(',')) {
          expressions = [expr];
          while (startIndex < length) {
            if (!match(',')) {
              break;
            }
            lex();
            expressions.push(isolateCoverGrammar(parseAssignmentExpression));
          }
          expr = new WrappingNode(startToken).finishSequenceExpression(expressions);
        }
        return expr;
      }
      function parseStatementListItem() {
        if (lookahead.type === Token.Keyword) {
          switch (lookahead.value) {
            case 'export':
              if (sourceType !== 'module') {
                tolerateUnexpectedToken(lookahead, Messages.IllegalExportDeclaration);
              }
              return parseExportDeclaration();
            case 'import':
              if (sourceType !== 'module') {
                tolerateUnexpectedToken(lookahead, Messages.IllegalImportDeclaration);
              }
              return parseImportDeclaration();
            case 'const':
            case 'let':
              return parseLexicalDeclaration({inFor: false});
            case 'function':
              return parseFunctionDeclaration(new Node());
            case 'class':
              return parseClassDeclaration();
          }
        }
        return parseStatement();
      }
      function parseStatementList() {
        var list = [];
        while (startIndex < length) {
          if (match('}')) {
            break;
          }
          list.push(parseStatementListItem());
        }
        return list;
      }
      function parseBlock() {
        var block,
            node = new Node();
        expect('{');
        block = parseStatementList();
        expect('}');
        return node.finishBlockStatement(block);
      }
      function parseVariableIdentifier() {
        var token,
            node = new Node();
        token = lex();
        if (token.type !== Token.Identifier) {
          if (strict && token.type === Token.Keyword && isStrictModeReservedWord(token.value)) {
            tolerateUnexpectedToken(token, Messages.StrictReservedWord);
          } else {
            throwUnexpectedToken(token);
          }
        }
        return node.finishIdentifier(token.value);
      }
      function parseVariableDeclaration() {
        var init = null,
            id,
            node = new Node(),
            params = [];
        id = parsePattern(params);
        if (strict && isRestrictedWord(id.name)) {
          tolerateError(Messages.StrictVarName);
        }
        if (match('=')) {
          lex();
          init = isolateCoverGrammar(parseAssignmentExpression);
        } else if (id.type !== Syntax.Identifier) {
          expect('=');
        }
        return node.finishVariableDeclarator(id, init);
      }
      function parseVariableDeclarationList() {
        var list = [];
        do {
          list.push(parseVariableDeclaration());
          if (!match(',')) {
            break;
          }
          lex();
        } while (startIndex < length);
        return list;
      }
      function parseVariableStatement(node) {
        var declarations;
        expectKeyword('var');
        declarations = parseVariableDeclarationList();
        consumeSemicolon();
        return node.finishVariableDeclaration(declarations);
      }
      function parseLexicalBinding(kind, options) {
        var init = null,
            id,
            node = new Node(),
            params = [];
        id = parsePattern(params);
        if (strict && id.type === Syntax.Identifier && isRestrictedWord(id.name)) {
          tolerateError(Messages.StrictVarName);
        }
        if (kind === 'const') {
          if (!matchKeyword('in') && !matchContextualKeyword('of')) {
            expect('=');
            init = isolateCoverGrammar(parseAssignmentExpression);
          }
        } else if ((!options.inFor && id.type !== Syntax.Identifier) || match('=')) {
          expect('=');
          init = isolateCoverGrammar(parseAssignmentExpression);
        }
        return node.finishVariableDeclarator(id, init);
      }
      function parseBindingList(kind, options) {
        var list = [];
        do {
          list.push(parseLexicalBinding(kind, options));
          if (!match(',')) {
            break;
          }
          lex();
        } while (startIndex < length);
        return list;
      }
      function parseLexicalDeclaration(options) {
        var kind,
            declarations,
            node = new Node();
        kind = lex().value;
        assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
        declarations = parseBindingList(kind, options);
        consumeSemicolon();
        return node.finishLexicalDeclaration(declarations, kind);
      }
      function parseRestElement(params) {
        var param,
            node = new Node();
        lex();
        if (match('{')) {
          throwError(Messages.ObjectPatternAsRestParameter);
        }
        params.push(lookahead);
        param = parseVariableIdentifier();
        if (match('=')) {
          throwError(Messages.DefaultRestParameter);
        }
        if (!match(')')) {
          throwError(Messages.ParameterAfterRestParameter);
        }
        return node.finishRestElement(param);
      }
      function parseEmptyStatement(node) {
        expect(';');
        return node.finishEmptyStatement();
      }
      function parseExpressionStatement(node) {
        var expr = parseExpression();
        consumeSemicolon();
        return node.finishExpressionStatement(expr);
      }
      function parseIfStatement(node) {
        var test,
            consequent,
            alternate;
        expectKeyword('if');
        expect('(');
        test = parseExpression();
        expect(')');
        consequent = parseStatement();
        if (matchKeyword('else')) {
          lex();
          alternate = parseStatement();
        } else {
          alternate = null;
        }
        return node.finishIfStatement(test, consequent, alternate);
      }
      function parseDoWhileStatement(node) {
        var body,
            test,
            oldInIteration;
        expectKeyword('do');
        oldInIteration = state.inIteration;
        state.inIteration = true;
        body = parseStatement();
        state.inIteration = oldInIteration;
        expectKeyword('while');
        expect('(');
        test = parseExpression();
        expect(')');
        if (match(';')) {
          lex();
        }
        return node.finishDoWhileStatement(body, test);
      }
      function parseWhileStatement(node) {
        var test,
            body,
            oldInIteration;
        expectKeyword('while');
        expect('(');
        test = parseExpression();
        expect(')');
        oldInIteration = state.inIteration;
        state.inIteration = true;
        body = parseStatement();
        state.inIteration = oldInIteration;
        return node.finishWhileStatement(test, body);
      }
      function parseForStatement(node) {
        var init,
            forIn,
            initSeq,
            initStartToken,
            test,
            update,
            left,
            right,
            kind,
            declarations,
            body,
            oldInIteration,
            previousAllowIn = state.allowIn;
        init = test = update = null;
        forIn = true;
        expectKeyword('for');
        expect('(');
        if (match(';')) {
          lex();
        } else {
          if (matchKeyword('var')) {
            init = new Node();
            lex();
            state.allowIn = false;
            init = init.finishVariableDeclaration(parseVariableDeclarationList());
            state.allowIn = previousAllowIn;
            if (init.declarations.length === 1 && matchKeyword('in')) {
              lex();
              left = init;
              right = parseExpression();
              init = null;
            } else if (init.declarations.length === 1 && init.declarations[0].init === null && matchContextualKeyword('of')) {
              lex();
              left = init;
              right = parseAssignmentExpression();
              init = null;
              forIn = false;
            } else {
              expect(';');
            }
          } else if (matchKeyword('const') || matchKeyword('let')) {
            init = new Node();
            kind = lex().value;
            state.allowIn = false;
            declarations = parseBindingList(kind, {inFor: true});
            state.allowIn = previousAllowIn;
            if (declarations.length === 1 && declarations[0].init === null && matchKeyword('in')) {
              init = init.finishLexicalDeclaration(declarations, kind);
              lex();
              left = init;
              right = parseExpression();
              init = null;
            } else if (declarations.length === 1 && declarations[0].init === null && matchContextualKeyword('of')) {
              init = init.finishLexicalDeclaration(declarations, kind);
              lex();
              left = init;
              right = parseAssignmentExpression();
              init = null;
              forIn = false;
            } else {
              consumeSemicolon();
              init = init.finishLexicalDeclaration(declarations, kind);
            }
          } else {
            initStartToken = lookahead;
            state.allowIn = false;
            init = inheritCoverGrammar(parseAssignmentExpression);
            state.allowIn = previousAllowIn;
            if (matchKeyword('in')) {
              if (!isAssignmentTarget) {
                tolerateError(Messages.InvalidLHSInForIn);
              }
              lex();
              reinterpretExpressionAsPattern(init);
              left = init;
              right = parseExpression();
              init = null;
            } else if (matchContextualKeyword('of')) {
              if (!isAssignmentTarget) {
                tolerateError(Messages.InvalidLHSInForLoop);
              }
              lex();
              reinterpretExpressionAsPattern(init);
              left = init;
              right = parseAssignmentExpression();
              init = null;
              forIn = false;
            } else {
              if (match(',')) {
                initSeq = [init];
                while (match(',')) {
                  lex();
                  initSeq.push(isolateCoverGrammar(parseAssignmentExpression));
                }
                init = new WrappingNode(initStartToken).finishSequenceExpression(initSeq);
              }
              expect(';');
            }
          }
        }
        if (typeof left === 'undefined') {
          if (!match(';')) {
            test = parseExpression();
          }
          expect(';');
          if (!match(')')) {
            update = parseExpression();
          }
        }
        expect(')');
        oldInIteration = state.inIteration;
        state.inIteration = true;
        body = isolateCoverGrammar(parseStatement);
        state.inIteration = oldInIteration;
        return (typeof left === 'undefined') ? node.finishForStatement(init, test, update, body) : forIn ? node.finishForInStatement(left, right, body) : node.finishForOfStatement(left, right, body);
      }
      function parseContinueStatement(node) {
        var label = null,
            key;
        expectKeyword('continue');
        if (source.charCodeAt(startIndex) === 0x3B) {
          lex();
          if (!state.inIteration) {
            throwError(Messages.IllegalContinue);
          }
          return node.finishContinueStatement(null);
        }
        if (hasLineTerminator) {
          if (!state.inIteration) {
            throwError(Messages.IllegalContinue);
          }
          return node.finishContinueStatement(null);
        }
        if (lookahead.type === Token.Identifier) {
          label = parseVariableIdentifier();
          key = '$' + label.name;
          if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
            throwError(Messages.UnknownLabel, label.name);
          }
        }
        consumeSemicolon();
        if (label === null && !state.inIteration) {
          throwError(Messages.IllegalContinue);
        }
        return node.finishContinueStatement(label);
      }
      function parseBreakStatement(node) {
        var label = null,
            key;
        expectKeyword('break');
        if (source.charCodeAt(lastIndex) === 0x3B) {
          lex();
          if (!(state.inIteration || state.inSwitch)) {
            throwError(Messages.IllegalBreak);
          }
          return node.finishBreakStatement(null);
        }
        if (hasLineTerminator) {
          if (!(state.inIteration || state.inSwitch)) {
            throwError(Messages.IllegalBreak);
          }
          return node.finishBreakStatement(null);
        }
        if (lookahead.type === Token.Identifier) {
          label = parseVariableIdentifier();
          key = '$' + label.name;
          if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
            throwError(Messages.UnknownLabel, label.name);
          }
        }
        consumeSemicolon();
        if (label === null && !(state.inIteration || state.inSwitch)) {
          throwError(Messages.IllegalBreak);
        }
        return node.finishBreakStatement(label);
      }
      function parseReturnStatement(node) {
        var argument = null;
        expectKeyword('return');
        if (!state.inFunctionBody) {
          tolerateError(Messages.IllegalReturn);
        }
        if (source.charCodeAt(lastIndex) === 0x20) {
          if (isIdentifierStart(source.charCodeAt(lastIndex + 1))) {
            argument = parseExpression();
            consumeSemicolon();
            return node.finishReturnStatement(argument);
          }
        }
        if (hasLineTerminator) {
          return node.finishReturnStatement(null);
        }
        if (!match(';')) {
          if (!match('}') && lookahead.type !== Token.EOF) {
            argument = parseExpression();
          }
        }
        consumeSemicolon();
        return node.finishReturnStatement(argument);
      }
      function parseWithStatement(node) {
        var object,
            body;
        if (strict) {
          tolerateError(Messages.StrictModeWith);
        }
        expectKeyword('with');
        expect('(');
        object = parseExpression();
        expect(')');
        body = parseStatement();
        return node.finishWithStatement(object, body);
      }
      function parseSwitchCase() {
        var test,
            consequent = [],
            statement,
            node = new Node();
        if (matchKeyword('default')) {
          lex();
          test = null;
        } else {
          expectKeyword('case');
          test = parseExpression();
        }
        expect(':');
        while (startIndex < length) {
          if (match('}') || matchKeyword('default') || matchKeyword('case')) {
            break;
          }
          statement = parseStatementListItem();
          consequent.push(statement);
        }
        return node.finishSwitchCase(test, consequent);
      }
      function parseSwitchStatement(node) {
        var discriminant,
            cases,
            clause,
            oldInSwitch,
            defaultFound;
        expectKeyword('switch');
        expect('(');
        discriminant = parseExpression();
        expect(')');
        expect('{');
        cases = [];
        if (match('}')) {
          lex();
          return node.finishSwitchStatement(discriminant, cases);
        }
        oldInSwitch = state.inSwitch;
        state.inSwitch = true;
        defaultFound = false;
        while (startIndex < length) {
          if (match('}')) {
            break;
          }
          clause = parseSwitchCase();
          if (clause.test === null) {
            if (defaultFound) {
              throwError(Messages.MultipleDefaultsInSwitch);
            }
            defaultFound = true;
          }
          cases.push(clause);
        }
        state.inSwitch = oldInSwitch;
        expect('}');
        return node.finishSwitchStatement(discriminant, cases);
      }
      function parseThrowStatement(node) {
        var argument;
        expectKeyword('throw');
        if (hasLineTerminator) {
          throwError(Messages.NewlineAfterThrow);
        }
        argument = parseExpression();
        consumeSemicolon();
        return node.finishThrowStatement(argument);
      }
      function parseCatchClause() {
        var param,
            params = [],
            paramMap = {},
            key,
            i,
            body,
            node = new Node();
        expectKeyword('catch');
        expect('(');
        if (match(')')) {
          throwUnexpectedToken(lookahead);
        }
        param = parsePattern(params);
        for (i = 0; i < params.length; i++) {
          key = '$' + params[i].value;
          if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
            tolerateError(Messages.DuplicateBinding, params[i].value);
          }
          paramMap[key] = true;
        }
        if (strict && isRestrictedWord(param.name)) {
          tolerateError(Messages.StrictCatchVariable);
        }
        expect(')');
        body = parseBlock();
        return node.finishCatchClause(param, body);
      }
      function parseTryStatement(node) {
        var block,
            handler = null,
            finalizer = null;
        expectKeyword('try');
        block = parseBlock();
        if (matchKeyword('catch')) {
          handler = parseCatchClause();
        }
        if (matchKeyword('finally')) {
          lex();
          finalizer = parseBlock();
        }
        if (!handler && !finalizer) {
          throwError(Messages.NoCatchOrFinally);
        }
        return node.finishTryStatement(block, handler, finalizer);
      }
      function parseDebuggerStatement(node) {
        expectKeyword('debugger');
        consumeSemicolon();
        return node.finishDebuggerStatement();
      }
      function parseStatement() {
        var type = lookahead.type,
            expr,
            labeledBody,
            key,
            node;
        if (type === Token.EOF) {
          throwUnexpectedToken(lookahead);
        }
        if (type === Token.Punctuator && lookahead.value === '{') {
          return parseBlock();
        }
        isAssignmentTarget = isBindingElement = true;
        node = new Node();
        if (type === Token.Punctuator) {
          switch (lookahead.value) {
            case ';':
              return parseEmptyStatement(node);
            case '(':
              return parseExpressionStatement(node);
            default:
              break;
          }
        } else if (type === Token.Keyword) {
          switch (lookahead.value) {
            case 'break':
              return parseBreakStatement(node);
            case 'continue':
              return parseContinueStatement(node);
            case 'debugger':
              return parseDebuggerStatement(node);
            case 'do':
              return parseDoWhileStatement(node);
            case 'for':
              return parseForStatement(node);
            case 'function':
              return parseFunctionDeclaration(node);
            case 'if':
              return parseIfStatement(node);
            case 'return':
              return parseReturnStatement(node);
            case 'switch':
              return parseSwitchStatement(node);
            case 'throw':
              return parseThrowStatement(node);
            case 'try':
              return parseTryStatement(node);
            case 'var':
              return parseVariableStatement(node);
            case 'while':
              return parseWhileStatement(node);
            case 'with':
              return parseWithStatement(node);
            default:
              break;
          }
        }
        expr = parseExpression();
        if ((expr.type === Syntax.Identifier) && match(':')) {
          lex();
          key = '$' + expr.name;
          if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
            throwError(Messages.Redeclaration, 'Label', expr.name);
          }
          state.labelSet[key] = true;
          labeledBody = parseStatement();
          delete state.labelSet[key];
          return node.finishLabeledStatement(expr, labeledBody);
        }
        consumeSemicolon();
        return node.finishExpressionStatement(expr);
      }
      function parseFunctionSourceElements() {
        var statement,
            body = [],
            token,
            directive,
            firstRestricted,
            oldLabelSet,
            oldInIteration,
            oldInSwitch,
            oldInFunctionBody,
            oldParenthesisCount,
            node = new Node();
        expect('{');
        while (startIndex < length) {
          if (lookahead.type !== Token.StringLiteral) {
            break;
          }
          token = lookahead;
          statement = parseStatementListItem();
          body.push(statement);
          if (statement.expression.type !== Syntax.Literal) {
            break;
          }
          directive = source.slice(token.start + 1, token.end - 1);
          if (directive === 'use strict') {
            strict = true;
            if (firstRestricted) {
              tolerateUnexpectedToken(firstRestricted, Messages.StrictOctalLiteral);
            }
          } else {
            if (!firstRestricted && token.octal) {
              firstRestricted = token;
            }
          }
        }
        oldLabelSet = state.labelSet;
        oldInIteration = state.inIteration;
        oldInSwitch = state.inSwitch;
        oldInFunctionBody = state.inFunctionBody;
        oldParenthesisCount = state.parenthesizedCount;
        state.labelSet = {};
        state.inIteration = false;
        state.inSwitch = false;
        state.inFunctionBody = true;
        state.parenthesizedCount = 0;
        while (startIndex < length) {
          if (match('}')) {
            break;
          }
          body.push(parseStatementListItem());
        }
        expect('}');
        state.labelSet = oldLabelSet;
        state.inIteration = oldInIteration;
        state.inSwitch = oldInSwitch;
        state.inFunctionBody = oldInFunctionBody;
        state.parenthesizedCount = oldParenthesisCount;
        return node.finishBlockStatement(body);
      }
      function validateParam(options, param, name) {
        var key = '$' + name;
        if (strict) {
          if (isRestrictedWord(name)) {
            options.stricted = param;
            options.message = Messages.StrictParamName;
          }
          if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
            options.stricted = param;
            options.message = Messages.StrictParamDupe;
          }
        } else if (!options.firstRestricted) {
          if (isRestrictedWord(name)) {
            options.firstRestricted = param;
            options.message = Messages.StrictParamName;
          } else if (isStrictModeReservedWord(name)) {
            options.firstRestricted = param;
            options.message = Messages.StrictReservedWord;
          } else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
            options.stricted = param;
            options.message = Messages.StrictParamDupe;
          }
        }
        options.paramSet[key] = true;
      }
      function parseParam(options) {
        var token,
            param,
            params = [],
            i,
            def;
        token = lookahead;
        if (token.value === '...') {
          param = parseRestElement(params);
          validateParam(options, param.argument, param.argument.name);
          options.params.push(param);
          options.defaults.push(null);
          return false;
        }
        param = parsePatternWithDefault(params);
        for (i = 0; i < params.length; i++) {
          validateParam(options, params[i], params[i].value);
        }
        if (param.type === Syntax.AssignmentPattern) {
          def = param.right;
          param = param.left;
          ++options.defaultCount;
        }
        options.params.push(param);
        options.defaults.push(def);
        return !match(')');
      }
      function parseParams(firstRestricted) {
        var options;
        options = {
          params: [],
          defaultCount: 0,
          defaults: [],
          firstRestricted: firstRestricted
        };
        expect('(');
        if (!match(')')) {
          options.paramSet = {};
          while (startIndex < length) {
            if (!parseParam(options)) {
              break;
            }
            expect(',');
          }
        }
        expect(')');
        if (options.defaultCount === 0) {
          options.defaults = [];
        }
        return {
          params: options.params,
          defaults: options.defaults,
          stricted: options.stricted,
          firstRestricted: options.firstRestricted,
          message: options.message
        };
      }
      function parseFunctionDeclaration(node, identifierIsOptional) {
        var id = null,
            params = [],
            defaults = [],
            body,
            token,
            stricted,
            tmp,
            firstRestricted,
            message,
            previousStrict,
            isGenerator,
            previousAllowYield;
        expectKeyword('function');
        isGenerator = match('*');
        if (isGenerator) {
          lex();
        }
        if (!identifierIsOptional || !match('(')) {
          token = lookahead;
          id = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              tolerateUnexpectedToken(token, Messages.StrictFunctionName);
            }
          } else {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            }
          }
        }
        previousAllowYield = state.allowYield;
        state.allowYield = false;
        tmp = parseParams(firstRestricted);
        state.allowYield = previousAllowYield;
        params = tmp.params;
        defaults = tmp.defaults;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
          message = tmp.message;
        }
        previousAllowYield = state.allowYield;
        previousStrict = strict;
        state.allowYield = isGenerator;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
          throwUnexpectedToken(firstRestricted, message);
        }
        if (strict && stricted) {
          tolerateUnexpectedToken(stricted, message);
        }
        strict = previousStrict;
        state.allowYield = previousAllowYield;
        return node.finishFunctionDeclaration(id, params, defaults, body, isGenerator);
      }
      function parseFunctionExpression() {
        var token,
            id = null,
            stricted,
            firstRestricted,
            message,
            tmp,
            params = [],
            defaults = [],
            body,
            previousStrict,
            node = new Node(),
            isGenerator,
            previousAllowYield;
        expectKeyword('function');
        isGenerator = match('*');
        if (isGenerator) {
          lex();
        }
        if (!match('(')) {
          token = lookahead;
          id = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              tolerateUnexpectedToken(token, Messages.StrictFunctionName);
            }
          } else {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            }
          }
        }
        previousAllowYield = state.allowYield;
        state.allowYield = false;
        tmp = parseParams(firstRestricted);
        state.allowYield = previousAllowYield;
        params = tmp.params;
        defaults = tmp.defaults;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
          message = tmp.message;
        }
        previousStrict = strict;
        previousAllowYield = state.allowYield;
        state.allowYield = isGenerator;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
          throwUnexpectedToken(firstRestricted, message);
        }
        if (strict && stricted) {
          tolerateUnexpectedToken(stricted, message);
        }
        strict = previousStrict;
        state.allowYield = previousAllowYield;
        return node.finishFunctionExpression(id, params, defaults, body, isGenerator);
      }
      function parseClassBody() {
        var classBody,
            token,
            isStatic,
            hasConstructor = false,
            body,
            method,
            computed,
            key;
        classBody = new Node();
        expect('{');
        body = [];
        while (!match('}')) {
          if (match(';')) {
            lex();
          } else {
            method = new Node();
            token = lookahead;
            isStatic = false;
            computed = match('[');
            if (match('*')) {
              lex();
            } else {
              key = parseObjectPropertyKey();
              if (key.name === 'static' && (lookaheadPropertyName() || match('*'))) {
                token = lookahead;
                isStatic = true;
                computed = match('[');
                if (match('*')) {
                  lex();
                } else {
                  key = parseObjectPropertyKey();
                }
              }
            }
            method = tryParseMethodDefinition(token, key, computed, method);
            if (method) {
              method['static'] = isStatic;
              if (method.kind === 'init') {
                method.kind = 'method';
              }
              if (!isStatic) {
                if (!method.computed && (method.key.name || method.key.value.toString()) === 'constructor') {
                  if (method.kind !== 'method' || !method.method || method.value.generator) {
                    throwUnexpectedToken(token, Messages.ConstructorSpecialMethod);
                  }
                  if (hasConstructor) {
                    throwUnexpectedToken(token, Messages.DuplicateConstructor);
                  } else {
                    hasConstructor = true;
                  }
                  method.kind = 'constructor';
                }
              } else {
                if (!method.computed && (method.key.name || method.key.value.toString()) === 'prototype') {
                  throwUnexpectedToken(token, Messages.StaticPrototype);
                }
              }
              method.type = Syntax.MethodDefinition;
              delete method.method;
              delete method.shorthand;
              body.push(method);
            } else {
              throwUnexpectedToken(lookahead);
            }
          }
        }
        lex();
        return classBody.finishClassBody(body);
      }
      function parseClassDeclaration(identifierIsOptional) {
        var id = null,
            superClass = null,
            classNode = new Node(),
            classBody,
            previousStrict = strict;
        strict = true;
        expectKeyword('class');
        if (!identifierIsOptional || lookahead.type === Token.Identifier) {
          id = parseVariableIdentifier();
        }
        if (matchKeyword('extends')) {
          lex();
          superClass = isolateCoverGrammar(parseLeftHandSideExpressionAllowCall);
        }
        classBody = parseClassBody();
        strict = previousStrict;
        return classNode.finishClassDeclaration(id, superClass, classBody);
      }
      function parseClassExpression() {
        var id = null,
            superClass = null,
            classNode = new Node(),
            classBody,
            previousStrict = strict;
        strict = true;
        expectKeyword('class');
        if (lookahead.type === Token.Identifier) {
          id = parseVariableIdentifier();
        }
        if (matchKeyword('extends')) {
          lex();
          superClass = isolateCoverGrammar(parseLeftHandSideExpressionAllowCall);
        }
        classBody = parseClassBody();
        strict = previousStrict;
        return classNode.finishClassExpression(id, superClass, classBody);
      }
      function parseModuleSpecifier() {
        var node = new Node();
        if (lookahead.type !== Token.StringLiteral) {
          throwError(Messages.InvalidModuleSpecifier);
        }
        return node.finishLiteral(lex());
      }
      function parseExportSpecifier() {
        var exported,
            local,
            node = new Node(),
            def;
        if (matchKeyword('default')) {
          def = new Node();
          lex();
          local = def.finishIdentifier('default');
        } else {
          local = parseVariableIdentifier();
        }
        if (matchContextualKeyword('as')) {
          lex();
          exported = parseNonComputedProperty();
        }
        return node.finishExportSpecifier(local, exported);
      }
      function parseExportNamedDeclaration(node) {
        var declaration = null,
            isExportFromIdentifier,
            src = null,
            specifiers = [];
        if (lookahead.type === Token.Keyword) {
          switch (lookahead.value) {
            case 'let':
            case 'const':
            case 'var':
            case 'class':
            case 'function':
              declaration = parseStatementListItem();
              return node.finishExportNamedDeclaration(declaration, specifiers, null);
          }
        }
        expect('{');
        if (!match('}')) {
          do {
            isExportFromIdentifier = isExportFromIdentifier || matchKeyword('default');
            specifiers.push(parseExportSpecifier());
          } while (match(',') && lex());
        }
        expect('}');
        if (matchContextualKeyword('from')) {
          lex();
          src = parseModuleSpecifier();
          consumeSemicolon();
        } else if (isExportFromIdentifier) {
          throwError(lookahead.value ? Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
        } else {
          consumeSemicolon();
        }
        return node.finishExportNamedDeclaration(declaration, specifiers, src);
      }
      function parseExportDefaultDeclaration(node) {
        var declaration = null,
            expression = null;
        expectKeyword('default');
        if (matchKeyword('function')) {
          declaration = parseFunctionDeclaration(new Node(), true);
          return node.finishExportDefaultDeclaration(declaration);
        }
        if (matchKeyword('class')) {
          declaration = parseClassDeclaration(true);
          return node.finishExportDefaultDeclaration(declaration);
        }
        if (matchContextualKeyword('from')) {
          throwError(Messages.UnexpectedToken, lookahead.value);
        }
        if (match('{')) {
          expression = parseObjectInitialiser();
        } else if (match('[')) {
          expression = parseArrayInitialiser();
        } else {
          expression = parseAssignmentExpression();
        }
        consumeSemicolon();
        return node.finishExportDefaultDeclaration(expression);
      }
      function parseExportAllDeclaration(node) {
        var src;
        expect('*');
        if (!matchContextualKeyword('from')) {
          throwError(lookahead.value ? Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
        }
        lex();
        src = parseModuleSpecifier();
        consumeSemicolon();
        return node.finishExportAllDeclaration(src);
      }
      function parseExportDeclaration() {
        var node = new Node();
        if (state.inFunctionBody) {
          throwError(Messages.IllegalExportDeclaration);
        }
        expectKeyword('export');
        if (matchKeyword('default')) {
          return parseExportDefaultDeclaration(node);
        }
        if (match('*')) {
          return parseExportAllDeclaration(node);
        }
        return parseExportNamedDeclaration(node);
      }
      function parseImportSpecifier() {
        var local,
            imported,
            node = new Node();
        imported = parseNonComputedProperty();
        if (matchContextualKeyword('as')) {
          lex();
          local = parseVariableIdentifier();
        }
        return node.finishImportSpecifier(local, imported);
      }
      function parseNamedImports() {
        var specifiers = [];
        expect('{');
        if (!match('}')) {
          do {
            specifiers.push(parseImportSpecifier());
          } while (match(',') && lex());
        }
        expect('}');
        return specifiers;
      }
      function parseImportDefaultSpecifier() {
        var local,
            node = new Node();
        local = parseNonComputedProperty();
        return node.finishImportDefaultSpecifier(local);
      }
      function parseImportNamespaceSpecifier() {
        var local,
            node = new Node();
        expect('*');
        if (!matchContextualKeyword('as')) {
          throwError(Messages.NoAsAfterImportNamespace);
        }
        lex();
        local = parseNonComputedProperty();
        return node.finishImportNamespaceSpecifier(local);
      }
      function parseImportDeclaration() {
        var specifiers,
            src,
            node = new Node();
        if (state.inFunctionBody) {
          throwError(Messages.IllegalImportDeclaration);
        }
        expectKeyword('import');
        specifiers = [];
        if (lookahead.type === Token.StringLiteral) {
          src = parseModuleSpecifier();
          consumeSemicolon();
          return node.finishImportDeclaration(specifiers, src);
        }
        if (!matchKeyword('default') && isIdentifierName(lookahead)) {
          specifiers.push(parseImportDefaultSpecifier());
          if (match(',')) {
            lex();
          }
        }
        if (match('*')) {
          specifiers.push(parseImportNamespaceSpecifier());
        } else if (match('{')) {
          specifiers = specifiers.concat(parseNamedImports());
        }
        if (!matchContextualKeyword('from')) {
          throwError(lookahead.value ? Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
        }
        lex();
        src = parseModuleSpecifier();
        consumeSemicolon();
        return node.finishImportDeclaration(specifiers, src);
      }
      function parseScriptBody() {
        var statement,
            body = [],
            token,
            directive,
            firstRestricted;
        while (startIndex < length) {
          token = lookahead;
          if (token.type !== Token.StringLiteral) {
            break;
          }
          statement = parseStatementListItem();
          body.push(statement);
          if (statement.expression.type !== Syntax.Literal) {
            break;
          }
          directive = source.slice(token.start + 1, token.end - 1);
          if (directive === 'use strict') {
            strict = true;
            if (firstRestricted) {
              tolerateUnexpectedToken(firstRestricted, Messages.StrictOctalLiteral);
            }
          } else {
            if (!firstRestricted && token.octal) {
              firstRestricted = token;
            }
          }
        }
        while (startIndex < length) {
          statement = parseStatementListItem();
          if (typeof statement === 'undefined') {
            break;
          }
          body.push(statement);
        }
        return body;
      }
      function parseProgram() {
        var body,
            node;
        peek();
        node = new Node();
        body = parseScriptBody();
        return node.finishProgram(body);
      }
      function filterTokenLocation() {
        var i,
            entry,
            token,
            tokens = [];
        for (i = 0; i < extra.tokens.length; ++i) {
          entry = extra.tokens[i];
          token = {
            type: entry.type,
            value: entry.value
          };
          if (entry.regex) {
            token.regex = {
              pattern: entry.regex.pattern,
              flags: entry.regex.flags
            };
          }
          if (extra.range) {
            token.range = entry.range;
          }
          if (extra.loc) {
            token.loc = entry.loc;
          }
          tokens.push(token);
        }
        extra.tokens = tokens;
      }
      function tokenize(code, options) {
        var toString,
            tokens;
        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
          code = toString(code);
        }
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        startIndex = index;
        startLineNumber = lineNumber;
        startLineStart = lineStart;
        length = source.length;
        lookahead = null;
        state = {
          allowIn: true,
          allowYield: false,
          labelSet: {},
          inFunctionBody: false,
          inIteration: false,
          inSwitch: false,
          lastCommentStart: -1,
          curlyStack: []
        };
        extra = {};
        options = options || {};
        options.tokens = true;
        extra.tokens = [];
        extra.tokenize = true;
        extra.openParenToken = -1;
        extra.openCurlyToken = -1;
        extra.range = (typeof options.range === 'boolean') && options.range;
        extra.loc = (typeof options.loc === 'boolean') && options.loc;
        if (typeof options.comment === 'boolean' && options.comment) {
          extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
          extra.errors = [];
        }
        try {
          peek();
          if (lookahead.type === Token.EOF) {
            return extra.tokens;
          }
          lex();
          while (lookahead.type !== Token.EOF) {
            try {
              lex();
            } catch (lexError) {
              if (extra.errors) {
                recordError(lexError);
                break;
              } else {
                throw lexError;
              }
            }
          }
          filterTokenLocation();
          tokens = extra.tokens;
          if (typeof extra.comments !== 'undefined') {
            tokens.comments = extra.comments;
          }
          if (typeof extra.errors !== 'undefined') {
            tokens.errors = extra.errors;
          }
        } catch (e) {
          throw e;
        } finally {
          extra = {};
        }
        return tokens;
      }
      function parse(code, options) {
        var program,
            toString;
        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
          code = toString(code);
        }
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        startIndex = index;
        startLineNumber = lineNumber;
        startLineStart = lineStart;
        length = source.length;
        lookahead = null;
        state = {
          allowIn: true,
          allowYield: false,
          labelSet: {},
          inFunctionBody: false,
          inIteration: false,
          inSwitch: false,
          lastCommentStart: -1,
          curlyStack: []
        };
        sourceType = 'script';
        strict = false;
        extra = {};
        if (typeof options !== 'undefined') {
          extra.range = (typeof options.range === 'boolean') && options.range;
          extra.loc = (typeof options.loc === 'boolean') && options.loc;
          extra.attachComment = (typeof options.attachComment === 'boolean') && options.attachComment;
          if (extra.loc && options.source !== null && options.source !== undefined) {
            extra.source = toString(options.source);
          }
          if (typeof options.tokens === 'boolean' && options.tokens) {
            extra.tokens = [];
          }
          if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
          }
          if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
          }
          if (extra.attachComment) {
            extra.range = true;
            extra.comments = [];
            extra.bottomRightStack = [];
            extra.trailingComments = [];
            extra.leadingComments = [];
          }
          if (options.sourceType === 'module') {
            sourceType = options.sourceType;
            strict = true;
          }
        }
        try {
          program = parseProgram();
          if (typeof extra.comments !== 'undefined') {
            program.comments = extra.comments;
          }
          if (typeof extra.tokens !== 'undefined') {
            filterTokenLocation();
            program.tokens = extra.tokens;
          }
          if (typeof extra.errors !== 'undefined') {
            program.errors = extra.errors;
          }
        } catch (e) {
          throw e;
        } finally {
          extra = {};
        }
        return program;
      }
      exports.version = '2.4.1';
      exports.tokenize = tokenize;
      exports.parse = parse;
      exports.Syntax = (function() {
        var name,
            types = {};
        if (typeof Object.create === 'function') {
          types = Object.create(null);
        }
        for (name in Syntax) {
          if (Syntax.hasOwnProperty(name)) {
            types[name] = Syntax[name];
          }
        }
        if (typeof Object.freeze === 'function') {
          Object.freeze(types);
        }
        return types;
      }());
    }));
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("lib/util", ["lib/tree", "npm:path@0.11.14", "lib/nodeUtil", "lib/defineScope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  let otree = require("lib/tree");
  let path = require("npm:path@0.11.14");
  let nUtil = require("lib/nodeUtil");
  let defineScope = require("lib/defineScope");
  module.exports = {
    dir(src) {
      let arr;
      src = src.replace(/\\/g, '/');
      arr = src.split('/');
      arr.pop();
      return arr.join('/');
    },
    filterVars(deps, vars, regx) {
      let rtVar = [];
      let rtDeps = [];
      deps.forEach((v, k) => {
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
    transformRaw(str) {
      return str.replace(/^['"](.*)['"]$/, '$1');
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-fs@0.1.2", ["github:jspm/nodelibs-fs@0.1.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-fs@0.1.2/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:concat-map@0.0.1", ["npm:concat-map@0.0.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:concat-map@0.0.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:balanced-match@0.2.0", ["npm:balanced-match@0.2.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:balanced-match@0.2.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:inherits@2.0.1", ["npm:inherits@2.0.1/inherits_browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:inherits@2.0.1/inherits_browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:events@1.0.2", ["npm:events@1.0.2/events"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:events@1.0.2/events");
  global.define = __define;
  return module.exports;
});

System.register("npm:util@0.10.3/util", ["npm:util@0.10.3/support/isBufferBrowser", "npm:inherits@2.0.1", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(' ');
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === '%%')
          return '%';
        if (i >= len)
          return x;
        switch (x) {
          case '%s':
            return String(args[i++]);
          case '%d':
            return Number(args[i++]);
          case '%j':
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return '[Circular]';
            }
          default:
            return x;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += ' ' + x;
        } else {
          str += ' ' + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (isUndefined(global.process)) {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      if (process.noDeprecation === true) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnviron;
    exports.debuglog = function(set) {
      if (isUndefined(debugEnviron))
        debugEnviron = process.env.NODE_DEBUG || '';
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error('%s %d: %s', set, pid, msg);
          };
        } else {
          debugs[set] = function() {};
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      'bold': [1, 22],
      'italic': [3, 23],
      'underline': [4, 24],
      'inverse': [7, 27],
      'white': [37, 39],
      'grey': [90, 39],
      'black': [30, 39],
      'blue': [34, 39],
      'cyan': [36, 39],
      'green': [32, 39],
      'magenta': [35, 39],
      'red': [31, 39],
      'yellow': [33, 39]
    };
    inspect.styles = {
      'special': 'cyan',
      'number': 'yellow',
      'boolean': 'yellow',
      'undefined': 'grey',
      'null': 'bold',
      'string': 'green',
      'date': 'magenta',
      'regexp': 'red'
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = '',
          array = false,
          braces = ['{', '}'];
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = ' ' + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value))
        return ctx.stylize('' + value, 'number');
      if (isBoolean(value))
        return ctx.stylize('' + value, 'boolean');
      if (isNull(value))
        return ctx.stylize('null', 'null');
    }
    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0,
          l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name,
          str,
          desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
      return name + ': ' + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === 'string';
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    exports.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined';
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require("npm:util@0.10.3/support/isBufferBrowser");
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function timestamp() {
      var d = new Date();
      var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
      return [d.getDate(), months[d.getMonth()], time].join(' ');
    }
    exports.log = function() {
      console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require("npm:inherits@2.0.1");
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:path-is-absolute@1.0.0", ["npm:path-is-absolute@1.0.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:path-is-absolute@1.0.0/index");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-util@0.1.0", ["github:jspm/nodelibs-util@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-util@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:wrappy@1.0.1", ["npm:wrappy@1.0.1/wrappy"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:wrappy@1.0.1/wrappy");
  global.define = __define;
  return module.exports;
});

System.register("npm:once@1.3.2", ["npm:once@1.3.2/once"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:once@1.3.2/once");
  global.define = __define;
  return module.exports;
});

System.register("npm:fs@0.0.2", ["npm:fs@0.0.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:fs@0.0.2/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:path@0.11.14", ["npm:path@0.11.14/path"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:path@0.11.14/path");
  global.define = __define;
  return module.exports;
});

System.register("npm:async@1.4.0", ["npm:async@1.4.0/lib/async"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:async@1.4.0/lib/async");
  global.define = __define;
  return module.exports;
});

System.register("npm:lodash@3.10.0", ["npm:lodash@3.10.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:lodash@3.10.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:estraverse@1.9.3", ["npm:estraverse@1.9.3/estraverse"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:estraverse@1.9.3/estraverse");
  global.define = __define;
  return module.exports;
});

System.register("npm:esutils@1.1.6/lib/utils", ["npm:esutils@1.1.6/lib/ast", "npm:esutils@1.1.6/lib/code", "npm:esutils@1.1.6/lib/keyword"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function() {
    'use strict';
    exports.ast = require("npm:esutils@1.1.6/lib/ast");
    exports.code = require("npm:esutils@1.1.6/lib/code");
    exports.keyword = require("npm:esutils@1.1.6/lib/keyword");
  }());
  global.define = __define;
  return module.exports;
});

System.register("npm:amdefine@1.0.0", ["npm:amdefine@1.0.0/amdefine"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:amdefine@1.0.0/amdefine");
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/base64-vlq", ["npm:amdefine@1.0.0", "npm:source-map@0.1.43/lib/source-map/base64"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    var base64 = require("npm:source-map@0.1.43/lib/source-map/base64");
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? ((-aValue) << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports.decode = function base64VLQ_decode(aStr, aOutParam) {
      var i = 0;
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation,
          digit;
      do {
        if (i >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charAt(i++));
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aStr.slice(i);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/source-map-consumer", ["npm:amdefine@1.0.0", "npm:source-map@0.1.43/lib/source-map/util", "npm:source-map@0.1.43/lib/source-map/binary-search", "npm:source-map@0.1.43/lib/source-map/array-set", "npm:source-map@0.1.43/lib/source-map/base64-vlq"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    var util = require("npm:source-map@0.1.43/lib/source-map/util");
    var binarySearch = require("npm:source-map@0.1.43/lib/source-map/binary-search");
    var ArraySet = require("npm:source-map@0.1.43/lib/source-map/array-set").ArraySet;
    var base64VLQ = require("npm:source-map@0.1.43/lib/source-map/base64-vlq");
    function SourceMapConsumer(aSourceMap) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === 'string') {
        sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
      }
      var version = util.getArg(sourceMap, 'version');
      var sources = util.getArg(sourceMap, 'sources');
      var names = util.getArg(sourceMap, 'names', []);
      var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
      var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
      var mappings = util.getArg(sourceMap, 'mappings');
      var file = util.getArg(sourceMap, 'file', null);
      if (version != this._version) {
        throw new Error('Unsupported version: ' + version);
      }
      sources = sources.map(util.normalize);
      this._names = ArraySet.fromArray(names, true);
      this._sources = ArraySet.fromArray(sources, true);
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this.file = file;
    }
    SourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(SourceMapConsumer.prototype);
      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
      smc.file = aSourceMap._file;
      smc.__generatedMappings = aSourceMap._mappings.toArray().slice();
      smc.__originalMappings = aSourceMap._mappings.toArray().slice().sort(util.compareByOriginalPositions);
      return smc;
    };
    SourceMapConsumer.prototype._version = 3;
    Object.defineProperty(SourceMapConsumer.prototype, 'sources', {get: function() {
        return this._sources.toArray().map(function(s) {
          return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
        }, this);
      }});
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {get: function() {
        if (!this.__generatedMappings) {
          this.__generatedMappings = [];
          this.__originalMappings = [];
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }});
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {get: function() {
        if (!this.__originalMappings) {
          this.__generatedMappings = [];
          this.__originalMappings = [];
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }});
    SourceMapConsumer.prototype._nextCharIsMappingSeparator = function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
      var c = aStr.charAt(0);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var str = aStr;
      var temp = {};
      var mapping;
      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++;
          str = str.slice(1);
          previousGeneratedColumn = 0;
        } else if (str.charAt(0) === ',') {
          str = str.slice(1);
        } else {
          mapping = {};
          mapping.generatedLine = generatedLine;
          base64VLQ.decode(str, temp);
          mapping.generatedColumn = previousGeneratedColumn + temp.value;
          previousGeneratedColumn = mapping.generatedColumn;
          str = temp.rest;
          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
            base64VLQ.decode(str, temp);
            mapping.source = this._sources.at(previousSource + temp.value);
            previousSource += temp.value;
            str = temp.rest;
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source, but no line and column');
            }
            base64VLQ.decode(str, temp);
            mapping.originalLine = previousOriginalLine + temp.value;
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            str = temp.rest;
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source and line, but no column');
            }
            base64VLQ.decode(str, temp);
            mapping.originalColumn = previousOriginalColumn + temp.value;
            previousOriginalColumn = mapping.originalColumn;
            str = temp.rest;
            if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
              base64VLQ.decode(str, temp);
              mapping.name = this._names.at(previousName + temp.value);
              previousName += temp.value;
              str = temp.rest;
            }
          }
          this.__generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            this.__originalMappings.push(mapping);
          }
        }
      }
      this.__generatedMappings.sort(util.compareByGeneratedPositions);
      this.__originalMappings.sort(util.compareByOriginalPositions);
    };
    SourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator);
    };
    SourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    SourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };
      var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositions);
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, 'source', null);
          if (source != null && this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source);
          }
          return {
            source: source,
            line: util.getArg(mapping, 'originalLine', null),
            column: util.getArg(mapping, 'originalColumn', null),
            name: util.getArg(mapping, 'name', null)
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    SourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource) {
      if (!this.sourcesContent) {
        return null;
      }
      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource);
      }
      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    };
    SourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };
      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }
      var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions);
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: Infinity
      };
      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }
      var mappings = [];
      var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions);
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        while (mapping && mapping.originalLine === needle.originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });
          mapping = this._originalMappings[--index];
        }
      }
      return mappings.reverse();
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source;
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name
        };
      }).forEach(aCallback, context);
    };
    exports.SourceMapConsumer = SourceMapConsumer;
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:esprima@2.4.1", ["npm:esprima@2.4.1/esprima"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:esprima@2.4.1/esprima");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("npm:brace-expansion@1.1.0/index", ["npm:concat-map@0.0.1", "npm:balanced-match@0.2.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var concatMap = require("npm:concat-map@0.0.1");
  var balanced = require("npm:balanced-match@0.2.0");
  module.exports = expandTop;
  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function escapeBraces(str) {
    return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
  }
  function parseCommaParts(str) {
    if (!str)
      return [''];
    var parts = [];
    var m = balanced('{', '}', str);
    if (!m)
      return str.split(',');
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');
    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
  }
  function expandTop(str) {
    if (!str)
      return [];
    return expand(escapeBraces(str), true).map(unescapeBraces);
  }
  function identity(e) {
    return e;
  }
  function embrace(str) {
    return '{' + str + '}';
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
  function expand(str, isTop) {
    var expansions = [];
    var m = balanced('{', '}', str);
    if (!m || /\$$/.test(m.pre))
      return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = /^(.*,)+(.+)?$/.test(m.body);
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\')
            c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0)
                c = '-' + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function(el) {
        return expand(el, false);
      });
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
    return expansions;
  }
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-events@0.1.1/index", ["npm:events@1.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('events') : require("npm:events@1.0.2");
  global.define = __define;
  return module.exports;
});

System.register("npm:util@0.10.3", ["npm:util@0.10.3/util"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:util@0.10.3/util");
  global.define = __define;
  return module.exports;
});

System.register("npm:glob@5.0.14/sync", ["github:jspm/nodelibs-fs@0.1.2", "npm:minimatch@2.0.9", "npm:glob@5.0.14/glob", "github:jspm/nodelibs-util@0.1.0", "github:jspm/nodelibs-path@0.1.0", "github:jspm/nodelibs-assert@0.1.0", "npm:path-is-absolute@1.0.0", "npm:glob@5.0.14/common", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    module.exports = globSync;
    globSync.GlobSync = GlobSync;
    var fs = require("github:jspm/nodelibs-fs@0.1.2");
    var minimatch = require("npm:minimatch@2.0.9");
    var Minimatch = minimatch.Minimatch;
    var Glob = require("npm:glob@5.0.14/glob").Glob;
    var util = require("github:jspm/nodelibs-util@0.1.0");
    var path = require("github:jspm/nodelibs-path@0.1.0");
    var assert = require("github:jspm/nodelibs-assert@0.1.0");
    var isAbsolute = require("npm:path-is-absolute@1.0.0");
    var common = require("npm:glob@5.0.14/common");
    var alphasort = common.alphasort;
    var alphasorti = common.alphasorti;
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    function globSync(pattern, options) {
      if (typeof options === 'function' || arguments.length === 3)
        throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error('must provide pattern');
      if (typeof options === 'function' || arguments.length === 3)
        throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = fs.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === 'stat')
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === 'string') {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join('/'), index);
          return ;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join('/');
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = '.';
      else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = '/' + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return ;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return ;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === '.';
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== '.' || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return ;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== '/')
              e = prefix + '/' + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === '/' && !this.nomount) {
            e = path.join(this.root, e);
          }
          this.matches[index][e] = true;
        }
        return ;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.matches[index][e])
        return ;
      if (this.nodir) {
        var c = this.cache[this._makeAbs(e)];
        if (c === 'DIR' || Array.isArray(c))
          return ;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = fs.lstatSync(abs);
      } catch (er) {
        return null;
      }
      var isSym = lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && !lstat.isDirectory())
        this.cache[abs] = 'FILE';
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === 'FILE')
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === '/')
            e = abs + e;
          else
            e = abs + '/' + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case 'ENOTSUP':
        case 'ENOTDIR':
          this.cache[this._makeAbs(f)] = 'FILE';
          break;
        case 'ENOENT':
        case 'ELOOP':
        case 'ENAMETOOLONG':
        case 'UNKNOWN':
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error('glob error', er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return ;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return ;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === '.' && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      if (!exists)
        return ;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === '/') {
          prefix = path.join(this.root, prefix);
        } else {
          prefix = path.resolve(this.root, prefix);
          if (trail)
            prefix += '/';
        }
      }
      if (process.platform === 'win32')
        prefix = prefix.replace(/\\/g, '/');
      this.matches[index][prefix] = true;
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === '/';
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = 'DIR';
        if (!needDir || c === 'DIR')
          return c;
        if (needDir && c === 'FILE')
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = fs.lstatSync(abs);
        } catch (er) {
          return false;
        }
        if (lstat.isSymbolicLink()) {
          try {
            stat = fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = stat.isDirectory() ? 'DIR' : 'FILE';
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c !== 'DIR')
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:inflight@1.0.4/inflight", ["npm:wrappy@1.0.1", "npm:once@1.3.2", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var wrappy = require("npm:wrappy@1.0.1");
    var reqs = Object.create(null);
    var once = require("npm:once@1.3.2");
    module.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function() {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:esutils@1.1.6", ["npm:esutils@1.1.6/lib/utils"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:esutils@1.1.6/lib/utils");
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map/source-map-generator", ["npm:amdefine@1.0.0", "npm:source-map@0.1.43/lib/source-map/base64-vlq", "npm:source-map@0.1.43/lib/source-map/util", "npm:source-map@0.1.43/lib/source-map/array-set", "npm:source-map@0.1.43/lib/source-map/mapping-list"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  if (typeof define !== 'function') {
    var define = require("npm:amdefine@1.0.0")(module, require);
  }
  define(function(require, exports, module) {
    var base64VLQ = require("npm:source-map@0.1.43/lib/source-map/base64-vlq");
    var util = require("npm:source-map@0.1.43/lib/source-map/util");
    var ArraySet = require("npm:source-map@0.1.43/lib/source-map/array-set").ArraySet;
    var MappingList = require("npm:source-map@0.1.43/lib/source-map/mapping-list").MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, 'file', null);
      this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
      this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }};
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null && !this._sources.has(source)) {
        this._sources.add(source);
      }
      if (name != null && !this._names.has(name)) {
        this._names.add(name);
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return ;
      } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return ;
      } else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;
      var mappings = this._mappings.toArray();
      for (var i = 0,
          len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositions(mapping, mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }
        result += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source) - previousSource);
          previousSource = this._sources.indexOf(mapping.source);
          result += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          result += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name) - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this);
    };
    exports.SourceMapGenerator = SourceMapGenerator;
  });
  global.define = __define;
  return module.exports;
});

System.register("lib/tree", ["npm:escodegen@1.6.1", "npm:path@0.11.14", "npm:esprima@2.4.1", "npm:lodash@3.10.0", "npm:fs@0.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  let escodegen = require("npm:escodegen@1.6.1");
  let path = require("npm:path@0.11.14");
  let esprima = require("npm:esprima@2.4.1");
  let _ = require("npm:lodash@3.10.0");
  let fs = require("npm:fs@0.0.2");
  function otree(pOptions) {
    let options = this.options = this.options || {};
    _.assign(options, pOptions);
    if (options.src && path.extname(options.src).slice(1) !== (options.ext || 'js')) {
      options.src = options.src + '.js';
    }
    this._ast = this._parse(options.content || fs.readFileSync(options.src));
    return this;
  }
  let depPath = function(name, base) {
    let extOrigin = path.extname(name);
    let noExtName = name.slice(0, name.length - extOrigin.length);
    let ext = alias[extOrigin.slice(-1)] || 'js';
    let arr;
    base = base.replace(/\\/g, '/');
    arr = base.split('/');
    arr.splice(arr.length - 1, 1, noExtName + '.' + ext);
    return path.join.apply(path, arr);
  };
  otree.prototype._parse = function(code) {
    let ast = esprima.parse(code);
    return ast;
  };
  otree.prototype.curAst = function(node) {
    return this._ast;
  };
  otree.astToString = function() {
    return escodegen.generate(this._ast);
  };
  module.exports = otree;
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:brace-expansion@1.1.0", ["npm:brace-expansion@1.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:brace-expansion@1.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-events@0.1.1", ["github:jspm/nodelibs-events@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-events@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:assert@1.3.0/assert", ["npm:util@0.10.3"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var util = require("npm:util@0.10.3");
  var pSlice = Array.prototype.slice;
  var hasOwn = Object.prototype.hasOwnProperty;
  var assert = module.exports = ok;
  assert.AssertionError = function AssertionError(options) {
    this.name = 'AssertionError';
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    if (options.message) {
      this.message = options.message;
      this.generatedMessage = false;
    } else {
      this.message = getMessage(this);
      this.generatedMessage = true;
    }
    var stackStartFunction = options.stackStartFunction || fail;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, stackStartFunction);
    } else {
      var err = new Error();
      if (err.stack) {
        var out = err.stack;
        var fn_name = stackStartFunction.name;
        var idx = out.indexOf('\n' + fn_name);
        if (idx >= 0) {
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }
        this.stack = out;
      }
    }
  };
  util.inherits(assert.AssertionError, Error);
  function replacer(key, value) {
    if (util.isUndefined(value)) {
      return '' + value;
    }
    if (util.isNumber(value) && !isFinite(value)) {
      return value.toString();
    }
    if (util.isFunction(value) || util.isRegExp(value)) {
      return value.toString();
    }
    return value;
  }
  function truncate(s, n) {
    if (util.isString(s)) {
      return s.length < n ? s : s.slice(0, n);
    } else {
      return s;
    }
  }
  function getMessage(self) {
    return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
  }
  function fail(actual, expected, message, operator, stackStartFunction) {
    throw new assert.AssertionError({
      message: message,
      actual: actual,
      expected: expected,
      operator: operator,
      stackStartFunction: stackStartFunction
    });
  }
  assert.fail = fail;
  function ok(value, message) {
    if (!value)
      fail(value, true, message, '==', assert.ok);
  }
  assert.ok = ok;
  assert.equal = function equal(actual, expected, message) {
    if (actual != expected)
      fail(actual, expected, message, '==', assert.equal);
  };
  assert.notEqual = function notEqual(actual, expected, message) {
    if (actual == expected) {
      fail(actual, expected, message, '!=', assert.notEqual);
    }
  };
  assert.deepEqual = function deepEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected)) {
      fail(actual, expected, message, 'deepEqual', assert.deepEqual);
    }
  };
  function _deepEqual(actual, expected) {
    if (actual === expected) {
      return true;
    } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
      if (actual.length != expected.length)
        return false;
      for (var i = 0; i < actual.length; i++) {
        if (actual[i] !== expected[i])
          return false;
      }
      return true;
    } else if (util.isDate(actual) && util.isDate(expected)) {
      return actual.getTime() === expected.getTime();
    } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
      return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
    } else if (!util.isObject(actual) && !util.isObject(expected)) {
      return actual == expected;
    } else {
      return objEquiv(actual, expected);
    }
  }
  function isArguments(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }
  function objEquiv(a, b) {
    if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
      return false;
    if (a.prototype !== b.prototype)
      return false;
    if (util.isPrimitive(a) || util.isPrimitive(b)) {
      return a === b;
    }
    var aIsArgs = isArguments(a),
        bIsArgs = isArguments(b);
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
      return false;
    if (aIsArgs) {
      a = pSlice.call(a);
      b = pSlice.call(b);
      return _deepEqual(a, b);
    }
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key,
        i;
    if (ka.length != kb.length)
      return false;
    ka.sort();
    kb.sort();
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i])
        return false;
    }
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!_deepEqual(a[key], b[key]))
        return false;
    }
    return true;
  }
  assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
    if (_deepEqual(actual, expected)) {
      fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
    }
  };
  assert.strictEqual = function strictEqual(actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, '===', assert.strictEqual);
    }
  };
  assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      fail(actual, expected, message, '!==', assert.notStrictEqual);
    }
  };
  function expectedException(actual, expected) {
    if (!actual || !expected) {
      return false;
    }
    if (Object.prototype.toString.call(expected) == '[object RegExp]') {
      return expected.test(actual);
    } else if (actual instanceof expected) {
      return true;
    } else if (expected.call({}, actual) === true) {
      return true;
    }
    return false;
  }
  function _throws(shouldThrow, block, expected, message) {
    var actual;
    if (util.isString(expected)) {
      message = expected;
      expected = null;
    }
    try {
      block();
    } catch (e) {
      actual = e;
    }
    message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
    if (shouldThrow && !actual) {
      fail(actual, expected, 'Missing expected exception' + message);
    }
    if (!shouldThrow && expectedException(actual, expected)) {
      fail(actual, expected, 'Got unwanted exception' + message);
    }
    if ((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
      throw actual;
    }
  }
  assert.throws = function(block, error, message) {
    _throws.apply(this, [true].concat(pSlice.call(arguments)));
  };
  assert.doesNotThrow = function(block, message) {
    _throws.apply(this, [false].concat(pSlice.call(arguments)));
  };
  assert.ifError = function(err) {
    if (err) {
      throw err;
    }
  };
  var objectKeys = Object.keys || function(obj) {
    var keys = [];
    for (var key in obj) {
      if (hasOwn.call(obj, key))
        keys.push(key);
    }
    return keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:inflight@1.0.4", ["npm:inflight@1.0.4/inflight"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:inflight@1.0.4/inflight");
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43/lib/source-map", ["npm:source-map@0.1.43/lib/source-map/source-map-generator", "npm:source-map@0.1.43/lib/source-map/source-map-consumer", "npm:source-map@0.1.43/lib/source-map/source-node"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  exports.SourceMapGenerator = require("npm:source-map@0.1.43/lib/source-map/source-map-generator").SourceMapGenerator;
  exports.SourceMapConsumer = require("npm:source-map@0.1.43/lib/source-map/source-map-consumer").SourceMapConsumer;
  exports.SourceNode = require("npm:source-map@0.1.43/lib/source-map/source-node").SourceNode;
  global.define = __define;
  return module.exports;
});

System.register("lib/defineScope", ["npm:lodash@3.10.0", "lib/tree", "lib/templateFactory", "npm:path@0.11.14", "lib/util", "lib/nodeUtil"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  let _ = require("npm:lodash@3.10.0");
  let otree = require("lib/tree");
  let tempateMap = require("lib/templateFactory");
  let path = require("npm:path@0.11.14");
  let $util = require("lib/util");
  let nUtil = require("lib/nodeUtil");
  function defineScope(options) {
    this.options = _.assign({regx: {
        tplRaw: /^['"]\.\/[^'"]+['"]$/,
        tpl: /\.\/[^'"]+$/
      }}, options);
    this.deps = [];
    this.vars = [];
  }
  defineScope.prototype = {
    createRequireFunBody(baseInfo, onlyFunBody) {
      let baseInfoText = baseInfo.text;
      let options = this.options;
      let regx = options.regx;
      let deps = baseInfoText.oriDeps;
      let vars = baseInfoText.oriVars;
      let inlinedVars = this.inlinedVars(baseInfo);
      let dynamicBody = tempateMap.dynamic(inlinedVars, baseInfoText.callBackFunBody);
      let tail = tempateMap.tail(this.getTplContentByOrder(baseInfo.oriDeps));
      let noInlined = $util.filterVars(deps, vars, regx.tplRaw);
      this.deps = noInlined.deps.concat(this.deps);
      this.vars = noInlined.vars.concat(this.vars);
      if (onlyFunBody) {
        return tempateMap.defineWrapperOnlyFunctionBody(tempateMap.top + dynamicBody + tail);
      } else {
        return tempateMap.defineWrapper(baseInfoText.name, this.deps, this.vars, tempateMap.top + dynamicBody + tail);
      }
    },
    getTplContentByOrder(deps) {
      let options = this.options;
      let regx = options.regx;
      let contentQueue = [];
      deps = deps.filter((v, k) => {
        v = v.value;
        if (regx.tpl.test(v)) {
          contentQueue.push(this.inlineDefine(v, $util.dir(options.src), true).contents.join(''));
        }
      });
      return contentQueue;
    },
    inlinedVars(biObj) {
      let baseInfo = biObj.text;
      let vars = baseInfo.oriVars;
      let deps = baseInfo.oriDeps;
      let inlineCounter = 2;
      let options = this.options;
      let regx = options.regx;
      let inlinedVar = [];
      deps.forEach((v, k) => {
        if (regx.tplRaw.test(v)) {
          inlinedVar[k] = tempateMap.requireFunVarName(inlineCounter++, v);
        } else {
          inlinedVar[k] = vars[k];
        }
      });
      return inlinedVar;
    },
    inlineDefine(src, dir = '', depDefine = false) {
      src = src || this.options.src;
      let bodyArr = [];
      let options = this.options;
      let tree = new otree({src: path.join(dir, src)});
      let entryAst = tree.curAst();
      let baseInfo;
      if (nUtil.isProgram(entryAst)) {
        entryAst.body.forEach((item) => {
          baseInfo = nUtil.getFormattedBaseInfo(item);
          let bodyResult = this.createRequireFunBody(baseInfo, depDefine);
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
  global.define = __define;
  return module.exports;
});

System.register("npm:path-browserify@0.0.0/index", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    function normalizeArray(parts, allowAboveRoot) {
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === '.') {
          parts.splice(i, 1);
        } else if (last === '..') {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up--; up) {
          parts.unshift('..');
        }
      }
      return parts;
    }
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    var splitPath = function(filename) {
      return splitPathRe.exec(filename).slice(1);
    };
    exports.resolve = function() {
      var resolvedPath = '',
          resolvedAbsolute = false;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = (i >= 0) ? arguments[i] : process.cwd();
        if (typeof path !== 'string') {
          throw new TypeError('Arguments to path.resolve must be strings');
        } else if (!path) {
          continue;
        }
        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = path.charAt(0) === '/';
      }
      resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
        return !!p;
      }), !resolvedAbsolute).join('/');
      return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
    };
    exports.normalize = function(path) {
      var isAbsolute = exports.isAbsolute(path),
          trailingSlash = substr(path, -1) === '/';
      path = normalizeArray(filter(path.split('/'), function(p) {
        return !!p;
      }), !isAbsolute).join('/');
      if (!path && !isAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }
      return (isAbsolute ? '/' : '') + path;
    };
    exports.isAbsolute = function(path) {
      return path.charAt(0) === '/';
    };
    exports.join = function() {
      var paths = Array.prototype.slice.call(arguments, 0);
      return exports.normalize(filter(paths, function(p, index) {
        if (typeof p !== 'string') {
          throw new TypeError('Arguments to path.join must be strings');
        }
        return p;
      }).join('/'));
    };
    exports.relative = function(from, to) {
      from = exports.resolve(from).substr(1);
      to = exports.resolve(to).substr(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== '')
            break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== '')
            break;
        }
        if (start > end)
          return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split('/'));
      var toParts = trim(to.split('/'));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join('/');
    };
    exports.sep = '/';
    exports.delimiter = ':';
    exports.dirname = function(path) {
      var result = splitPath(path),
          root = result[0],
          dir = result[1];
      if (!root && !dir) {
        return '.';
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1);
      }
      return root + dir;
    };
    exports.basename = function(path, ext) {
      var f = splitPath(path)[2];
      if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
      }
      return f;
    };
    exports.extname = function(path) {
      return splitPath(path)[3];
    };
    function filter(xs, f) {
      if (xs.filter)
        return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs))
          res.push(xs[i]);
      }
      return res;
    }
    var substr = 'ab'.substr(-1) === 'b' ? function(str, start, len) {
      return str.substr(start, len);
    } : function(str, start, len) {
      if (start < 0)
        start = str.length + start;
      return str.substr(start, len);
    };
    ;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:assert@1.3.0", ["npm:assert@1.3.0/assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:assert@1.3.0/assert");
  global.define = __define;
  return module.exports;
});

System.register("npm:source-map@0.1.43", ["npm:source-map@0.1.43/lib/source-map"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:source-map@0.1.43/lib/source-map");
  global.define = __define;
  return module.exports;
});

System.register("npm:path-browserify@0.0.0", ["npm:path-browserify@0.0.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:path-browserify@0.0.0/index");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-assert@0.1.0/index", ["npm:assert@1.3.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('assert') : require("npm:assert@1.3.0");
  global.define = __define;
  return module.exports;
});

System.register("npm:escodegen@1.6.1/escodegen", ["npm:estraverse@1.9.3", "npm:esutils@1.1.6", "npm:source-map@0.1.43", "npm:escodegen@1.6.1/package.json!github:systemjs/plugin-json@0.1.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function() {
    'use strict';
    var Syntax,
        Precedence,
        BinaryPrecedence,
        SourceNode,
        estraverse,
        esutils,
        isArray,
        base,
        indent,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        newline,
        space,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        sourceMap,
        sourceCode,
        preserveBlankLines,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;
    estraverse = require("npm:estraverse@1.9.3");
    esutils = require("npm:esutils@1.1.6");
    Syntax = estraverse.Syntax;
    function isExpression(node) {
      return CodeGenerator.Expression.hasOwnProperty(node.type);
    }
    function isStatement(node) {
      return CodeGenerator.Statement.hasOwnProperty(node.type);
    }
    Precedence = {
      Sequence: 0,
      Yield: 1,
      Await: 1,
      Assignment: 1,
      Conditional: 2,
      ArrowFunction: 2,
      LogicalOR: 3,
      LogicalAND: 4,
      BitwiseOR: 5,
      BitwiseXOR: 6,
      BitwiseAND: 7,
      Equality: 8,
      Relational: 9,
      BitwiseSHIFT: 10,
      Additive: 11,
      Multiplicative: 12,
      Unary: 13,
      Postfix: 14,
      Call: 15,
      New: 16,
      TaggedTemplate: 17,
      Member: 18,
      Primary: 19
    };
    BinaryPrecedence = {
      '||': Precedence.LogicalOR,
      '&&': Precedence.LogicalAND,
      '|': Precedence.BitwiseOR,
      '^': Precedence.BitwiseXOR,
      '&': Precedence.BitwiseAND,
      '==': Precedence.Equality,
      '!=': Precedence.Equality,
      '===': Precedence.Equality,
      '!==': Precedence.Equality,
      'is': Precedence.Equality,
      'isnt': Precedence.Equality,
      '<': Precedence.Relational,
      '>': Precedence.Relational,
      '<=': Precedence.Relational,
      '>=': Precedence.Relational,
      'in': Precedence.Relational,
      'instanceof': Precedence.Relational,
      '<<': Precedence.BitwiseSHIFT,
      '>>': Precedence.BitwiseSHIFT,
      '>>>': Precedence.BitwiseSHIFT,
      '+': Precedence.Additive,
      '-': Precedence.Additive,
      '*': Precedence.Multiplicative,
      '%': Precedence.Multiplicative,
      '/': Precedence.Multiplicative
    };
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
    function getDefaultOptions() {
      return {
        indent: null,
        base: null,
        parse: null,
        comment: false,
        format: {
          indent: {
            style: '    ',
            base: 0,
            adjustMultilineComment: false
          },
          newline: '\n',
          space: ' ',
          json: false,
          renumber: false,
          hexadecimal: false,
          quotes: 'single',
          escapeless: false,
          compact: false,
          parentheses: true,
          semicolons: true,
          safeConcatenation: false,
          preserveBlankLines: false
        },
        moz: {
          comprehensionExpressionStartsWithAssignment: false,
          starlessGenerator: false
        },
        sourceMap: null,
        sourceMapRoot: null,
        sourceMapWithCode: false,
        directive: false,
        raw: true,
        verbatim: null,
        sourceCode: null
      };
    }
    function stringRepeat(str, num) {
      var result = '';
      for (num |= 0; num > 0; num >>>= 1, str += str) {
        if (num & 1) {
          result += str;
        }
      }
      return result;
    }
    isArray = Array.isArray;
    if (!isArray) {
      isArray = function isArray(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
      };
    }
    function hasLineTerminator(str) {
      return (/[\r\n]/g).test(str);
    }
    function endsWithLineTerminator(str) {
      var len = str.length;
      return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }
    function merge(target, override) {
      var key;
      for (key in override) {
        if (override.hasOwnProperty(key)) {
          target[key] = override[key];
        }
      }
      return target;
    }
    function updateDeeply(target, override) {
      var key,
          val;
      function isHashObject(target) {
        return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
      }
      for (key in override) {
        if (override.hasOwnProperty(key)) {
          val = override[key];
          if (isHashObject(val)) {
            if (isHashObject(target[key])) {
              updateDeeply(target[key], val);
            } else {
              target[key] = updateDeeply({}, val);
            }
          } else {
            target[key] = val;
          }
        }
      }
      return target;
    }
    function generateNumber(value) {
      var result,
          point,
          temp,
          exponent,
          pos;
      if (value !== value) {
        throw new Error('Numeric literal whose value is NaN');
      }
      if (value < 0 || (value === 0 && 1 / value < 0)) {
        throw new Error('Numeric literal whose value is negative');
      }
      if (value === 1 / 0) {
        return json ? 'null' : renumber ? '1e400' : '1e+400';
      }
      result = '' + value;
      if (!renumber || result.length < 3) {
        return result;
      }
      point = result.indexOf('.');
      if (!json && result.charCodeAt(0) === 0x30 && point === 1) {
        point = 0;
        result = result.slice(1);
      }
      temp = result;
      result = result.replace('e+', 'e');
      exponent = 0;
      if ((pos = temp.indexOf('e')) > 0) {
        exponent = +temp.slice(pos + 1);
        temp = temp.slice(0, pos);
      }
      if (point >= 0) {
        exponent -= temp.length - point - 1;
        temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
      }
      pos = 0;
      while (temp.charCodeAt(temp.length + pos - 1) === 0x30) {
        --pos;
      }
      if (pos !== 0) {
        exponent -= pos;
        temp = temp.slice(0, pos);
      }
      if (exponent !== 0) {
        temp += 'e' + exponent;
      }
      if ((temp.length < result.length || (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) && +temp === value) {
        result = temp;
      }
      return result;
    }
    function escapeRegExpCharacter(ch, previousIsBackslash) {
      if ((ch & ~1) === 0x2028) {
        return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
      } else if (ch === 10 || ch === 13) {
        return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
      }
      return String.fromCharCode(ch);
    }
    function generateRegExp(reg) {
      var match,
          result,
          flags,
          i,
          iz,
          ch,
          characterInBrack,
          previousIsBackslash;
      result = reg.toString();
      if (reg.source) {
        match = result.match(/\/([^/]*)$/);
        if (!match) {
          return result;
        }
        flags = match[1];
        result = '';
        characterInBrack = false;
        previousIsBackslash = false;
        for (i = 0, iz = reg.source.length; i < iz; ++i) {
          ch = reg.source.charCodeAt(i);
          if (!previousIsBackslash) {
            if (characterInBrack) {
              if (ch === 93) {
                characterInBrack = false;
              }
            } else {
              if (ch === 47) {
                result += '\\';
              } else if (ch === 91) {
                characterInBrack = true;
              }
            }
            result += escapeRegExpCharacter(ch, previousIsBackslash);
            previousIsBackslash = ch === 92;
          } else {
            result += escapeRegExpCharacter(ch, previousIsBackslash);
            previousIsBackslash = false;
          }
        }
        return '/' + result + '/' + flags;
      }
      return result;
    }
    function escapeAllowedCharacter(code, next) {
      var hex;
      if (code === 0x08) {
        return '\\b';
      }
      if (code === 0x0C) {
        return '\\f';
      }
      if (code === 0x09) {
        return '\\t';
      }
      hex = code.toString(16).toUpperCase();
      if (json || code > 0xFF) {
        return '\\u' + '0000'.slice(hex.length) + hex;
      } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
        return '\\0';
      } else if (code === 0x000B) {
        return '\\x0B';
      } else {
        return '\\x' + '00'.slice(hex.length) + hex;
      }
    }
    function escapeDisallowedCharacter(code) {
      if (code === 0x5C) {
        return '\\\\';
      }
      if (code === 0x0A) {
        return '\\n';
      }
      if (code === 0x0D) {
        return '\\r';
      }
      if (code === 0x2028) {
        return '\\u2028';
      }
      if (code === 0x2029) {
        return '\\u2029';
      }
      throw new Error('Incorrectly classified character');
    }
    function escapeDirective(str) {
      var i,
          iz,
          code,
          quote;
      quote = quotes === 'double' ? '"' : '\'';
      for (i = 0, iz = str.length; i < iz; ++i) {
        code = str.charCodeAt(i);
        if (code === 0x27) {
          quote = '"';
          break;
        } else if (code === 0x22) {
          quote = '\'';
          break;
        } else if (code === 0x5C) {
          ++i;
        }
      }
      return quote + str + quote;
    }
    function escapeString(str) {
      var result = '',
          i,
          len,
          code,
          singleQuotes = 0,
          doubleQuotes = 0,
          single,
          quote;
      for (i = 0, len = str.length; i < len; ++i) {
        code = str.charCodeAt(i);
        if (code === 0x27) {
          ++singleQuotes;
        } else if (code === 0x22) {
          ++doubleQuotes;
        } else if (code === 0x2F && json) {
          result += '\\';
        } else if (esutils.code.isLineTerminator(code) || code === 0x5C) {
          result += escapeDisallowedCharacter(code);
          continue;
        } else if ((json && code < 0x20) || !(json || escapeless || (code >= 0x20 && code <= 0x7E))) {
          result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
          continue;
        }
        result += String.fromCharCode(code);
      }
      single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
      quote = single ? '\'' : '"';
      if (!(single ? singleQuotes : doubleQuotes)) {
        return quote + result + quote;
      }
      str = result;
      result = quote;
      for (i = 0, len = str.length; i < len; ++i) {
        code = str.charCodeAt(i);
        if ((code === 0x27 && single) || (code === 0x22 && !single)) {
          result += '\\';
        }
        result += String.fromCharCode(code);
      }
      return result + quote;
    }
    function flattenToString(arr) {
      var i,
          iz,
          elem,
          result = '';
      for (i = 0, iz = arr.length; i < iz; ++i) {
        elem = arr[i];
        result += isArray(elem) ? flattenToString(elem) : elem;
      }
      return result;
    }
    function toSourceNodeWhenNeeded(generated, node) {
      if (!sourceMap) {
        if (isArray(generated)) {
          return flattenToString(generated);
        } else {
          return generated;
        }
      }
      if (node == null) {
        if (generated instanceof SourceNode) {
          return generated;
        } else {
          node = {};
        }
      }
      if (node.loc == null) {
        return new SourceNode(null, null, sourceMap, generated, node.name || null);
      }
      return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
    }
    function noEmptySpace() {
      return (space) ? space : ' ';
    }
    function join(left, right) {
      var leftSource,
          rightSource,
          leftCharCode,
          rightCharCode;
      leftSource = toSourceNodeWhenNeeded(left).toString();
      if (leftSource.length === 0) {
        return [right];
      }
      rightSource = toSourceNodeWhenNeeded(right).toString();
      if (rightSource.length === 0) {
        return [left];
      }
      leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
      rightCharCode = rightSource.charCodeAt(0);
      if ((leftCharCode === 0x2B || leftCharCode === 0x2D) && leftCharCode === rightCharCode || esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode) || leftCharCode === 0x2F && rightCharCode === 0x69) {
        return [left, noEmptySpace(), right];
      } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
        return [left, right];
      }
      return [left, space, right];
    }
    function addIndent(stmt) {
      return [base, stmt];
    }
    function withIndent(fn) {
      var previousBase;
      previousBase = base;
      base += indent;
      fn(base);
      base = previousBase;
    }
    function calculateSpaces(str) {
      var i;
      for (i = str.length - 1; i >= 0; --i) {
        if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
          break;
        }
      }
      return (str.length - 1) - i;
    }
    function adjustMultilineComment(value, specialBase) {
      var array,
          i,
          len,
          line,
          j,
          spaces,
          previousBase,
          sn;
      array = value.split(/\r\n|[\r\n]/);
      spaces = Number.MAX_VALUE;
      for (i = 1, len = array.length; i < len; ++i) {
        line = array[i];
        j = 0;
        while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
          ++j;
        }
        if (spaces > j) {
          spaces = j;
        }
      }
      if (typeof specialBase !== 'undefined') {
        previousBase = base;
        if (array[1][spaces] === '*') {
          specialBase += ' ';
        }
        base = specialBase;
      } else {
        if (spaces & 1) {
          --spaces;
        }
        previousBase = base;
      }
      for (i = 1, len = array.length; i < len; ++i) {
        sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
        array[i] = sourceMap ? sn.join('') : sn;
      }
      base = previousBase;
      return array.join('\n');
    }
    function generateComment(comment, specialBase) {
      if (comment.type === 'Line') {
        if (endsWithLineTerminator(comment.value)) {
          return '//' + comment.value;
        } else {
          var result = '//' + comment.value;
          if (!preserveBlankLines) {
            result += '\n';
          }
          return result;
        }
      }
      if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
        return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
      }
      return '/*' + comment.value + '*/';
    }
    function addComments(stmt, result) {
      var i,
          len,
          comment,
          save,
          tailingToStatement,
          specialBase,
          fragment,
          extRange,
          range,
          prevRange,
          prefix,
          infix,
          suffix,
          count;
      if (stmt.leadingComments && stmt.leadingComments.length > 0) {
        save = result;
        if (preserveBlankLines) {
          comment = stmt.leadingComments[0];
          result = [];
          extRange = comment.extendedRange;
          range = comment.range;
          prefix = sourceCode.substring(extRange[0], range[0]);
          count = (prefix.match(/\n/g) || []).length;
          if (count > 0) {
            result.push(stringRepeat('\n', count));
            result.push(addIndent(generateComment(comment)));
          } else {
            result.push(prefix);
            result.push(generateComment(comment));
          }
          prevRange = range;
          for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
            comment = stmt.leadingComments[i];
            range = comment.range;
            infix = sourceCode.substring(prevRange[1], range[0]);
            count = (infix.match(/\n/g) || []).length;
            result.push(stringRepeat('\n', count));
            result.push(addIndent(generateComment(comment)));
            prevRange = range;
          }
          suffix = sourceCode.substring(range[1], extRange[1]);
          count = (suffix.match(/\n/g) || []).length;
          result.push(stringRepeat('\n', count));
        } else {
          comment = stmt.leadingComments[0];
          result = [];
          if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
            result.push('\n');
          }
          result.push(generateComment(comment));
          if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push('\n');
          }
          for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
            comment = stmt.leadingComments[i];
            fragment = [generateComment(comment)];
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
              fragment.push('\n');
            }
            result.push(addIndent(fragment));
          }
        }
        result.push(addIndent(save));
      }
      if (stmt.trailingComments) {
        if (preserveBlankLines) {
          comment = stmt.trailingComments[0];
          extRange = comment.extendedRange;
          range = comment.range;
          prefix = sourceCode.substring(extRange[0], range[0]);
          count = (prefix.match(/\n/g) || []).length;
          if (count > 0) {
            result.push(stringRepeat('\n', count));
            result.push(addIndent(generateComment(comment)));
          } else {
            result.push(prefix);
            result.push(generateComment(comment));
          }
        } else {
          tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
          specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
          for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
            comment = stmt.trailingComments[i];
            if (tailingToStatement) {
              if (i === 0) {
                result = [result, indent];
              } else {
                result = [result, specialBase];
              }
              result.push(generateComment(comment, specialBase));
            } else {
              result = [result, addIndent(generateComment(comment))];
            }
            if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result = [result, '\n'];
            }
          }
        }
      }
      return result;
    }
    function generateBlankLines(start, end, result) {
      var j,
          newlineCount = 0;
      for (j = start; j < end; j++) {
        if (sourceCode[j] === '\n') {
          newlineCount++;
        }
      }
      for (j = 1; j < newlineCount; j++) {
        result.push(newline);
      }
    }
    function parenthesize(text, current, should) {
      if (current < should) {
        return ['(', text, ')'];
      }
      return text;
    }
    function generateVerbatimString(string) {
      var i,
          iz,
          result;
      result = string.split(/\r\n|\n/);
      for (i = 1, iz = result.length; i < iz; i++) {
        result[i] = newline + base + result[i];
      }
      return result;
    }
    function generateVerbatim(expr, precedence) {
      var verbatim,
          result,
          prec;
      verbatim = expr[extra.verbatim];
      if (typeof verbatim === 'string') {
        result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
      } else {
        result = generateVerbatimString(verbatim.content);
        prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
        result = parenthesize(result, prec, precedence);
      }
      return toSourceNodeWhenNeeded(result, expr);
    }
    function CodeGenerator() {}
    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
      var result,
          noLeadingComment,
          that = this;
      noLeadingComment = !extra.comment || !stmt.leadingComments;
      if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
        return [space, this.generateStatement(stmt, flags)];
      }
      if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
        return ';';
      }
      withIndent(function() {
        result = [newline, addIndent(that.generateStatement(stmt, flags))];
      });
      return result;
    };
    CodeGenerator.prototype.maybeBlockSuffix = function(stmt, result) {
      var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
      if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
        return [result, space];
      }
      if (ends) {
        return [result, base];
      }
      return [result, newline, base];
    };
    function generateIdentifier(node) {
      return toSourceNodeWhenNeeded(node.name, node);
    }
    function generateAsyncPrefix(node, spaceRequired) {
      return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
    }
    function generateStarSuffix(node) {
      var isGenerator = node.generator && !extra.moz.starlessGenerator;
      return isGenerator ? '*' + space : '';
    }
    function generateMethodPrefix(prop) {
      var func = prop.value;
      if (func.async) {
        return generateAsyncPrefix(func, !prop.computed);
      } else {
        return generateStarSuffix(func) ? '*' : '';
      }
    }
    CodeGenerator.prototype.generatePattern = function(node, precedence, flags) {
      if (node.type === Syntax.Identifier) {
        return generateIdentifier(node);
      }
      return this.generateExpression(node, precedence, flags);
    };
    CodeGenerator.prototype.generateFunctionParams = function(node) {
      var i,
          iz,
          result,
          hasDefault;
      hasDefault = false;
      if (node.type === Syntax.ArrowFunctionExpression && !node.rest && (!node.defaults || node.defaults.length === 0) && node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
        result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
      } else {
        result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
        result.push('(');
        if (node.defaults) {
          hasDefault = true;
        }
        for (i = 0, iz = node.params.length; i < iz; ++i) {
          if (hasDefault && node.defaults[i]) {
            result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
          } else {
            result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
          }
          if (i + 1 < iz) {
            result.push(',' + space);
          }
        }
        if (node.rest) {
          if (node.params.length) {
            result.push(',' + space);
          }
          result.push('...');
          result.push(generateIdentifier(node.rest));
        }
        result.push(')');
      }
      return result;
    };
    CodeGenerator.prototype.generateFunctionBody = function(node) {
      var result,
          expr;
      result = this.generateFunctionParams(node);
      if (node.type === Syntax.ArrowFunctionExpression) {
        result.push(space);
        result.push('=>');
      }
      if (node.expression) {
        result.push(space);
        expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
        if (expr.toString().charAt(0) === '{') {
          expr = ['(', expr, ')'];
        }
        result.push(expr);
      } else {
        result.push(this.maybeBlock(node.body, S_TTFF));
      }
      return result;
    };
    CodeGenerator.prototype.generateIterationForStatement = function(operator, stmt, flags) {
      var result = ['for' + space + '('],
          that = this;
      withIndent(function() {
        if (stmt.left.type === Syntax.VariableDeclaration) {
          withIndent(function() {
            result.push(stmt.left.kind + noEmptySpace());
            result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
          });
        } else {
          result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
        }
        result = join(result, operator);
        result = [join(result, that.generateExpression(stmt.right, Precedence.Sequence, E_TTT)), ')'];
      });
      result.push(this.maybeBlock(stmt.body, flags));
      return result;
    };
    CodeGenerator.prototype.generatePropertyKey = function(expr, computed) {
      var result = [];
      if (computed) {
        result.push('[');
      }
      result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));
      if (computed) {
        result.push(']');
      }
      return result;
    };
    CodeGenerator.prototype.generateAssignment = function(left, right, operator, precedence, flags) {
      if (Precedence.Assignment < precedence) {
        flags |= F_ALLOW_IN;
      }
      return parenthesize([this.generateExpression(left, Precedence.Call, flags), space + operator + space, this.generateExpression(right, Precedence.Assignment, flags)], Precedence.Assignment, precedence);
    };
    CodeGenerator.prototype.semicolon = function(flags) {
      if (!semicolons && flags & F_SEMICOLON_OPT) {
        return '';
      }
      return ';';
    };
    CodeGenerator.Statement = {
      BlockStatement: function(stmt, flags) {
        var range,
            content,
            result = ['{', newline],
            that = this;
        withIndent(function() {
          if (stmt.body.length === 0 && preserveBlankLines) {
            range = stmt.range;
            if (range[1] - range[0] > 2) {
              content = sourceCode.substring(range[0] + 1, range[1] - 1);
              if (content[0] === '\n') {
                result = ['{'];
              }
              result.push(content);
            }
          }
          var i,
              iz,
              fragment,
              bodyFlags;
          bodyFlags = S_TFFF;
          if (flags & F_FUNC_BODY) {
            bodyFlags |= F_DIRECTIVE_CTX;
          }
          for (i = 0, iz = stmt.body.length; i < iz; ++i) {
            if (preserveBlankLines) {
              if (i === 0) {
                if (stmt.body[0].leadingComments) {
                  range = stmt.body[0].leadingComments[0].extendedRange;
                  content = sourceCode.substring(range[0], range[1]);
                  if (content[0] === '\n') {
                    result = ['{'];
                  }
                }
                if (!stmt.body[0].leadingComments) {
                  generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                }
              }
              if (i > 0) {
                if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                  generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                }
              }
            }
            if (i === iz - 1) {
              bodyFlags |= F_SEMICOLON_OPT;
            }
            if (stmt.body[i].leadingComments && preserveBlankLines) {
              fragment = that.generateStatement(stmt.body[i], bodyFlags);
            } else {
              fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
            }
            result.push(fragment);
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
              if (preserveBlankLines && i < iz - 1) {
                if (!stmt.body[i + 1].leadingComments) {
                  result.push(newline);
                }
              } else {
                result.push(newline);
              }
            }
            if (preserveBlankLines) {
              if (i === iz - 1) {
                if (!stmt.body[i].trailingComments) {
                  generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                }
              }
            }
          }
        });
        result.push(addIndent('}'));
        return result;
      },
      BreakStatement: function(stmt, flags) {
        if (stmt.label) {
          return 'break ' + stmt.label.name + this.semicolon(flags);
        }
        return 'break' + this.semicolon(flags);
      },
      ContinueStatement: function(stmt, flags) {
        if (stmt.label) {
          return 'continue ' + stmt.label.name + this.semicolon(flags);
        }
        return 'continue' + this.semicolon(flags);
      },
      ClassBody: function(stmt, flags) {
        var result = ['{', newline],
            that = this;
        withIndent(function(indent) {
          var i,
              iz;
          for (i = 0, iz = stmt.body.length; i < iz; ++i) {
            result.push(indent);
            result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
            if (i + 1 < iz) {
              result.push(newline);
            }
          }
        });
        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
          result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
      },
      ClassDeclaration: function(stmt, flags) {
        var result,
            fragment;
        result = ['class ' + stmt.id.name];
        if (stmt.superClass) {
          fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
          result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(stmt.body, S_TFFT));
        return result;
      },
      DirectiveStatement: function(stmt, flags) {
        if (extra.raw && stmt.raw) {
          return stmt.raw + this.semicolon(flags);
        }
        return escapeDirective(stmt.directive) + this.semicolon(flags);
      },
      DoWhileStatement: function(stmt, flags) {
        var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
        result = this.maybeBlockSuffix(stmt.body, result);
        return join(result, ['while' + space + '(', this.generateExpression(stmt.test, Precedence.Sequence, E_TTT), ')' + this.semicolon(flags)]);
      },
      CatchClause: function(stmt, flags) {
        var result,
            that = this;
        withIndent(function() {
          var guard;
          result = ['catch' + space + '(', that.generateExpression(stmt.param, Precedence.Sequence, E_TTT), ')'];
          if (stmt.guard) {
            guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
            result.splice(2, 0, ' if ', guard);
          }
        });
        result.push(this.maybeBlock(stmt.body, S_TFFF));
        return result;
      },
      DebuggerStatement: function(stmt, flags) {
        return 'debugger' + this.semicolon(flags);
      },
      EmptyStatement: function(stmt, flags) {
        return ';';
      },
      ExportDeclaration: function(stmt, flags) {
        var result = ['export'],
            bodyFlags,
            that = this;
        bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;
        if (stmt['default']) {
          result = join(result, 'default');
          if (isStatement(stmt.declaration)) {
            result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
          } else {
            result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
          }
          return result;
        }
        if (stmt.declaration) {
          return join(result, this.generateStatement(stmt.declaration, bodyFlags));
        }
        if (stmt.specifiers) {
          if (stmt.specifiers.length === 0) {
            result = join(result, '{' + space + '}');
          } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
            result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
          } else {
            result = join(result, '{');
            withIndent(function(indent) {
              var i,
                  iz;
              result.push(newline);
              for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                result.push(indent);
                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                  result.push(',' + newline);
                }
              }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push(newline);
            }
            result.push(base + '}');
          }
          if (stmt.source) {
            result = join(result, ['from' + space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)]);
          } else {
            result.push(this.semicolon(flags));
          }
        }
        return result;
      },
      ExpressionStatement: function(stmt, flags) {
        var result,
            fragment;
        function isClassPrefixed(fragment) {
          var code;
          if (fragment.slice(0, 5) !== 'class') {
            return false;
          }
          code = fragment.charCodeAt(5);
          return code === 0x7B || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
        }
        function isFunctionPrefixed(fragment) {
          var code;
          if (fragment.slice(0, 8) !== 'function') {
            return false;
          }
          code = fragment.charCodeAt(8);
          return code === 0x28 || esutils.code.isWhiteSpace(code) || code === 0x2A || esutils.code.isLineTerminator(code);
        }
        function isAsyncPrefixed(fragment) {
          var code,
              i,
              iz;
          if (fragment.slice(0, 5) !== 'async') {
            return false;
          }
          if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
            return false;
          }
          for (i = 6, iz = fragment.length; i < iz; ++i) {
            if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
              break;
            }
          }
          if (i === iz) {
            return false;
          }
          if (fragment.slice(i, i + 8) !== 'function') {
            return false;
          }
          code = fragment.charCodeAt(i + 8);
          return code === 0x28 || esutils.code.isWhiteSpace(code) || code === 0x2A || esutils.code.isLineTerminator(code);
        }
        result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
        fragment = toSourceNodeWhenNeeded(result).toString();
        if (fragment.charCodeAt(0) === 0x7B || isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
          result = ['(', result, ')' + this.semicolon(flags)];
        } else {
          result.push(this.semicolon(flags));
        }
        return result;
      },
      ImportDeclaration: function(stmt, flags) {
        var result,
            cursor,
            that = this;
        if (stmt.specifiers.length === 0) {
          return ['import', space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)];
        }
        result = ['import'];
        cursor = 0;
        if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
          result = join(result, [this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)]);
          ++cursor;
        }
        if (stmt.specifiers[cursor]) {
          if (cursor !== 0) {
            result.push(',');
          }
          if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
            result = join(result, [space, this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)]);
          } else {
            result.push(space + '{');
            if ((stmt.specifiers.length - cursor) === 1) {
              result.push(space);
              result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
              result.push(space + '}' + space);
            } else {
              withIndent(function(indent) {
                var i,
                    iz;
                result.push(newline);
                for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                  result.push(indent);
                  result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                  if (i + 1 < iz) {
                    result.push(',' + newline);
                  }
                }
              });
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
              }
              result.push(base + '}' + space);
            }
          }
        }
        result = join(result, ['from' + space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)]);
        return result;
      },
      VariableDeclarator: function(stmt, flags) {
        var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
        if (stmt.init) {
          return [this.generateExpression(stmt.id, Precedence.Assignment, itemFlags), space, '=', space, this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)];
        }
        return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
      },
      VariableDeclaration: function(stmt, flags) {
        var result,
            i,
            iz,
            node,
            bodyFlags,
            that = this;
        result = [stmt.kind];
        bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;
        function block() {
          node = stmt.declarations[0];
          if (extra.comment && node.leadingComments) {
            result.push('\n');
            result.push(addIndent(that.generateStatement(node, bodyFlags)));
          } else {
            result.push(noEmptySpace());
            result.push(that.generateStatement(node, bodyFlags));
          }
          for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
            node = stmt.declarations[i];
            if (extra.comment && node.leadingComments) {
              result.push(',' + newline);
              result.push(addIndent(that.generateStatement(node, bodyFlags)));
            } else {
              result.push(',' + space);
              result.push(that.generateStatement(node, bodyFlags));
            }
          }
        }
        if (stmt.declarations.length > 1) {
          withIndent(block);
        } else {
          block();
        }
        result.push(this.semicolon(flags));
        return result;
      },
      ThrowStatement: function(stmt, flags) {
        return [join('throw', this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)), this.semicolon(flags)];
      },
      TryStatement: function(stmt, flags) {
        var result,
            i,
            iz,
            guardedHandlers;
        result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
        result = this.maybeBlockSuffix(stmt.block, result);
        if (stmt.handlers) {
          for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
            result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
            if (stmt.finalizer || i + 1 !== iz) {
              result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
            }
          }
        } else {
          guardedHandlers = stmt.guardedHandlers || [];
          for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
            result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
            if (stmt.finalizer || i + 1 !== iz) {
              result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
            }
          }
          if (stmt.handler) {
            if (isArray(stmt.handler)) {
              for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                  result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                }
              }
            } else {
              result = join(result, this.generateStatement(stmt.handler, S_TFFF));
              if (stmt.finalizer) {
                result = this.maybeBlockSuffix(stmt.handler.body, result);
              }
            }
          }
        }
        if (stmt.finalizer) {
          result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
        }
        return result;
      },
      SwitchStatement: function(stmt, flags) {
        var result,
            fragment,
            i,
            iz,
            bodyFlags,
            that = this;
        withIndent(function() {
          result = ['switch' + space + '(', that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT), ')' + space + '{' + newline];
        });
        if (stmt.cases) {
          bodyFlags = S_TFFF;
          for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
            if (i === iz - 1) {
              bodyFlags |= F_SEMICOLON_OPT;
            }
            fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
            result.push(fragment);
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
              result.push(newline);
            }
          }
        }
        result.push(addIndent('}'));
        return result;
      },
      SwitchCase: function(stmt, flags) {
        var result,
            fragment,
            i,
            iz,
            bodyFlags,
            that = this;
        withIndent(function() {
          if (stmt.test) {
            result = [join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)), ':'];
          } else {
            result = ['default:'];
          }
          i = 0;
          iz = stmt.consequent.length;
          if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
            fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
            result.push(fragment);
            i = 1;
          }
          if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
          }
          bodyFlags = S_TFFF;
          for (; i < iz; ++i) {
            if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
              bodyFlags |= F_SEMICOLON_OPT;
            }
            fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
            result.push(fragment);
            if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
              result.push(newline);
            }
          }
        });
        return result;
      },
      IfStatement: function(stmt, flags) {
        var result,
            bodyFlags,
            semicolonOptional,
            that = this;
        withIndent(function() {
          result = ['if' + space + '(', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT), ')'];
        });
        semicolonOptional = flags & F_SEMICOLON_OPT;
        bodyFlags = S_TFFF;
        if (semicolonOptional) {
          bodyFlags |= F_SEMICOLON_OPT;
        }
        if (stmt.alternate) {
          result.push(this.maybeBlock(stmt.consequent, S_TFFF));
          result = this.maybeBlockSuffix(stmt.consequent, result);
          if (stmt.alternate.type === Syntax.IfStatement) {
            result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
          } else {
            result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
          }
        } else {
          result.push(this.maybeBlock(stmt.consequent, bodyFlags));
        }
        return result;
      },
      ForStatement: function(stmt, flags) {
        var result,
            that = this;
        withIndent(function() {
          result = ['for' + space + '('];
          if (stmt.init) {
            if (stmt.init.type === Syntax.VariableDeclaration) {
              result.push(that.generateStatement(stmt.init, S_FFFF));
            } else {
              result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
              result.push(';');
            }
          } else {
            result.push(';');
          }
          if (stmt.test) {
            result.push(space);
            result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
            result.push(';');
          } else {
            result.push(';');
          }
          if (stmt.update) {
            result.push(space);
            result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
            result.push(')');
          } else {
            result.push(')');
          }
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
      },
      ForInStatement: function(stmt, flags) {
        return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
      },
      ForOfStatement: function(stmt, flags) {
        return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
      },
      LabeledStatement: function(stmt, flags) {
        return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
      },
      Program: function(stmt, flags) {
        var result,
            fragment,
            i,
            iz,
            bodyFlags;
        iz = stmt.body.length;
        result = [safeConcatenation && iz > 0 ? '\n' : ''];
        bodyFlags = S_TFTF;
        for (i = 0; i < iz; ++i) {
          if (!safeConcatenation && i === iz - 1) {
            bodyFlags |= F_SEMICOLON_OPT;
          }
          if (preserveBlankLines) {
            if (i === 0) {
              if (!stmt.body[0].leadingComments) {
                generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
              }
            }
            if (i > 0) {
              if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
              }
            }
          }
          fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
          result.push(fragment);
          if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
            if (preserveBlankLines) {
              if (!stmt.body[i + 1].leadingComments) {
                result.push(newline);
              }
            } else {
              result.push(newline);
            }
          }
          if (preserveBlankLines) {
            if (i === iz - 1) {
              if (!stmt.body[i].trailingComments) {
                generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
              }
            }
          }
        }
        return result;
      },
      FunctionDeclaration: function(stmt, flags) {
        return [generateAsyncPrefix(stmt, true), 'function', generateStarSuffix(stmt) || noEmptySpace(), generateIdentifier(stmt.id), this.generateFunctionBody(stmt)];
      },
      ReturnStatement: function(stmt, flags) {
        if (stmt.argument) {
          return [join('return', this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)), this.semicolon(flags)];
        }
        return ['return' + this.semicolon(flags)];
      },
      WhileStatement: function(stmt, flags) {
        var result,
            that = this;
        withIndent(function() {
          result = ['while' + space + '(', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
      },
      WithStatement: function(stmt, flags) {
        var result,
            that = this;
        withIndent(function() {
          result = ['with' + space + '(', that.generateExpression(stmt.object, Precedence.Sequence, E_TTT), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
      }
    };
    merge(CodeGenerator.prototype, CodeGenerator.Statement);
    CodeGenerator.Expression = {
      SequenceExpression: function(expr, precedence, flags) {
        var result,
            i,
            iz;
        if (Precedence.Sequence < precedence) {
          flags |= F_ALLOW_IN;
        }
        result = [];
        for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
          result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
          if (i + 1 < iz) {
            result.push(',' + space);
          }
        }
        return parenthesize(result, Precedence.Sequence, precedence);
      },
      AssignmentExpression: function(expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
      },
      ArrowFunctionExpression: function(expr, precedence, flags) {
        return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
      },
      ConditionalExpression: function(expr, precedence, flags) {
        if (Precedence.Conditional < precedence) {
          flags |= F_ALLOW_IN;
        }
        return parenthesize([this.generateExpression(expr.test, Precedence.LogicalOR, flags), space + '?' + space, this.generateExpression(expr.consequent, Precedence.Assignment, flags), space + ':' + space, this.generateExpression(expr.alternate, Precedence.Assignment, flags)], Precedence.Conditional, precedence);
      },
      LogicalExpression: function(expr, precedence, flags) {
        return this.BinaryExpression(expr, precedence, flags);
      },
      BinaryExpression: function(expr, precedence, flags) {
        var result,
            currentPrecedence,
            fragment,
            leftSource;
        currentPrecedence = BinaryPrecedence[expr.operator];
        if (currentPrecedence < precedence) {
          flags |= F_ALLOW_IN;
        }
        fragment = this.generateExpression(expr.left, currentPrecedence, flags);
        leftSource = fragment.toString();
        if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F && esutils.code.isIdentifierPart(expr.operator.charCodeAt(0))) {
          result = [fragment, noEmptySpace(), expr.operator];
        } else {
          result = join(fragment, expr.operator);
        }
        fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);
        if (expr.operator === '/' && fragment.toString().charAt(0) === '/' || expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
          result.push(noEmptySpace());
          result.push(fragment);
        } else {
          result = join(result, fragment);
        }
        if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
          return ['(', result, ')'];
        }
        return parenthesize(result, currentPrecedence, precedence);
      },
      CallExpression: function(expr, precedence, flags) {
        var result,
            i,
            iz;
        result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
        result.push('(');
        for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
          result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
          if (i + 1 < iz) {
            result.push(',' + space);
          }
        }
        result.push(')');
        if (!(flags & F_ALLOW_CALL)) {
          return ['(', result, ')'];
        }
        return parenthesize(result, Precedence.Call, precedence);
      },
      NewExpression: function(expr, precedence, flags) {
        var result,
            length,
            i,
            iz,
            itemFlags;
        length = expr['arguments'].length;
        itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;
        result = join('new', this.generateExpression(expr.callee, Precedence.New, itemFlags));
        if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
          result.push('(');
          for (i = 0, iz = length; i < iz; ++i) {
            result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
            if (i + 1 < iz) {
              result.push(',' + space);
            }
          }
          result.push(')');
        }
        return parenthesize(result, Precedence.New, precedence);
      },
      MemberExpression: function(expr, precedence, flags) {
        var result,
            fragment;
        result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];
        if (expr.computed) {
          result.push('[');
          result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
          result.push(']');
        } else {
          if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.indexOf('.') < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)) {
              result.push('.');
            }
          }
          result.push('.');
          result.push(generateIdentifier(expr.property));
        }
        return parenthesize(result, Precedence.Member, precedence);
      },
      UnaryExpression: function(expr, precedence, flags) {
        var result,
            fragment,
            rightCharCode,
            leftSource,
            leftCharCode;
        fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);
        if (space === '') {
          result = join(expr.operator, fragment);
        } else {
          result = [expr.operator];
          if (expr.operator.length > 2) {
            result = join(result, fragment);
          } else {
            leftSource = toSourceNodeWhenNeeded(result).toString();
            leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
            rightCharCode = fragment.toString().charCodeAt(0);
            if (((leftCharCode === 0x2B || leftCharCode === 0x2D) && leftCharCode === rightCharCode) || (esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode))) {
              result.push(noEmptySpace());
              result.push(fragment);
            } else {
              result.push(fragment);
            }
          }
        }
        return parenthesize(result, Precedence.Unary, precedence);
      },
      YieldExpression: function(expr, precedence, flags) {
        var result;
        if (expr.delegate) {
          result = 'yield*';
        } else {
          result = 'yield';
        }
        if (expr.argument) {
          result = join(result, this.generateExpression(expr.argument, Precedence.Yield, E_TTT));
        }
        return parenthesize(result, Precedence.Yield, precedence);
      },
      AwaitExpression: function(expr, precedence, flags) {
        var result = join(expr.delegate ? 'await*' : 'await', this.generateExpression(expr.argument, Precedence.Await, E_TTT));
        return parenthesize(result, Precedence.Await, precedence);
      },
      UpdateExpression: function(expr, precedence, flags) {
        if (expr.prefix) {
          return parenthesize([expr.operator, this.generateExpression(expr.argument, Precedence.Unary, E_TTT)], Precedence.Unary, precedence);
        }
        return parenthesize([this.generateExpression(expr.argument, Precedence.Postfix, E_TTT), expr.operator], Precedence.Postfix, precedence);
      },
      FunctionExpression: function(expr, precedence, flags) {
        var result = [generateAsyncPrefix(expr, true), 'function'];
        if (expr.id) {
          result.push(generateStarSuffix(expr) || noEmptySpace());
          result.push(generateIdentifier(expr.id));
        } else {
          result.push(generateStarSuffix(expr) || space);
        }
        result.push(this.generateFunctionBody(expr));
        return result;
      },
      ExportBatchSpecifier: function(expr, precedence, flags) {
        return '*';
      },
      ArrayPattern: function(expr, precedence, flags) {
        return this.ArrayExpression(expr, precedence, flags);
      },
      ArrayExpression: function(expr, precedence, flags) {
        var result,
            multiline,
            that = this;
        if (!expr.elements.length) {
          return '[]';
        }
        multiline = expr.elements.length > 1;
        result = ['[', multiline ? newline : ''];
        withIndent(function(indent) {
          var i,
              iz;
          for (i = 0, iz = expr.elements.length; i < iz; ++i) {
            if (!expr.elements[i]) {
              if (multiline) {
                result.push(indent);
              }
              if (i + 1 === iz) {
                result.push(',');
              }
            } else {
              result.push(multiline ? indent : '');
              result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
            }
            if (i + 1 < iz) {
              result.push(',' + (multiline ? newline : space));
            }
          }
        });
        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
          result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push(']');
        return result;
      },
      ClassExpression: function(expr, precedence, flags) {
        var result,
            fragment;
        result = ['class'];
        if (expr.id) {
          result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
        }
        if (expr.superClass) {
          fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
          result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(expr.body, S_TFFT));
        return result;
      },
      MethodDefinition: function(expr, precedence, flags) {
        var result,
            fragment;
        if (expr['static']) {
          result = ['static' + space];
        } else {
          result = [];
        }
        if (expr.kind === 'get' || expr.kind === 'set') {
          fragment = [join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)), this.generateFunctionBody(expr.value)];
        } else {
          fragment = [generateMethodPrefix(expr), this.generatePropertyKey(expr.key, expr.computed), this.generateFunctionBody(expr.value)];
        }
        return join(result, fragment);
      },
      Property: function(expr, precedence, flags) {
        if (expr.kind === 'get' || expr.kind === 'set') {
          return [expr.kind, noEmptySpace(), this.generatePropertyKey(expr.key, expr.computed), this.generateFunctionBody(expr.value)];
        }
        if (expr.shorthand) {
          return this.generatePropertyKey(expr.key, expr.computed);
        }
        if (expr.method) {
          return [generateMethodPrefix(expr), this.generatePropertyKey(expr.key, expr.computed), this.generateFunctionBody(expr.value)];
        }
        return [this.generatePropertyKey(expr.key, expr.computed), ':' + space, this.generateExpression(expr.value, Precedence.Assignment, E_TTT)];
      },
      ObjectExpression: function(expr, precedence, flags) {
        var multiline,
            result,
            fragment,
            that = this;
        if (!expr.properties.length) {
          return '{}';
        }
        multiline = expr.properties.length > 1;
        withIndent(function() {
          fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
        });
        if (!multiline) {
          if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
            return ['{', space, fragment, space, '}'];
          }
        }
        withIndent(function(indent) {
          var i,
              iz;
          result = ['{', newline, indent, fragment];
          if (multiline) {
            result.push(',' + newline);
            for (i = 1, iz = expr.properties.length; i < iz; ++i) {
              result.push(indent);
              result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
              if (i + 1 < iz) {
                result.push(',' + newline);
              }
            }
          }
        });
        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
          result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
      },
      ObjectPattern: function(expr, precedence, flags) {
        var result,
            i,
            iz,
            multiline,
            property,
            that = this;
        if (!expr.properties.length) {
          return '{}';
        }
        multiline = false;
        if (expr.properties.length === 1) {
          property = expr.properties[0];
          if (property.value.type !== Syntax.Identifier) {
            multiline = true;
          }
        } else {
          for (i = 0, iz = expr.properties.length; i < iz; ++i) {
            property = expr.properties[i];
            if (!property.shorthand) {
              multiline = true;
              break;
            }
          }
        }
        result = ['{', multiline ? newline : ''];
        withIndent(function(indent) {
          var i,
              iz;
          for (i = 0, iz = expr.properties.length; i < iz; ++i) {
            result.push(multiline ? indent : '');
            result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
            if (i + 1 < iz) {
              result.push(',' + (multiline ? newline : space));
            }
          }
        });
        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
          result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push('}');
        return result;
      },
      ThisExpression: function(expr, precedence, flags) {
        return 'this';
      },
      Identifier: function(expr, precedence, flags) {
        return generateIdentifier(expr);
      },
      ImportDefaultSpecifier: function(expr, precedence, flags) {
        return generateIdentifier(expr.id);
      },
      ImportNamespaceSpecifier: function(expr, precedence, flags) {
        var result = ['*'];
        if (expr.id) {
          result.push(space + 'as' + noEmptySpace() + generateIdentifier(expr.id));
        }
        return result;
      },
      ImportSpecifier: function(expr, precedence, flags) {
        return this.ExportSpecifier(expr, precedence, flags);
      },
      ExportSpecifier: function(expr, precedence, flags) {
        var result = [expr.id.name];
        if (expr.name) {
          result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(expr.name));
        }
        return result;
      },
      Literal: function(expr, precedence, flags) {
        var raw;
        if (expr.hasOwnProperty('raw') && parse && extra.raw) {
          try {
            raw = parse(expr.raw).body[0].expression;
            if (raw.type === Syntax.Literal) {
              if (raw.value === expr.value) {
                return expr.raw;
              }
            }
          } catch (e) {}
        }
        if (expr.value === null) {
          return 'null';
        }
        if (typeof expr.value === 'string') {
          return escapeString(expr.value);
        }
        if (typeof expr.value === 'number') {
          return generateNumber(expr.value);
        }
        if (typeof expr.value === 'boolean') {
          return expr.value ? 'true' : 'false';
        }
        return generateRegExp(expr.value);
      },
      GeneratorExpression: function(expr, precedence, flags) {
        return this.ComprehensionExpression(expr, precedence, flags);
      },
      ComprehensionExpression: function(expr, precedence, flags) {
        var result,
            i,
            iz,
            fragment,
            that = this;
        result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];
        if (extra.moz.comprehensionExpressionStartsWithAssignment) {
          fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
          result.push(fragment);
        }
        if (expr.blocks) {
          withIndent(function() {
            for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
              fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
              if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                result = join(result, fragment);
              } else {
                result.push(fragment);
              }
            }
          });
        }
        if (expr.filter) {
          result = join(result, 'if' + space);
          fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
          result = join(result, ['(', fragment, ')']);
        }
        if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
          fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
          result = join(result, fragment);
        }
        result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
        return result;
      },
      ComprehensionBlock: function(expr, precedence, flags) {
        var fragment;
        if (expr.left.type === Syntax.VariableDeclaration) {
          fragment = [expr.left.kind, noEmptySpace(), this.generateStatement(expr.left.declarations[0], S_FFFF)];
        } else {
          fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
        }
        fragment = join(fragment, expr.of ? 'of' : 'in');
        fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));
        return ['for' + space + '(', fragment, ')'];
      },
      SpreadElement: function(expr, precedence, flags) {
        return ['...', this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)];
      },
      TaggedTemplateExpression: function(expr, precedence, flags) {
        var itemFlags = E_TTF;
        if (!(flags & F_ALLOW_CALL)) {
          itemFlags = E_TFF;
        }
        var result = [this.generateExpression(expr.tag, Precedence.Call, itemFlags), this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)];
        return parenthesize(result, Precedence.TaggedTemplate, precedence);
      },
      TemplateElement: function(expr, precedence, flags) {
        return expr.value.raw;
      },
      TemplateLiteral: function(expr, precedence, flags) {
        var result,
            i,
            iz;
        result = ['`'];
        for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
          result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
          if (i + 1 < iz) {
            result.push('${' + space);
            result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
            result.push(space + '}');
          }
        }
        result.push('`');
        return result;
      },
      ModuleSpecifier: function(expr, precedence, flags) {
        return this.Literal(expr, precedence, flags);
      }
    };
    merge(CodeGenerator.prototype, CodeGenerator.Expression);
    CodeGenerator.prototype.generateExpression = function(expr, precedence, flags) {
      var result,
          type;
      type = expr.type || Syntax.Property;
      if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
        return generateVerbatim(expr, precedence);
      }
      result = this[type](expr, precedence, flags);
      if (extra.comment) {
        result = addComments(expr, result);
      }
      return toSourceNodeWhenNeeded(result, expr);
    };
    CodeGenerator.prototype.generateStatement = function(stmt, flags) {
      var result,
          fragment;
      result = this[stmt.type](stmt, flags);
      if (extra.comment) {
        result = addComments(stmt, result);
      }
      fragment = toSourceNodeWhenNeeded(result).toString();
      if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' && fragment.charAt(fragment.length - 1) === '\n') {
        result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
      }
      return toSourceNodeWhenNeeded(result, stmt);
    };
    function generateInternal(node) {
      var codegen;
      codegen = new CodeGenerator();
      if (isStatement(node)) {
        return codegen.generateStatement(node, S_TFFF);
      }
      if (isExpression(node)) {
        return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
      }
      throw new Error('Unknown node type: ' + node.type);
    }
    function generate(node, options) {
      var defaultOptions = getDefaultOptions(),
          result,
          pair;
      if (options != null) {
        if (typeof options.indent === 'string') {
          defaultOptions.format.indent.style = options.indent;
        }
        if (typeof options.base === 'number') {
          defaultOptions.format.indent.base = options.base;
        }
        options = updateDeeply(defaultOptions, options);
        indent = options.format.indent.style;
        if (typeof options.base === 'string') {
          base = options.base;
        } else {
          base = stringRepeat(indent, options.format.indent.base);
        }
      } else {
        options = defaultOptions;
        indent = options.format.indent.style;
        base = stringRepeat(indent, options.format.indent.base);
      }
      json = options.format.json;
      renumber = options.format.renumber;
      hexadecimal = json ? false : options.format.hexadecimal;
      quotes = json ? 'double' : options.format.quotes;
      escapeless = options.format.escapeless;
      newline = options.format.newline;
      space = options.format.space;
      if (options.format.compact) {
        newline = space = indent = base = '';
      }
      parentheses = options.format.parentheses;
      semicolons = options.format.semicolons;
      safeConcatenation = options.format.safeConcatenation;
      directive = options.directive;
      parse = json ? null : options.parse;
      sourceMap = options.sourceMap;
      sourceCode = options.sourceCode;
      preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
      extra = options;
      if (sourceMap) {
        if (!exports.browser) {
          SourceNode = require("npm:source-map@0.1.43").SourceNode;
        } else {
          SourceNode = global.sourceMap.SourceNode;
        }
      }
      result = generateInternal(node);
      if (!sourceMap) {
        pair = {
          code: result.toString(),
          map: null
        };
        return options.sourceMapWithCode ? pair : pair.code;
      }
      pair = result.toStringWithSourceMap({
        file: options.file,
        sourceRoot: options.sourceMapRoot
      });
      if (options.sourceContent) {
        pair.map.setSourceContent(options.sourceMap, options.sourceContent);
      }
      if (options.sourceMapWithCode) {
        return pair;
      }
      return pair.map.toString();
    }
    FORMAT_MINIFY = {
      indent: {
        style: '',
        base: 0
      },
      renumber: true,
      hexadecimal: true,
      quotes: 'auto',
      escapeless: true,
      compact: true,
      parentheses: false,
      semicolons: false
    };
    FORMAT_DEFAULTS = getDefaultOptions().format;
    exports.version = require("npm:escodegen@1.6.1/package.json!github:systemjs/plugin-json@0.1.0").version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
  }());
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-path@0.1.0/index", ["npm:path-browserify@0.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('path') : require("npm:path-browserify@0.0.0");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-assert@0.1.0", ["github:jspm/nodelibs-assert@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-assert@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:escodegen@1.6.1", ["npm:escodegen@1.6.1/escodegen"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:escodegen@1.6.1/escodegen");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-path@0.1.0", ["github:jspm/nodelibs-path@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-path@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("lib/nodeUtil", ["npm:lodash@3.10.0", "npm:escodegen@1.6.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  let util = {};
  let _ = require("npm:lodash@3.10.0");
  let escodegen = require("npm:escodegen@1.6.1");
  module.exports = util;
  util.getDefineFunBody = function(node, options) {
    if (this.isDefineModule(node)) {
      return node.expression.arguments[2];
    }
  };
  util.isDefineModule = function(node) {
    let callee;
    let expression;
    if (node.type === 'ExpressionStatement') {
      expression = node.expression;
      callee = expression.callee;
      if (callee.type === 'Identifier' && callee.name === 'define') {
        return true;
      }
    }
  };
  util.astToString = function(ast) {
    if (this.type(ast, 'array')) {
      let tmpArr = [];
      ast.forEach((v) => {
        tmpArr.push(this.astToString(v));
      });
      return tmpArr;
    }
    return escodegen.generate(ast);
  };
  util.getFormattedBaseInfo = function(node) {
    let callee;
    let clonedNode = _.clone(node, true);
    let expression;
    let expArgs;
    let secondArg;
    let oriDeps;
    let oriVars;
    let name;
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
  util.isProgram = function(target) {
    return target && target.type === 'Program';
  };
  util.type = function(target, type) {
    if (typeof type === 'string') {
      return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
    } else if (target) {
      let matched = Object.prototype.toString.call(target).toLowerCase().match(/\[object (\S+)\]/);
      if (matched) {
        return matched[1].toLowerCase();
      }
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:minimatch@2.0.9/minimatch", ["github:jspm/nodelibs-path@0.1.0", "npm:brace-expansion@1.1.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = minimatch;
  minimatch.Minimatch = Minimatch;
  var path = {sep: '/'};
  try {
    path = require("github:jspm/nodelibs-path@0.1.0");
  } catch (er) {}
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = require("npm:brace-expansion@1.1.0");
  var qmark = '[^/]';
  var star = qmark + '*?';
  var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';
  var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';
  var reSpecials = charSet('().*{}+?[]^$\\!');
  function charSet(s) {
    return s.split('').reduce(function(set, c) {
      set[c] = true;
      return set;
    }, {});
  }
  var slashSplit = /\/+/;
  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }
  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function(k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function(k) {
      t[k] = a[k];
    });
    return t;
  }
  minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return minimatch;
    var orig = minimatch;
    var m = function minimatch(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };
    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };
    return m;
  };
  Minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };
  function minimatch(p, pattern, options) {
    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }
    if (!options)
      options = {};
    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }
    if (pattern.trim() === '')
      return p === '';
    return new Minimatch(pattern, options).match(p);
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }
    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }
    if (!options)
      options = {};
    pattern = pattern.trim();
    if (path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }
    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.make();
  }
  Minimatch.prototype.debug = function() {};
  Minimatch.prototype.make = make;
  function make() {
    if (this._made)
      return ;
    var pattern = this.pattern;
    var options = this.options;
    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return ;
    }
    if (!pattern) {
      this.empty = true;
      return ;
    }
    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    if (options.debug)
      this.debug = console.error;
    this.debug(this.pattern, set);
    set = this.globParts = set.map(function(s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);
    set = set.map(function(s, si, set) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);
    set = set.filter(function(s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }
  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate)
      return ;
    for (var i = 0,
        l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }
  minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  };
  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }
    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;
    if (typeof pattern === 'undefined') {
      throw new Error('undefined pattern');
    }
    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      return [pattern];
    }
    return expand(pattern);
  }
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    var options = this.options;
    if (!options.noglobstar && pattern === '**')
      return GLOBSTAR;
    if (pattern === '')
      return '';
    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false;
    var patternListStack = [];
    var negativeLists = [];
    var plType;
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    var patternStart = pattern.charAt(0) === '.' ? '' : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
    var self = this;
    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;
          case '?':
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += '\\' + stateChar;
            break;
        }
        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }
    for (var i = 0,
        len = pattern.length,
        c; (i < len) && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);
      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }
      switch (c) {
        case '/':
          return false;
        case '\\':
          clearStateChar();
          escaping = true;
          continue;
        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);
          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1)
              c = '^';
            re += c;
            continue;
          }
          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;
          if (options.noext)
            clearStateChar();
          continue;
        case '(':
          if (inClass) {
            re += '(';
            continue;
          }
          if (!stateChar) {
            re += '\\(';
            continue;
          }
          plType = stateChar;
          patternListStack.push({
            type: plType,
            start: i - 1,
            reStart: re.length
          });
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;
        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }
          clearStateChar();
          hasMagic = true;
          re += ')';
          var pl = patternListStack.pop();
          plType = pl.type;
          switch (plType) {
            case '!':
              negativeLists.push(pl);
              re += ')[^/]*?)';
              pl.reEnd = re.length;
              break;
            case '?':
            case '+':
            case '*':
              re += plType;
              break;
            case '@':
              break;
          }
          continue;
        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }
          clearStateChar();
          re += '|';
          continue;
        case '[':
          clearStateChar();
          if (inClass) {
            re += '\\' + c;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;
        case ']':
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          }
          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp('[' + cs + ']');
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }
          hasMagic = true;
          inClass = false;
          re += c;
          continue;
        default:
          clearStateChar();
          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }
          re += c;
      }
    }
    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + 3);
      tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function(_, $1, $2) {
        if (!$2) {
          $2 = '\\';
        }
        return $1 + $1 + $2 + '|';
      });
      this.debug('tail=%j\n   %s', tail, tail);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }
    clearStateChar();
    if (escaping) {
      re += '\\\\';
    }
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case '.':
      case '[':
      case '(':
        addPatternStart = true;
    }
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      var dollar = '';
      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast + nlAfter;
      re = newRe;
    }
    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }
    if (addPatternStart) {
      re = patternStart + re;
    }
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }
    if (!hasMagic) {
      return globUnescape(pattern);
    }
    var flags = options.nocase ? 'i' : '';
    var regExp = new RegExp('^' + re + '$', flags);
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }
  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };
  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    var set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';
    var re = set.map(function(pattern) {
      return pattern.map(function(p) {
        return (p === GLOBSTAR) ? twoStar : (typeof p === 'string') ? regExpEscape(p) : p._src;
      }).join('\\\/');
    }).join('|');
    re = '^(?:' + re + ')$';
    if (this.negate)
      re = '^(?!' + re + ').*$';
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  minimatch.match = function(list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function(f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug('match', f, this.pattern);
    if (this.comment)
      return false;
    if (this.empty)
      return f === '';
    if (f === '/' && partial)
      return true;
    var options = this.options;
    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    }
    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);
    var set = this.set;
    this.debug(this.pattern, 'set', set);
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename)
        break;
    }
    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate)
          return true;
        return !this.negate;
      }
    }
    if (options.flipNegate)
      return false;
    return this.negate;
  }
  Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;
    this.debug('matchOne', {
      'this': this,
      file: file,
      pattern: pattern
    });
    this.debug('matchOne', file.length, pattern.length);
    for (var fi = 0,
        pi = 0,
        fl = file.length,
        pl = pattern.length; (fi < fl) && (pi < pl); fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false)
        return false;
      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug('** at the end');
          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' || (!options.dot && file[fi].charAt(0) === '.'))
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === '.' || swallowee === '..' || (!options.dot && swallowee.charAt(0) === '.')) {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            }
            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }
        if (partial) {
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl)
            return true;
        }
        return false;
      }
      var hit;
      if (typeof p === 'string') {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
      return emptyFileEnd;
    }
    throw new Error('wtf?');
  };
  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }
  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:minimatch@2.0.9", ["npm:minimatch@2.0.9/minimatch"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:minimatch@2.0.9/minimatch");
  global.define = __define;
  return module.exports;
});

System.register("npm:glob@5.0.14/glob", ["github:jspm/nodelibs-fs@0.1.2", "npm:minimatch@2.0.9", "npm:inherits@2.0.1", "github:jspm/nodelibs-events@0.1.1", "github:jspm/nodelibs-path@0.1.0", "github:jspm/nodelibs-assert@0.1.0", "npm:path-is-absolute@1.0.0", "npm:glob@5.0.14/sync", "npm:glob@5.0.14/common", "npm:inflight@1.0.4", "github:jspm/nodelibs-util@0.1.0", "npm:once@1.3.2", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    module.exports = glob;
    var fs = require("github:jspm/nodelibs-fs@0.1.2");
    var minimatch = require("npm:minimatch@2.0.9");
    var Minimatch = minimatch.Minimatch;
    var inherits = require("npm:inherits@2.0.1");
    var EE = require("github:jspm/nodelibs-events@0.1.1").EventEmitter;
    var path = require("github:jspm/nodelibs-path@0.1.0");
    var assert = require("github:jspm/nodelibs-assert@0.1.0");
    var isAbsolute = require("npm:path-is-absolute@1.0.0");
    var globSync = require("npm:glob@5.0.14/sync");
    var common = require("npm:glob@5.0.14/common");
    var alphasort = common.alphasort;
    var alphasorti = common.alphasorti;
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require("npm:inflight@1.0.4");
    var util = require("github:jspm/nodelibs-util@0.1.0");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require("npm:once@1.3.2");
    function glob(pattern, options, cb) {
      if (typeof options === 'function')
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError('callback provided to sync glob');
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    glob.hasMagic = function(pattern, options_) {
      var options = util._extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== 'string')
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError('callback provided to sync glob');
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === 'function') {
        cb = once(cb);
        this.on('error', cb);
        this.on('end', function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      var n = this.minimatch.set.length;
      this._processing = 0;
      this.matches = new Array(n);
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      function done() {
        --self._processing;
        if (self._processing <= 0)
          self._finish();
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return ;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit('end', this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return ;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        fs.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === 'stat')
            set[p] = true;
          else
            self.emit('error', er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit('abort');
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit('pause');
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit('resume');
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === 'function');
      if (this.aborted)
        return ;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return ;
      }
      var n = 0;
      while (typeof pattern[n] === 'string') {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join('/'), index, cb);
          return ;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join('/');
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = '.';
      else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = '/' + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === '.';
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== '.' || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== '/')
              e = prefix + '/' + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === '/' && !this.nomount) {
            e = path.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== '/')
            e = prefix + '/' + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return ;
      if (this.matches[index][e])
        return ;
      if (isIgnored(this, e))
        return ;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return ;
      }
      var abs = this._makeAbs(e);
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === 'DIR' || Array.isArray(c))
          return ;
      }
      if (this.mark)
        e = this._mark(e);
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit('stat', e, st);
      this.emit('match', e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return ;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = 'lstat\0' + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er)
          return cb();
        var isSym = lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && !lstat.isDirectory()) {
          self.cache[abs] = 'FILE';
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return ;
      cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
      if (!cb)
        return ;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === 'FILE')
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self = this;
      fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return ;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === '/')
            e = abs + e;
          else
            e = abs + '/' + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return ;
      switch (er.code) {
        case 'ENOTSUP':
        case 'ENOTDIR':
          this.cache[this._makeAbs(f)] = 'FILE';
          break;
        case 'ENOENT':
        case 'ELOOP':
        case 'ENAMETOOLONG':
        case 'UNKNOWN':
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit('error', er);
            this.abort();
          }
          if (!this.silent)
            console.error('glob error', er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === '.' && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === '/') {
          prefix = path.join(this.root, prefix);
        } else {
          prefix = path.resolve(this.root, prefix);
          if (trail)
            prefix += '/';
        }
      }
      if (process.platform === 'win32')
        prefix = prefix.replace(/\\/g, '/');
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === '/';
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = 'DIR';
        if (!needDir || c === 'DIR')
          return cb(null, c);
        if (needDir && c === 'FILE')
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== undefined) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? 'DIR' : 'FILE';
          if (needDir && type === 'FILE')
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight('stat\0' + abs, lstatcb_);
      if (statcb)
        fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return fs.stat(abs, function(er, stat) {
            if (er)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er, stat, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === '/';
      this.statCache[abs] = stat;
      if (abs.slice(-1) === '/' && !stat.isDirectory())
        return cb(null, false, stat);
      var c = stat.isDirectory() ? 'DIR' : 'FILE';
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c !== 'DIR')
        return cb();
      return cb(null, c, stat);
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:glob@5.0.14", ["npm:glob@5.0.14/glob"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:glob@5.0.14/glob");
  global.define = __define;
  return module.exports;
});

System.register("lib/index", ["npm:glob@5.0.14", "npm:fs@0.0.2", "npm:path@0.11.14", "npm:async@1.4.0", "npm:lodash@3.10.0", "lib/nodeUtil", "lib/templateFactory", "lib/defineScope", "lib/util"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  let glob = require("npm:glob@5.0.14");
  let fs = require("npm:fs@0.0.2");
  let path = require("npm:path@0.11.14");
  let async = require("npm:async@1.4.0");
  let _ = require("npm:lodash@3.10.0");
  let nUtil = require("lib/nodeUtil");
  let tempateMap = require("lib/templateFactory");
  let defineScope = require("lib/defineScope");
  let util = require("lib/util");
  module.exports = opack;
  function opack(options) {
    this.options = _.assign({}, options);
    this._run();
  }
  opack.prototype.entries = function() {
    let entries = [];
    let entriesObj = [];
    let entryOption = this.options.entry = this.options.entry || [];
    entryOption.forEach((item) => {
      let files = glob.sync(item);
      entries = entries.concat(files);
    });
    return entries;
  };
  opack.prototype._run = function() {
    let parallels = [];
    let options = this.options;
    this.entries().forEach((src, k) => {
      parallels.push(() => {
        let instance = new defineScope({src: src});
        let info = instance.inlineDefine();
        let finalContent = info.contents.join('');
        let destPath = outdir(info.name);
        fs.writeFileSync(destPath, finalContent);
      });
    });
    function outdir(name) {
      let m = name.match(RegExp(options.nameRegx));
      if (m) {
        name = m[1];
      }
      return path.join(options.outdir, name + '.js');
    }
    async.parallel(parallels, function() {
      console.log('done');
    });
  };
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=index.js.map
