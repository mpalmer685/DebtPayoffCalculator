import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

function emptyReducer(state = {}) {
    return state
}

export default combineReducers({
    emptyReducer,
    routing: routeReducer
})
