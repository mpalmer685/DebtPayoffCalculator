import map from 'lodash/map'
import reject from 'lodash/reject'
import merge from 'lodash/merge'
import Account from 'models/Account'
import { AccountFormTypes } from 'actions/AccountActionCreators'

function loadDefaultState() {
    const storedAccounts = localStorage.getItem('accounts')
    const accounts = storedAccounts ? JSON.parse(storedAccounts) : []
    return map(accounts, account => merge(new Account(), account))
}
const DefaultState = loadDefaultState()

export default function (state = DefaultState, action) {
    switch (action.type) {
    case AccountFormTypes.ADD_ACCOUNT:
        return [...state, action.account]
    case AccountFormTypes.DELETE_ACCOUNT:
        return reject(state, account => account.id === action.accountId)
    default:
        return state
    }
}
