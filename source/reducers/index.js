import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import currentFormAccount from './AccountFormReducer'

export default combineReducers({
    currentFormAccount,
    routing: routeReducer
})
