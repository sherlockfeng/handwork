const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index.js', './public/index.js'],
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)/,
                include: [path.resolve('src'), path.resolve('public')],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 打包输出HTML
            title: 'Reactive',
            filename: 'index.html',
            template: 'public/index.html',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
