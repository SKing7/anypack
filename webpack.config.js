module.exports = {
    entry: ["./test/index.js"],
    output: {
        path: '',
        filename: 'index.js'
    },
    externals: [
        /^(?!\.\/)/,
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
}
