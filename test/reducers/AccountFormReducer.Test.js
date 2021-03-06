import { expect } from 'chai'
import omit from 'lodash/omit'
import merge from 'lodash/merge'
import reducer from 'reducers/AccountFormReducer'
import { AccountFormTypes } from 'actions/AccountActionCreators'
import Account from 'models/Account'

const emptyForm = {
    accountName: '',
    interestRate: '',
    balance: '',
    minimumPayment: ''
}

const formWithName = {
    accountName: 'nameValue',
    interestRate: '',
    balance: '',
    minimumPayment: ''
}

describe('AccountFormReducer', () => {
    it('should ignore unknown actions', () => {
        expect(omit(reducer(undefined, { type: 'unknown' }), 'accountId')).to.eql(emptyForm)
        expect(reducer({}, { type: 'unknown' })).to.eql({})
    })

    it('should handle form reset', () => {
        const result = reducer(formWithName, { type: AccountFormTypes.RESET_FORM })
        expect(omit(result, 'accountId')).to.eql(emptyForm)
    })

    it('should handle form update', () => {
        const result = reducer(
            emptyForm,
            {
                type: AccountFormTypes.UPDATE_FORM,
                formKey: 'accountName',
                formValue: 'nameValue'
            }
        )
        expect(omit(result, 'accountId')).to.eql(formWithName)
    })

    it('should not mutate the initial state', () => {
        const initialState = merge({}, emptyForm)
        Object.freeze(initialState)

        reducer(
            initialState,
            {
                type: AccountFormTypes.UPDATE_FORM,
                formKey: 'name',
                formValue: 'nameValue'
            })

        expect(initialState).to.eql(emptyForm)
    })

    it('should edit Account objects on update', () => {
        expect(reducer(
            emptyForm,
            {
                type: AccountFormTypes.UPDATE_FORM,
                formKey: 'name',
                formValue: 'nameValue'
            }
        )).to.be.an.instanceOf(Account)
    })

    it('should clear the current form when an account is added', () => {
        const result = reducer(
            formWithName,
            {
                type: AccountFormTypes.ADD_ACCOUNT,
                account: formWithName
            }
        )
        expect(omit(result, 'accountId')).to.eql(emptyForm)
    })
})
