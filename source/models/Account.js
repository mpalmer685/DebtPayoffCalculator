function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

class Account {
    constructor(name = '', interestRate = '', balance = '', minimumPayment = '') {
        this.name = name
        this.interestRate = interestRate
        this.balance = balance
        this.minimumPayment = minimumPayment
        this.id = generateId()
    }

    isEmpty() {
        return this.name === '' && this.interestRate === '' && this.balance === '' && this.minimumPayment === ''
    }

    isPopulated() {
        return !(this.name === '' || this.interestRate === '' || this.balance === '' || this.minimumPayment === '')
    }
}

export default Account
