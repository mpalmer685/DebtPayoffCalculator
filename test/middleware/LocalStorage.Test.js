import { expect } from 'chai'
import merge from 'lodash/merge'
import map from 'lodash/map'
import storage, { LOCAL_STORAGE, StorageType } from 'middleware/LocalStorage'

function storeAction(action) {
    let dispatched = null
    const dispatch = storage({})(actionAttempt => dispatched = actionAttempt)
    dispatch(action)
    return dispatched
}

describe('LocalStorage Middleware', () => {
    it('should ignore actions without a LOCAL_STORAGE property', () => {
        const action = {
            type: 'unknown'
        }

        expect(storeAction(action)).to.equal(action)
    })

    it('should capture actions with a LOCAL_STORAGE property and return the next action type', () => {
        const action = {
            [LOCAL_STORAGE]: {
                types: [StorageType.APPEND_ARRAY, 'unknown'],
                payload: {
                    key: 'key',
                    value: 'value'
                }
            }
        }

        expect(storeAction(action)).to.eql({ type: 'unknown' })
    })

    it('should throw an error when the next action type is not defined', () => {
        const baseAction = {
            [LOCAL_STORAGE]: {
                payload: {
                    key: 'key',
                    value: 'value'
                }
            }
        }

        const actionWithoutTypes = merge({}, baseAction)
        expect(() => storeAction(actionWithoutTypes)).to.throw('Expected an array of two action types.')

        const actionWithMissingType = merge({}, baseAction, { [LOCAL_STORAGE]: { types: [StorageType.APPEND_ARRAY] } })
        expect(() => storeAction(actionWithMissingType)).to.throw('Expected an array of two action types.')

        const actionWithWrongActionType = merge(
            {},
            baseAction,
            {
                [LOCAL_STORAGE]: {
                    types: [StorageType.APPEND_ARRAY, 1]
                }
            }
        )
        expect(() => storeAction(actionWithWrongActionType)).to.throw('Expected action types to be strings.')
    })

    it('should ignore unknown storage types', () => {
        const action = {
            [LOCAL_STORAGE]: {
                types: ['unknown', 'unknown'],
                payload: {
                    key: 'key',
                    value: 'value'
                }
            }
        }

        expect(storeAction(action)).to.eql({ type: 'unknown' })
    })

    describe('APPEND_ARRAY action', () => {
        const key = 'testArray'
        const action = {
            [LOCAL_STORAGE]: {
                types: [StorageType.APPEND_ARRAY, 'nextAction'],
                payload: {
                    key,
                    value: 'arrayValue'
                }
            }
        }

        beforeEach(() => {
            // Clear the 'accounts' array
            localStorage.setItem(key, undefined)
        })

        it('should create a new array if one does not exist', () => {
            storeAction(action)
            expect(localStorage.getItem(key)).to.equal(JSON.stringify(['arrayValue']))
        })

        it('should append an item to an existing array', () => {
            localStorage.setItem(key, JSON.stringify(['firstValue']))
            storeAction(action)
            expect(localStorage.getItem(key)).to.equal(JSON.stringify(['firstValue', 'arrayValue']))
        })
    })

    describe('REMOVE_FROM_ARRAY action', () => {
        const key = 'testArray'
        const action = {
            [LOCAL_STORAGE]: {
                types: [StorageType.REMOVE_FROM_ARRAY, 'nextAction'],
                payload: {
                    key,
                    idAttribute: 'id',
                    idValue: 2
                }
            }
        }
        const callbackAction = {
            [LOCAL_STORAGE]: {
                types: [StorageType.REMOVE_FROM_ARRAY, 'nextAction'],
                payload: {
                    key,
                    shouldRemove: obj => obj.id === 2
                }
            }
        }

        const buildArray = id => ({ id })

        beforeEach(() => {
            // Clear the test array
            localStorage.setItem(key, undefined)
        })

        it('should remove the item from an existing array', () => {
            const initialArray = map([1, 2, 3, 4], buildArray)
            localStorage.setItem(key, JSON.stringify(initialArray))
            storeAction(action)
            expect(JSON.parse(localStorage.getItem(key))).to.eql(map([1, 3, 4], buildArray))
        })

        it('should remove the item using a callback', () => {
            const initialArray = map([1, 2, 3, 4], buildArray)
            localStorage.setItem(key, JSON.stringify(initialArray))
            storeAction(callbackAction)
            expect(JSON.parse(localStorage.getItem(key))).to.eql(map([1, 3, 4], buildArray))
        })

        it('should ignore an array that does not exist', () => {
            expect(() => storeAction(action)).to.not.throw()
            expect(localStorage.getItem(key)).to.be.undefined
        })
    })
})
