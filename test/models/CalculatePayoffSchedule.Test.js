import chai from 'chai'
import Account from 'models/Account'
import calculate from 'models/CalculatePayoffSchedule'

const expect = chai.expect

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

    it('should throw an error when the total monthly payment is greater than the budget', () => {
        const account = new Account('test', '0', '100', '50')
        expect(() => calculate([account], 10)).to.throw()
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

    it('should not return payment records for accounts with zero balance', () => {
        const activeAccount = new Account('active', '12', '100', '10')
        const inactiveAccount = new Account('inactive', '12', '0', '10')

        expect(calculate([activeAccount, inactiveAccount], 100)).to.eql([
            {
                month: 1,
                accounts: [{
                    accountId: activeAccount.accountId,
                    startingBalance: 100,
                    payment: 100,
                    interestAccrued: 0,
                    endingBalance: 0
                }]
            }
        ])
    })

    it('should only apply the minimum payment to all but the first account', () => {
        const veryImportantAccount = new Account('very important', '12', '100', '10')
        const lessImportantAccount = new Account('less important', '12', '100', '50')
        expect(calculate([veryImportantAccount, lessImportantAccount], 150)).to.eql([
            {
                month: 1,
                accounts: [
                    {
                        accountId: veryImportantAccount.accountId,
                        startingBalance: 100,
                        interestAccrued: 0,
                        payment: 100,
                        endingBalance: 0
                    },
                    {
                        accountId: lessImportantAccount.accountId,
                        startingBalance: 100,
                        interestAccrued: 0.5,
                        payment: 50,
                        endingBalance: 50.5
                    }
                ]
            },
            {
                month: 2,
                accounts: [
                    {
                        accountId: lessImportantAccount.accountId,
                        startingBalance: 50.5,
                        payment: 50.5,
                        interestAccrued: 0,
                        endingBalance: 0
                    }
                ]
            }
        ])
    })

    it('should spend all available budget on the first account', () => {
        const veryImportantAccount = new Account('very important', '12', '50', '10')
        const lessImportantAccount = new Account('less important', '12', '100', '50')
        const notImportantAccount = new Account('not important', '12', '10', '10')
        expect(calculate([veryImportantAccount, lessImportantAccount, notImportantAccount], 100)[0]).to.eql({
            month: 1,
            accounts: [
                {
                    accountId: veryImportantAccount.accountId,
                    startingBalance: 50,
                    payment: 40,
                    interestAccrued: 0.1,
                    endingBalance: 10.1
                },
                {
                    accountId: lessImportantAccount.accountId,
                    startingBalance: 100,
                    payment: 50,
                    interestAccrued: 0.5,
                    endingBalance: 50.5
                },
                {
                    accountId: notImportantAccount.accountId,
                    startingBalance: 10,
                    payment: 10,
                    interestAccrued: 0,
                    endingBalance: 0
                }
            ]
        })
    })
})
