import { expect } from 'chai'
import omit from 'lodash/omit'
import Account from 'models/Account'

describe('Account', () => {
    describe('constructor', () => {
        it('should initialize empty strings when called with no arguments', () => {
            const account = new Account()
            expect(omit(account, 'id')).to.eql({
                name: '',
                interestRate: '',
                balance: '',
                minimumPayment: ''
            })
        })

        it('should assign constructor arguments', () => {
            const account = new Account('name', 'interestRate', 'balance', 'minimumPayment')
            expect(omit(account, 'id')).to.eql({
                name: 'name',
                interestRate: 'interestRate',
                balance: 'balance',
                minimumPayment: 'minimumPayment'
            })
        })
    })

    describe('isEmpty', () => {
        it('should return true when all properties are empty strings', () => {
            expect(new Account().isEmpty()).to.equal(true)
        })

        it('should return false when at least one property is a non-empty string', () => {
            expect(new Account('name').isEmpty()).to.equal(false)
        })
    })

    describe('isPopulated', () => {
        it('should return true when all properties are non-empty strings', () => {
            expect(new Account('name', 'interestRate', 'balance', 'minimumPayment').isPopulated()).to.equal(true)
        })

        it('should return false when at least one property is an empty string', () => {
            expect(new Account('name', 'interestRate', 'balance').isPopulated()).to.equal(false)
        })
    })
})
