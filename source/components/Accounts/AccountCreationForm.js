import React from 'react'
import { Button, ButtonToolbar, Input, Panel } from 'react-bootstrap'

const AccountCreationForm = ({ account, onFormUpdate, onFormReset }) => {
    const handleNameUpdate = onFormUpdate.bind(null, 'name')
    const handleInterestUpdate = onFormUpdate.bind(null, 'interestRate')
    const handleBalanceUpdate = onFormUpdate.bind(null, 'balance')
    const handleMinimumPaymentUpdate = onFormUpdate.bind(null, 'minimumPayment')

    return (
        <Panel header="Create new account">
            <form>
                <Input type="text"
                       onChange={handleNameUpdate}
                       value={account.name}
                       label="Account Name"/>
                <Input type="text"
                       onChange={handleInterestUpdate}
                       value={account.interestRate}
                       label="Interest Rate"
                       addonAfter="%"/>
                <Input type="number"
                       onChange={handleBalanceUpdate}
                       value={account.balance}
                       label="Account Balance"
                       addonBefore="$"/>
                <Input type="number"
                       onChange={handleMinimumPaymentUpdate}
                       value={account.minimumPayment}
                       label="Minimum Monthly Payment"
                       addonBefore="$"/>
                <div style={{ float: 'right' }}>
                    <ButtonToolbar>
                        <Button bsStyle="danger"
                                onClick={onFormReset}>
                            {'Reset'}
                        </Button>
                        <Button bsStyle="primary">{'Add Account'}</Button>
                    </ButtonToolbar>
                </div>
            </form>
        </Panel>
    )
}

AccountCreationForm.propTypes = {
    account: React.PropTypes.object.isRequired,
    onFormUpdate: React.PropTypes.func.isRequired,
    onFormReset: React.PropTypes.func.isRequired
}

export default AccountCreationForm
