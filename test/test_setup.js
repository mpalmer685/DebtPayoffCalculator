import jsdom from 'jsdom'
import enforceNodePath from 'enforce-node-path'

enforceNodePath('./source')

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win

class LocalStorage {
    constructor() {
        this.testData = {}
    }

    setItem(key, value) {
        this.testData[key] = value
    }

    getItem(key) {
        return this.testData[key]
    }
}

global.localStorage = new LocalStorage()

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key]
    }
})
