import keymirror from 'keymirror'
import { LOCAL_STORAGE, StorageType } from 'middleware/LocalStorage'
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
        [LOCAL_STORAGE]: {
            types: [StorageType.APPEND_ARRAY, AccountFormTypes.ADD_ACCOUNT],
            payload: {
                key: 'accounts',
                value: account
            }
        },
        account
    }

    return dispatchAction(action)
}
