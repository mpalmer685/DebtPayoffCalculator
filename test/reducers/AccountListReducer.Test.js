import { expect } from 'chai'
import reducer from 'reducers/AccountListReducer'
import { AccountFormTypes } from 'actions/AccountActionCreators'
import Account from 'models/Account'

describe('AccountListReducer', () => {
    it('should ignore unknown actions', () => {
        expect(reducer(undefined, { type: 'unknown' })).to.eql([])
        expect(reducer([], { type: 'unknown' })).to.eql([])
    })

    it('should handle adding an account', () => {
        expect(reducer([], {
            type: AccountFormTypes.ADD_ACCOUNT,
            account: new Account()
        })).to.eql([new Account()])
    })

    it('should not mutate the initial state', () => {
        const initialState = []
        Object.freeze(initialState)

        reducer(
            initialState,
            {
                type: AccountFormTypes.ADD_ACCOUNT,
                account: new Account()
            }
        )

        expect(initialState).to.eql([])
    })
})
