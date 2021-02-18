const path = require('path');

module.exports = {
    entry: './modules/esmodule/test1.js',
    devtool: 'source-map',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve('./modules/dist')
    }
};
