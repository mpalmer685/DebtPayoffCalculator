'use strict'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')

const Server = {
    host: 'localhost',
    port: 8080,
    address: function () {
        return `http://${this.host}:${this.port}`
    }
}

let devServerConfig = Object.create(require('./webpack.config.dev'))
devServerConfig.entry = [
    `webpack-dev-server/client?${Server.address()}`,
    'webpack/hot/only-dev-server',
    './source/index.js'
]
devServerConfig.output.publicPath = Server.address() + '/'
devServerConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        title: 'Debt Payoff Calculator',
        template: './source/index.html',
        inject: 'body',
        filename: 'index.html'
    })
]

let compiler = webpack(devServerConfig)
new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true,
    publicPath: devServerConfig.output.publicPath,
    watchOptions: {
        poll: 1000
    },
    stats: {
        colors: true
    }
}).listen(Server.port, Server.host, function (error) {
    if (error) {
        console.error(error)
    }

    console.log(`[webpack-dev-server] Listening at ${Server.address()}`)
})
