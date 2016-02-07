import { routeActions } from 'react-router-redux'

export function navigateTo(path) {
    return dispatch => {
        return dispatch(routeActions.push(path))
    }
}
