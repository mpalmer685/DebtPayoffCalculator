import React from 'react'
import chai from 'chai'
import TestUtils from 'react-addons-test-utils'
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import Account from 'models/Account'
import { AccountCreationForm } from 'components/Accounts/AccountCreationForm'

const expect = chai.expect

const wrap = component => {
    class Wrapper extends React.Component {
        render() {
            return component(this.props)
        }
    }

    Wrapper.displayName = component.name

    return Wrapper
}

describe('AccountCreationForm', () => {
    const WrappedForm = wrap(AccountCreationForm)
    const actionProps = {}

    beforeEach(() => {
        actionProps.onFormUpdate = () => Promise.resolve()
        actionProps.onFormReset = () => Promise.resolve()
        actionProps.onFormSubmit = () => Promise.resolve()
    })

    it('renders an empty account', () => {
        const account = new Account()
        const form = TestUtils.renderIntoDocument(
            <WrappedForm {...actionProps}
                formValidation={{}}
                account={account}/>
        )

        const inputFields = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')
        expect(inputFields).to.have.lengthOf(4)
        forEach(inputFields, field => {
            expect(field.value).to.be.empty
        })
    })

    it('renders the account stored in the state', () => {
        const account = new Account('name', '15', '100', '5')
        const form = TestUtils.renderIntoDocument(
            <WrappedForm {...actionProps}
                formValidation={{}}
                account={account}/>
        )

        const inputFields = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')
        expect(inputFields).to.have.lengthOf(4)
        forEach(inputFields, field => {
            expect(values(account)).to.include(field.value)
        })
    })
})
