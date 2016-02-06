import { syncHistory } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from 'reducers'
import DevTools from 'containers/DevTools'

export default function (history, initialState) {
    let historyMiddleware = syncHistory(history)

    const finalCreateStore = compose(
        applyMiddleware(thunk, createLogger(), historyMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    )(createStore)

    const store = finalCreateStore(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    historyMiddleware.listenForReplays(store)
    return store
}
