import { expect } from 'chai'
import Account from 'models/Account'
import validateAccount from 'models/AccountFormValidation'

describe('AccountFormValidation', () => {
    let account

    beforeEach(() => {
        account = new Account()
    })

    describe('name validation', () => {
        it('should return an error when the name is empty', () => {
            expect(validateAccount(account).name).to.equal('Account name must be set')
        })

        it('should return no error when the name is not empty', () => {
            account.accountName = 'name'
            expect(validateAccount(account).name).to.equal(undefined)
        })
    })

    describe('interest rate validation', () => {
        it('should return an error when the interest rate is not set', () => {
            expect(validateAccount(account).interestRate).to.equal('Interest rate must be set')
        })

        it('should return an error when the interest rate is not a number', () => {
            account.interestRate = 'interestRate'
            expect(validateAccount(account).interestRate)
                .to.equal('Interest rate must be a number')
        })

        it('should return an error when the interest rate is outside the range [0, 100]', () => {
            account.interestRate = '-1'
            expect(validateAccount(account).interestRate)
                .to.equal('Interest rate must be greater than or equal to zero')

            account.interestRate = '101'
            expect(validateAccount(account).interestRate)
                .to.equal('Interest rate must be less than or equal to 100')
        })

        it('should return no error when the interest rate is inside the range [0, 100]', () => {
            account.interestRate = '50'
            expect(validateAccount(account).interestRate).to.equal(undefined)
        })
    })

    describe('account balance validation', () => {
        it('should return an error when the account balance is not set', () => {
            expect(validateAccount(account).balance)
                .to.equal('Account balance must be set')
        })

        it('should return an error when the account balance is not a number', () => {
            account.balance = 'balance'
            expect(validateAccount(account).balance)
                .to.equal('Account balance must be a number')
        })

        it('should return an error when the account balance is negative', () => {
            account.balance = '-1'
            expect(validateAccount(account).balance)
                .to.equal('Account balance must be greater than or equal to zero')
        })

        it('should return no error when the account balance is >= 0', () => {
            account.balance = '10'
            expect(validateAccount(account).balance).to.equal(undefined)
        })

        it('should return no error when the account balance is zero', () => {
            account.balance = '0'
            expect(validateAccount(account).balance).to.equal(undefined)
        })
    })

    describe('minimum payment validation', () => {
        it('should return an error when the minimum payment is not set', () => {
            expect(validateAccount(account).minimumPayment)
                .to.equal('Minimum payment must be set')
        })

        it('should return an error when the minimum payment is not a number', () => {
            account.minimumPayment = 'minimumPayment'
            expect(validateAccount(account).minimumPayment)
                .to.equal('Minimum payment must be a number')
        })

        it('should return an error when the minimum payment is negative', () => {
            account.minimumPayment = '-1'
            expect(validateAccount(account).minimumPayment)
                .to.equal('Minimum payment must be greater than or equal to zero')
        })

        it('should return no error when the minimum payment is >= 0', () => {
            account.minimumPayment = '10'
            expect(validateAccount(account).minimumPayment).to.equal(undefined)
        })
    })
})
