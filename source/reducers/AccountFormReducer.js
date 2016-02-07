import { merge } from 'lodash'
import Account from 'models/Account'
import { AccountFormTypes } from 'actions/AccountActionCreators'

const DefaultState = new Account('', '', '', '')

export default function (state = DefaultState, action) {
    switch (action.type) {
    case AccountFormTypes.UPDATE_FORM:
        return merge(
            {},
            state,
            { [action.formKey]: action.formValue }
        )
    case AccountFormTypes.RESET_FORM:
        return DefaultState
    default:
        return state
    }
}
