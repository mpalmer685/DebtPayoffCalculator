import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import map from 'lodash/map'

const AccountRow = ({ account, onRemoveAccount }) => (
    <ListGroupItem>
        <Row>
            <Col xs={10}>
                <h4>{account.name}</h4>
            </Col>
            <Col xs={2}>
                <div className="bottom right"
                     style={{ height: 39 }}>
                    <span style={{ padding: '10px 0' }}>
                        {
                            Number.parseFloat(account.balance)
                                .toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    currencyDisplay: 'symbol'
                                })

                        }
                    </span>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={6}>
                <div>
                    {
                        (Number.parseFloat(account.interestRate) * 0.01)
                            .toLocaleString('en-US', {
                                style: 'percent',
                                minimumFractionDigits: 2
                            })
                    }
                </div>
            </Col>
            <Col xs={6}>
                <div className="right">
                    {
                        Number.parseFloat(account.minimumPayment)
                            .toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                currencyDisplay: 'symbol'
                            }) + ' / month'
                    }
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <div className="right">
                    <a style={{ fontSize: 'smaller' }}
                       onClick={onRemoveAccount}>
                        {'Remove'}
                    </a>
                </div>
            </Col>
        </Row>
    </ListGroupItem>
)

const AccountList = ({ accounts, onRemoveAccount }) => {
    const accountList = map(accounts, account => {
        const handleRemoveAccount = onRemoveAccount.bind(null, account.id)
        return (
            <AccountRow key={account.id}
                        onRemoveAccount={handleRemoveAccount}
                        account={account}/>
        )
    })

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
    accounts: React.PropTypes.array.isRequired,
    onRemoveAccount: React.PropTypes.func.isRequired
}

export default AccountList
