import keymirror from 'keymirror'
import dispatchAction from './dispatchAction'

export const AccountFormTypes = keymirror({
    UPDATE_FORM: null,
    RESET_FORM: null,
    ADD_ACCOUNT: null
})

export function updateForm(key, value) {
    const action = {
        type: AccountFormTypes.UPDATE_FORM,
        formKey: key,
        formValue: value
    }

    return dispatchAction(action)
}

export function resetForm() {
    return dispatchAction({ type: AccountFormTypes.RESET_FORM })
}

export function addAccount(account) {
    const action = {
        type: AccountFormTypes.ADD_ACCOUNT,
        account
    }

    return dispatchAction(action)
}
