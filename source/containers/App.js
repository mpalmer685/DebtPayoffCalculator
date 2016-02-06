import React from 'react'
import DevTools from './DevTools'

class App extends React.Component {
    render() {
        return (
            <div>
                <div style={{ position: 'relative' }}>
                    {this.props.children}
                </div>
                <div>
                    {!window.devToolsExtension && <DevTools/>}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element
    ])
}

export default App
