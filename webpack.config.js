var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var hotMiddleware = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: [
        './src/js/index.js',
        hotMiddleware
    ],
    output: {
        path: BUILD_PATH,
        filename: 'dist.js'
    },
    devtool: '#eval-source-map',
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    compact: false
                }
            }
        ]
    }
};
