import React from 'react'
import chai from 'chai'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import { Navbar } from 'react-bootstrap'
import App from 'containers/App'

const expect = chai.expect

function simpleReducer(state = {}) {
    return state
}

describe('App Component', () => {
    let store
    let app

    before(() => {
        window.devToolsExtension = function () {}
        store = createStore(simpleReducer, { routing: { location: '' } })

        app = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <App>
                    <div className="testDiv"></div>
                </App>
            </Provider>
        )
    })

    it('renders a navigation bar', () => {
        expect(TestUtils.findRenderedComponentWithType(app, Navbar)).to.exist
    })

    it('renders its children', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(app, 'testDiv')).to.exist
    })
})
