import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import AccountFormReducer from './AccountFormReducer'

export default combineReducers({
    currentFormAccount: AccountFormReducer,
    routing: routeReducer
})
