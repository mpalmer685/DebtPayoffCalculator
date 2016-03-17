function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

class Account {
    constructor(name = '', interestRate = '', balance = '', minimumPayment = '') {
        this.accountName = name
        this.interestRate = interestRate
        this.balance = balance
        this.minimumPayment = minimumPayment
        this.accountId = generateId()
    }

    isEmpty() {
        return this.accountName === '' &&
            this.interestRate === '' &&
            this.balance === '' &&
            this.minimumPayment === ''
    }

    isPopulated() {
        return !(
            this.accountName === '' ||
            this.interestRate === '' ||
            this.balance === '' ||
            this.minimumPayment === ''
        )
    }
}

export default Account
