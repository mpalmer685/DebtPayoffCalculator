import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from 'containers/App'

import Accounts from 'containers/Accounts'
import PayoffCalculator from 'containers/PayoffCalculator'

const Router = () => (
    <Route path="/"
           component={App}>
        <IndexRoute component={PayoffCalculator}/>
        <Route path="accounts"
               component={Accounts}/>
    </Route>
)

export default Router
