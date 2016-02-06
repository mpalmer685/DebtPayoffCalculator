import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from 'containers/App'
import Placeholder from 'containers/Placeholder'

const Router = () => (
    <Route path="/"
           component={App}>
        <IndexRoute component={Placeholder}/>
    </Route>
)

export default Router
