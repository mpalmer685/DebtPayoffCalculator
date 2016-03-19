import keyMirror from 'keymirror'
import merge from 'lodash/merge'
import reject from 'lodash/reject'

export const LOCAL_STORAGE = 'LOCAL_STORAGE'

export const StorageType = keyMirror({
    APPEND_ARRAY: null,
    REMOVE_FROM_ARRAY: null
})

export default (/* store */) => next => action => {
    const storage = action[LOCAL_STORAGE]
    if (typeof storage === 'undefined') {
        return next(action)
    }

    const { types } = storage
    const { key } = storage.payload

    const storedValue = localStorage.getItem(key)
    let array = storedValue && storedValue !== 'undefined' ? JSON.parse(storedValue) : []

    if (!Array.isArray(types) || types.length !== 2) {
        throw new Error('Expected an array of two action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = merge({}, action, data)
        delete finalAction[LOCAL_STORAGE]
        return finalAction
    }

    let storeValue
    const [storageType, nextType] = types

    switch (storageType) {
    case StorageType.APPEND_ARRAY:
        const { value } = storage.payload
        array = [...array, value]
        storeValue = JSON.stringify(array)
        break
    case StorageType.REMOVE_FROM_ARRAY:
        if (!storedValue) {
            return next(actionWith({ type: nextType }))
        }
        const { idAttribute, idValue } = storage.payload
        if (idAttribute && idValue) {
            array = reject(array, [idAttribute, idValue])
        } else {
            const { shouldRemove } = storage.payload
            array = reject(array, shouldRemove)
        }
        storeValue = JSON.stringify(array)
        break
    default:
        return next(actionWith({ type: nextType }))
    }

    localStorage.setItem(key, storeValue)

    return next(actionWith({ type: nextType }))
}
