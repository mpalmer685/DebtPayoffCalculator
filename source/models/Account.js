class Account {
    constructor(name = '', interestRate = '', balance = '', minimumPayment = '') {
        this.name = name
        this.interestRate = interestRate
        this.balance = balance
        this.minimumPayment = minimumPayment
    }

    isEmpty() {
        return this.name === '' && this.interestRate === '' && this.balance === '' && this.minimumPayment === ''
    }

    isPopulated() {
        return !(this.name === '' || this.interestRate === '' || this.balance === '' || this.minimumPayment === '')
    }
}

export default Account
