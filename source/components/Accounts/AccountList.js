import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { map } from 'lodash'

const AccountRow = ({ account }) => (
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
                    <a style={{ fontSize: 'smaller' }}>{'Remove'}</a>
                </div>
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
