import reduce from 'lodash/reduce'
import map from 'lodash/map'
import remove from 'lodash/remove'

function balanceRemaining(accounts) {
    const accumulate = (total, account) => total + account.balance
    return reduce(accounts, accumulate, 0) > 0
}

function totalMonthlyPayment(accounts) {
    const accumulate = (total, account) => total + Math.min(+account.minimumPayment, +account.balance)
    return reduce(accounts, accumulate, 0)
}

function applyPayment(account, payment) {
    const actualPayment = Math.min(+account.balance, payment)
    account.balance -= actualPayment
    return actualPayment
}

function accrueInterest(account) {
    const interestAccrued = (0.01 * account.interestRate / 12) * account.balance
    account.balance += interestAccrued
    return interestAccrued
}

function payAccount(account, budget) {
    const paymentRecord = {
        accountId: account.accountId,
        startingBalance: account.balance
    }

    paymentRecord.payment = applyPayment(account, budget)
    paymentRecord.interestAccrued = accrueInterest(account)
    paymentRecord.endingBalance = account.balance
    return paymentRecord
}

export default function (accounts, budget) {
    let accountData = map(accounts, account => ({
        ...account,
        balance: parseFloat(account.balance),
        interestRate: parseFloat(account.interestRate),
        minimumPayment: parseFloat(account.minimumPayment)
    }))

    const minimumBudget = totalMonthlyPayment(accountData)
    if (minimumBudget > budget) {
        throw new Error(
            `Budget (${budget}) must be greater than or equal to the total monthly minimum payment (${minimumBudget}).`
        )
    }

    function calculatePayment(account, index) {
        const surplus = index === 0 ? budget - minimumBudget : 0
        const budgetForAccount = account.minimumPayment + surplus
        return payAccount(account, budgetForAccount)
    }

    const payments = []
    let month = 1

    while (balanceRemaining(accountData)) {
        remove(accountData, account => account.balance <= 0)

        payments.push({
            month,
            accounts: map(accountData, calculatePayment)
        })
        ++month
    }

    return payments
}
