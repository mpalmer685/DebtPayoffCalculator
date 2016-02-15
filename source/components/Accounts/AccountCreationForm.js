import React from 'react'
import { Button, ButtonToolbar, Input, Panel } from 'react-bootstrap'
import Account from 'models/Account'

const AccountFormInput = (props) => {
    const handleChange = props.onValueChange.bind(null, props.formKey)
    return (
        <Input bsStyle={props.formValidation[props.formKey] ? 'error' : undefined}
               help={props.formValidation[props.formKey]}
               onChange={handleChange}
               value={props.account[props.formKey]}
               {...props}/>
    )
}

AccountFormInput.propTypes = {
    account: React.PropTypes.object,
    formValidation: React.PropTypes.object.isRequired,
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

const AccountCreationForm = ({ account, formValidation, onFormUpdate, onFormReset, onFormSubmit }) => {
    return (
        <Panel header="Create new account">
            <form>
                <AccountFormTextInput account={account}
                                      formValidation={formValidation}
                                      formKey="name"
                                      onValueChange={onFormUpdate}
                                      label="Account Name"/>
                <AccountFormPercentInput account={account}
                                         formValidation={formValidation}
                                         formKey="interestRate"
                                         onValueChange={onFormUpdate}
                                         label="InterestRate"/>
                <AccountFormCurrencyInput account={account}
                                          formValidation={formValidation}
                                          formKey="balance"
                                          onValueChange={onFormUpdate}
                                          label="Account Balance"/>
                <AccountFormCurrencyInput account={account}
                                          formValidation={formValidation}
                                          formKey="minimumPayment"
                                          onValueChange={onFormUpdate}
                                          label="Minimum Montly Payment"/>
                <div style={{ float: 'right' }}>
                    <ButtonToolbar>
                        <Button bsStyle="danger"
                                disabled={account.isEmpty()}
                                onClick={onFormReset}>
                            {'Reset'}
                        </Button>
                        <Button bsStyle="primary"
                                disabled={!account.isPopulated()}
                                onClick={onFormSubmit}>
                            {'Add Account'}
                        </Button>
                    </ButtonToolbar>
                </div>
            </form>
        </Panel>
    )
}

AccountCreationForm.propTypes = {
    account: React.PropTypes.instanceOf(Account).isRequired,
    formValidation: React.PropTypes.shape({
        name: React.PropTypes.string,
        interestRate: React.PropTypes.string,
        balance: React.PropTypes.string,
        minimumPayment: React.PropTypes.string
    }).isRequired,
    onFormUpdate: React.PropTypes.func.isRequired,
    onFormReset: React.PropTypes.func.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired
}

export { AccountCreationForm }
