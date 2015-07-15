'use strict';

module.exports = {
    dir: function dir(src) {
        var arr = undefined;
        src = src.replace(/\\/g, '/');
        arr = src.split('/');
        arr.pop();
        return arr.join('/');
    }
};