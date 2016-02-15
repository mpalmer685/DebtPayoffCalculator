import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Account from 'models/Account'
import validateAccount from 'models/AccountFormValidation'
import { updateForm, resetForm } from 'actions/AccountActionCreators'
import AccountCreationForm from 'components/Accounts/AccountCreationForm'

const AccountList = () => (
    <h3>{'Account List'}</h3>
)

class Accounts extends React.Component {
    constructor() {
        super()

        this.state = {
            formValidation: {}
        }

        this.handleFormUpdate = this.handleFormUpdate.bind(this)
        this.handleResetForm = this.handleResetForm.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormUpdate(key, event) {
        this.props.updateForm(key, event.target.value)
    }

    handleResetForm() {
        this.props.resetForm()
    }

    handleFormSubmit() {
        this.setState({ formValidation: validateAccount(this.props.currentFormAccount) })
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <AccountList/>
                    </Col>
                    <Col md={5}
                         mdOffset={1}>
                        <AccountCreationForm account={this.props.currentFormAccount}
                                             formValidation={this.state.formValidation}
                                             onFormUpdate={this.handleFormUpdate}
                                             onFormReset={this.handleResetForm}
                                             onFormSubmit={this.handleFormSubmit}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

Accounts.propTypes = {
    currentFormAccount: React.PropTypes.instanceOf(Account).isRequired,
    updateForm: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        currentFormAccount: state.currentFormAccount
    }
}

export default connect(mapStateToProps, { updateForm, resetForm })(Accounts)
