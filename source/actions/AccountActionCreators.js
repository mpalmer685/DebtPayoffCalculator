import keymirror from 'keymirror'
import dispatchAction from './dispatchAction'

export const AccountFormTypes = keymirror({
    UPDATE_FORM: null,
    RESET_FORM: null
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
