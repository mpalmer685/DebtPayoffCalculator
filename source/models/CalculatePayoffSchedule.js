import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import map from 'lodash/map'

function balanceRemaining(accounts) {
    const accumulate = (total, account) => total + account.balance
    return reduce(accounts, accumulate, 0) > 0
}

function applyPayment(account, payment) {
    const actualPayment = Math.min(account.balance, payment)
    account.balance -= actualPayment
    return actualPayment
}

function accrueInterest(account) {
    const interestAccrued = (0.01 * account.interestRate / 12) * account.balance
    account.balance += interestAccrued
    return interestAccrued
}

export default function (accounts, budget) {
    const accountData = map(accounts, account => ({
        ...account,
        balance: parseFloat(account.balance),
        interestRate: parseFloat(account.interestRate),
        minimumPayment: parseFloat(account.minimumPayment)
    }))

    const pay = account => {
        const paymentRecord = {
            accountId: account.accountId,
            startingBalance: account.balance
        }

        paymentRecord.payment = applyPayment(account, budget)
        paymentRecord.interestAccrued = accrueInterest(account)
        paymentRecord.endingBalance = account.balance
        return paymentRecord
    }

    const payments = []
    let month = 1

    while (balanceRemaining(accountData)) {
        payments.push({
            month,
            accounts: map(accountData, pay)
        })
        ++month
    }

    return payments
}
