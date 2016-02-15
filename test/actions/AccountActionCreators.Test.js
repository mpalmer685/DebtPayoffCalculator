import { expect } from 'chai'
import Account from 'models/Account'
import * as AccountActions from 'actions/AccountActionCreators'

describe('AccountActionCreators', () => {
    const dispatchExpect = (actionCreator, ex) => {
        actionCreator(action => {
            ex(action)
        })
    }

    describe('updateForm', () => {
        it('dispatches an UPDATE_FORM action', () => {
            dispatchExpect(AccountActions.updateForm('key', 'value'), action => {
                expect(action).to.contain.key('type')
                expect(action.type).to.equal(AccountActions.AccountFormTypes.UPDATE_FORM)
            })
        })

        it('includes the key and value to update', () => {
            dispatchExpect(AccountActions.updateForm('name', 'nameValue'), action => {
                expect(action).to.contain.keys('formKey', 'formValue')
                expect(action.formKey).to.equal('name')
                expect(action.formValue).to.equal('nameValue')
            })
        })
    })

    describe('resetForm', () => {
        it('dispatches a RESET_FORM action', () => {
            dispatchExpect(AccountActions.resetForm(), action => {
                expect(action).to.contain.key('type')
                expect(action.type).to.equal(AccountActions.AccountFormTypes.RESET_FORM)
            })
        })
    })

    describe('addAccount', () => {
        it('dispatches an ADD_ACCOUNT action', () => {
            const account = new Account('name', 'interestRate', 'balance', 'payment')
            dispatchExpect(AccountActions.addAccount(account), action => {
                expect(action).to.have.all.keys('type', 'account')
                expect(action.type).to.equal(AccountActions.AccountFormTypes.ADD_ACCOUNT)
                expect(action.account).to.equal(account)
            })
        })
    })
})
