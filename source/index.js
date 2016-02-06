import React from 'react'
import { render } from 'react-dom'
import { createHistory } from 'history'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import configureStore from 'store/configureStore'
import routes from './routes'

require('./styles/style.less')

const history = createHistory()
const store = configureStore(history)

render(
    <Provider store={store}>
        <Router history={history}>
            {routes(store)}
        </Router>
    </Provider>,
    document.getElementById('debt-payoff-calculator-application')
)
