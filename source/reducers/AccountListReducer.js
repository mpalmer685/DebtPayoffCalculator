import { map } from 'lodash'
import Account from 'models/Account'
import { AccountFormTypes } from 'actions/AccountActionCreators'

function loadDefaultState() {
    const storedAccounts = localStorage.getItem('accounts')
    const accounts = storedAccounts ? JSON.parse(storedAccounts) : []
    return map(accounts, account => Object.assign(new Account(), account))
}
const DefaultState = loadDefaultState()

export default function (state = DefaultState, action) {
    switch (action.type) {
    case AccountFormTypes.ADD_ACCOUNT:
        return [...state, action.account]
    default:
        return state
    }
}
