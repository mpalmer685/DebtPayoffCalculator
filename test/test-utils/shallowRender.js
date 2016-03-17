import TestUtils from 'react-addons-test-utils'

export default function (element) {
    const shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render(element)
    return shallowRenderer.getRenderOutput()
}
