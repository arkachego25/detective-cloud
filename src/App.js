// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Styles
import 'semantic-ui-css/semantic.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './Styles/BorderStyle.css'
import './Styles/ColourStyle.css'
import './Styles/SpaceStyle.css'
import './Styles/CommonStyle.css'

// Pages
import IndexPage from './Pages/Index/Index'
import PortalPage from './Pages/Portal/Portal'

function mapStateToProps(state) {
    return {
        global: state.global
    }
}

class App extends Component {

    render() {
        return (
            <div className={'full-height bck-' + this.props.global.themeColour + '-25'}>
               <Router>
                    <Route exact path='/' component={IndexPage}></Route>
                    <Route exact path='/portal' component={PortalPage}></Route>
                </Router>
            </div>
        )
    }

}

export default connect(mapStateToProps)(App)