import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import { updateForm, resetForm } from 'actions/AccountActionCreators'
import AccountCreationForm from 'components/Accounts/AccountCreationForm'

const AccountList = () => (
    <h3>{'Account List'}</h3>
)

class Accounts extends React.Component {
    constructor() {
        super()

        this.handleFormUpdate = this.handleFormUpdate.bind(this)
        this.handleResetForm = this.handleResetForm.bind(this)
    }

    handleFormUpdate(key, event) {
        this.props.updateForm(key, event.target.value)
    }

    handleResetForm() {
        this.props.resetForm()
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
                                             onFormUpdate={this.handleFormUpdate}
                                             onFormReset={this.handleResetForm}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

Accounts.propTypes = {
    currentFormAccount: React.PropTypes.object.isRequired,
    updateForm: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        currentFormAccount: state.currentFormAccount
    }
}

export default connect(mapStateToProps, { updateForm, resetForm })(Accounts)
