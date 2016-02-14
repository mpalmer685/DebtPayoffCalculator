import { expect } from 'chai'
import reducer from 'reducers/AccountFormReducer'
import { AccountFormTypes } from 'actions/AccountActionCreators'

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
})
