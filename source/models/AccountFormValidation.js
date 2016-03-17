function isNameValid(name) {
    if (!name || !name.trim()) {
        return 'Account name must be set'
    }
}

function validateNumber(number, min, max) {
    if (!number || !number.value) {
        return `${number.name} must be set`
    }

    const valueAsNumber = parseFloat(number.value)

    if (isNaN(valueAsNumber)) {
        return `${number.name} must be a number`
    } else if (min && (valueAsNumber < min.value)) {
        return `${number.name} must be greater than or equal to ${min.name || min.value}`
    } else if (max && (valueAsNumber > max.value)) {
        return `${number.name} must be less than or equal to ${max.name || max.value}`
    }
}

function isInterestRateValid(interestRate) {
    return validateNumber(
        {
            value: interestRate,
            name: 'Interest rate'
        },
        {
            value: 0,
            name: 'zero'
        },
        {
            value: 100
        }
    )
}

function isBalanceValid(balance) {
    return validateNumber(
        {
            value: balance,
            name: 'Account balance'
        },
        {
            value: 0,
            name: 'zero'
        }
    )
}

function isMinimumPaymentValid(minimumPayment) {
    return validateNumber(
        {
            value: minimumPayment,
            name: 'Minimum payment'
        },
        {
            value: 0,
            name: 'zero'
        }
    )
}

export default function (account) {
    return {
        name: isNameValid(account.accountName),
        interestRate: isInterestRateValid(account.interestRate),
        balance: isBalanceValid(account.balance),
        minimumPayment: isMinimumPaymentValid(account.minimumPayment)
    }
}
