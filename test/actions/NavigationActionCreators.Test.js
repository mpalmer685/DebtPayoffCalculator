import { expect } from 'chai'
import { TRANSITION } from 'react-router-redux'
import { navigateTo } from 'actions/NavigationActionCreators'

describe('NavigationActionCreators', () => {
    const dispatchExpect = (actionCreator, ex) => {
        actionCreator(action => {
            ex(action)
        })
    }

    describe('navigateTo', () => {
        it('should dispatch a navigation action', () => {
            dispatchExpect(navigateTo('index'), action => {
                expect(action).to.have.all.keys('type', 'payload')
                expect(action.type).to.equal(TRANSITION)
            })
        })
    })
})
