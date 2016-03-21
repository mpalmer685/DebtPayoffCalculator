import keyMirror from 'keymirror'
import { LOCAL_STORAGE, StorageType } from 'middleware/LocalStorage'
import dispatchAction from './dispatchAction'

export const AccountFormTypes = keyMirror({
    UPDATE_FORM: null,
    RESET_FORM: null,
    ADD_ACCOUNT: null,
    DELETE_ACCOUNT: null
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

export function deleteAccount(accountId) {
    const action = {
        [LOCAL_STORAGE]: {
            types: [StorageType.REMOVE_FROM_ARRAY, AccountFormTypes.DELETE_ACCOUNT],
            payload: {
                key: 'accounts',
                shouldRemove: account => account.accountId === accountId
            }
        },
        accountId
    }

    return dispatchAction(action)
}
