import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import DevTools from './DevTools'
import { navigateTo } from 'actions/NavigationActionCreators'

class App extends React.Component {
    constructor() {
        super()

        this.handleNavigation = this.handleNavigation.bind(this)
    }

    handleNavigation(event) {
        this.props.navigateTo(event)
    }

    render() {
        return (
            <div className="applicationContainer">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {'Debt Payoff Calculator'}
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight
                         activeKey={this.props.pathname}
                         onSelect={this.handleNavigation}>
                        <NavItem eventKey="/">{'Payoff Calculator'}</NavItem>
                        <NavItem eventKey="/accounts">{'Accounts'}</NavItem>
                    </Nav>
                </Navbar>
                {this.props.children}
                {!window.devToolsExtension && <DevTools/>}
            </div>
        )
    }
}

App.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element
    ]),
    navigateTo: React.PropTypes.func.isRequired,
    pathname: React.PropTypes.string.isRequired
}

App.defaultProps = {
    pathname: '/'
}

function mapStateToProps(state) {
    return {
        pathname: state.routing.location.pathname
    }
}

export default connect(mapStateToProps, { navigateTo })(App)
