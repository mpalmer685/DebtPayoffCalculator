'use strict'
const context = require.context('./', true, /\.Test\.js$/)
context.keys().forEach(function (key) {
    context(key)
})
