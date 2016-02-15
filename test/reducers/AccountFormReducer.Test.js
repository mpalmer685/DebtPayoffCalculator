import { expect } from 'chai'
import reducer from 'reducers/AccountFormReducer'
import { AccountFormTypes } from 'actions/AccountActionCreators'
import Account from 'models/Account'

const emptyForm = {
    name: '',
    interestRate: '',
    balance: '',
    minimumPayment: ''
}

const formWithName = {
    name: 'nameValue',
    interestRate: '',
    balance: '',
    minimumPayment: ''
}

describe('AccountFormReducer', () => {
    it('should ignore unknown actions', () => {
        expect(reducer(undefined, { type: 'unknown' })).to.eql(emptyForm)
        expect(reducer({}, { type: 'unknown' })).to.eql({})
    })

    it('should handle form reset', () => {
        expect(reducer(formWithName, { type: AccountFormTypes.RESET_FORM })).to.eql(emptyForm)
    })

    it('should handle form update', () => {
        expect(reducer(
            emptyForm,
            {
                type: AccountFormTypes.UPDATE_FORM,
                formKey: 'name',
                formValue: 'nameValue'
            }
        )).to.eql(formWithName)
    })

    it('should not mutate the initial state', () => {
        const initialState = Object.assign({}, emptyForm)
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
        expect(reducer(
            formWithName,
            {
                type: AccountFormTypes.ADD_ACCOUNT,
                account: formWithName
            }
        )).to.eql(emptyForm)
    })
})
