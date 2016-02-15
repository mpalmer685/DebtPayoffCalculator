import keymirror from 'keymirror'

export const LOCAL_STORAGE = 'LOCAL_STORAGE'

export const StorageType = keymirror({
    APPEND_ARRAY: null
})

// noinspection Eslint
export default store => next => action => {
    const storage = action[LOCAL_STORAGE]
    if (typeof storage === 'undefined') {
        return next(action)
    }

    const { types } = storage
    const { key, value } = storage.payload

    if (!Array.isArray(types) || types.length !== 2) {
        throw new Error('Expected an array of two action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[LOCAL_STORAGE]
        return finalAction
    }

    let storeValue
    const [storageType, nextType] = types

    switch (storageType) {
    case StorageType.APPEND_ARRAY:
        const storedValue = localStorage.getItem(key)
        let array = storedValue ? JSON.parse(storedValue) : []
        array = [...array, value]
        storeValue = JSON.stringify(array)
        break
    default:
        return next(actionWith({ type: nextType }))
    }

    localStorage.setItem(key, storeValue)

    return next(actionWith({ type: nextType }))
}
