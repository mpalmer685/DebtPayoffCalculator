import keymirror from 'keymirror'

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

    return dispatch => dispatch(action)
}

export function resetForm() {
    return dispatch => dispatch({ type: AccountFormTypes.RESET_FORM })
}
