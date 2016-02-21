import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { map } from 'lodash'

const AccountRow = ({ account }) => (
    <ListGroupItem>
        <Row>
            <Col xs={12}>
                {account.name}
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                {'Interest Rate: ' + account.interestRate}
                <br/>
                {'Account Balance: ' + account.balance}
                <br/>
                {'Minimum Monthly Payment: ' + account.minimumPayment}
            </Col>
        </Row>
    </ListGroupItem>
)

const AccountList = ({ accounts }) => {
    const accountList = map(accounts, account => (
        <AccountRow key={account.getId()}
                    account={account}/>
    ))

    return (
        <div style={{ height: '90%' }}>
            <Panel header="Accounts">
                <ListGroup fill>
                    {accountList}
                </ListGroup>
            </Panel>
        </div>
    )
}

AccountList.propTypes = {
    accounts: React.PropTypes.array.isRequired
}

export default AccountList
