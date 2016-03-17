import merge from 'lodash/merge'
import Account from 'models/Account'
import { AccountFormTypes } from 'actions/AccountActionCreators'

const DefaultState = new Account()

export default function (state = DefaultState, action) {
    switch (action.type) {
    case AccountFormTypes.UPDATE_FORM:
        return merge(
            new Account(),
            state,
            { [action.formKey]: action.formValue }
        )
    case AccountFormTypes.RESET_FORM:
    case AccountFormTypes.ADD_ACCOUNT:
        return DefaultState
    default:
        return state
    }
}
