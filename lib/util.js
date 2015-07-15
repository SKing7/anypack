module.exports = {
    dir(src) {
        let arr;
        src = src.replace(/\\/g, '/');
        arr = src.split('/');
        arr.pop();
        return arr.join('/');
    }
}; 
