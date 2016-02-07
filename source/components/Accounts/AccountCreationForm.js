import React from 'react'
import { Button, ButtonToolbar, Input, Panel } from 'react-bootstrap'

const AccountFormInput = (props) => {
    const handleChange = props.onValueChange.bind(null, props.formKey)
    return (
        <Input onChange={handleChange}
               value={props.account[props.formKey]}
               {...props}/>
    )
}

AccountFormInput.propTypes = {
    account: React.PropTypes.object,
    formKey: React.PropTypes.string.isRequired,
    onValueChange: React.PropTypes.func.isRequired
}

const AccountFormTextInput = props => (
    <AccountFormInput type="text"
                      {...props}/>
)

const AccountFormPercentInput = props => (
    <AccountFormInput type="number"
                      addonAfter="%"
                      {...props}/>
)

const AccountFormCurrencyInput = props => (
    <AccountFormInput type="number"
                      addonBefore="$"
                      {...props}/>
)

const AccountCreationForm = ({ account, onFormUpdate, onFormReset }) => (
    <Panel header="Create new account">
        <form>
            <AccountFormTextInput account={account}
                                    formKey="name"
                                    onValueChange={onFormUpdate}
                                    label="Account Name"/>
            <AccountFormPercentInput account={account}
                                     formKey="interestRate"
                                     onValueChange={onFormUpdate}
                                     label="InterestRate"/>
            <AccountFormCurrencyInput account={account}
                                      formKey="balance"
                                      onValueChange={onFormUpdate}
                                      label="Account Balance"/>
            <AccountFormCurrencyInput account={account}
                                      formKey="minimumPayment"
                                      onValueChange={onFormUpdate}
                                      label="Minimum Montly Payment"/>
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

AccountCreationForm.propTypes = {
    account: React.PropTypes.object.isRequired,
    onFormUpdate: React.PropTypes.func.isRequired,
    onFormReset: React.PropTypes.func.isRequired
}

export default AccountCreationForm
