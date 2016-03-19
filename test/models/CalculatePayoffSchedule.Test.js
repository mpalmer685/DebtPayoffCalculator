import { expect } from 'chai'
import Account from 'models/Account'
import calculate from 'models/CalculatePayoffSchedule'

/*
starting balance
interest accrued
payment
ending balance

[
    {
        month: <month>,
        accounts: [
            {
                accountId,
                startingBalance,
                interestAccrued,
                payment,
                endingBalance
            }
        ]
    }
]
 */

describe('Calculate Payoff Schedule', () => {
    it('should return an empty array for no accounts', () => {
        expect(calculate([], 10)).to.be.an('array')
        expect(calculate([], 10)).to.be.empty
    })

    it('should return an empty array when no account has a balance', () => {
        const paidOffAccount = new Account('test', '0', '0', '0')
        expect(calculate([paidOffAccount], 10)).to.be.empty
        expect(calculate([paidOffAccount, paidOffAccount], 10)).to.be.empty
    })

    it('should return a single payment when the budget is greater than the balance', () => {
        const account = new Account('test', '0', '100', '10')
        expect(calculate([account], 200)).to.eql([
            {
                month: 1,
                accounts: [{
                    accountId: account.accountId,
                    startingBalance: 100,
                    interestAccrued: 0,
                    payment: 100,
                    endingBalance: 0
                }]
            }
        ])
    })

    it('should accrue interest on an account', () => {
        const account = new Account('test', '12', '100', '10')
        expect(calculate([account], 90)).to.eql([
            {
                month: 1,
                accounts: [{
                    accountId: account.accountId,
                    startingBalance: 100,
                    interestAccrued: 0.1,
                    payment: 90,
                    endingBalance: 10.1
                }]
            },
            {
                month: 2,
                accounts: [{
                    accountId: account.accountId,
                    startingBalance: 10.1,
                    interestAccrued: 0,
                    payment: 10.1,
                    endingBalance: 0
                }]
            }
        ])
    })

    
})
