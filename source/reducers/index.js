import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import currentFormAccount from './AccountFormReducer'
import accounts from './AccountListReducer'

export default combineReducers({
    currentFormAccount,
    accounts,
    routing: routeReducer
})
