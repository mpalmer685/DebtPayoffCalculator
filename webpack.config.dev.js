'use strict'
const autoprefixer = require('autoprefixer')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',

    entry: './source/index.js',

    output: {
        path: path.join(__dirname, 'build', 'src'),
        filename: 'bundle.js',
        publicPath: 'src/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react&presets[]=stage-2']
            }
        ]
    },

    resolve: {
        root: path.resolve(__dirname, 'source')
    },

    postcss: function () {
        return [
            autoprefixer({
                browsers: ['last 5 versions', '> 5%', 'ie 9-11']
            })
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Debt Payoff Calculator',
            template: './source/index.html',
            inject: 'body',
            filename: '../index.html'
        })
    ]
}
