import { AccountFormTypes } from 'actions/AccountActionCreators'

const DefaultState = []

export default function (state = DefaultState, action) {
    switch (action.type) {
    case AccountFormTypes.ADD_ACCOUNT:
        return [...state, action.account]
    default:
        return state
    }
}
