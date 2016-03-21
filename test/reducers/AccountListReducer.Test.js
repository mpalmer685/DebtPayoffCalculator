import { expect } from 'chai'
import omit from 'lodash/omit'
import map from 'lodash/map'
import reducer from 'reducers/AccountListReducer'
import { AccountFormTypes } from 'actions/AccountActionCreators'
import Account from 'models/Account'

describe('AccountListReducer', () => {
    it('should ignore unknown actions', () => {
        expect(reducer(undefined, { type: 'unknown' })).to.eql([])
        expect(reducer([], { type: 'unknown' })).to.eql([])
    })

    it('should handle adding an account', () => {
        const result = reducer([], {
            type: AccountFormTypes.ADD_ACCOUNT,
            account: new Account()
        })
        expect(map(result, account => omit(account, 'accountId'))).to.eql([omit(new Account(), 'accountId')])
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

    it('should load accounts from local storage', () => {
        const account = new Account('name')
        localStorage.setItem('accounts', JSON.stringify([account]))
        expect(reducer(undefined, {})).to.eql([account])
    })

    it('should handle removing an account', () => {
        const initialState = [
            new Account('first'),
            new Account('second'),
            new Account('third')
        ]
        Object.freeze(initialState)

        const action = {
            type: AccountFormTypes.DELETE_ACCOUNT,
            accountId: initialState[1].accountId
        }

        const nextState = reducer(initialState, action)
        expect(nextState).to.eql([initialState[0], initialState[2]])
        expect(nextState).to.not.equal(initialState)
    })
})
