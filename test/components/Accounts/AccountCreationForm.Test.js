import React from 'react'
import { findDOMNode } from 'react-dom'
import chai from 'chai'
import TestUtils from 'react-addons-test-utils'
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import filter from 'lodash/filter'
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

    it('displays form validation status if present', () => {
        const account = new Account()
        const form = TestUtils.renderIntoDocument(
            <WrappedForm {...actionProps}
                formValidation={{ accountName: 'Account Name Warning' }}
                account={account}/>
        )

        const inputFields = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')
        const warningFields = filter(inputFields, field => {
            if (field.props.help === 'Account Name Warning') {
                console.log(findDOMNode(field).getAttribute('help'))
                return true
            }

            return false
        })
        expect(warningFields).to.have.lengthOf(1)
    })

    it('handles updates to form input')

    it('only enables the reset button if the account is not empty')

    it('handles reset form button clicks')

    it('only enables the submit button if the account is fully populated')

    it('handles submit form button clicks')
})
