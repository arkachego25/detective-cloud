// Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

// App
import App from './App'

// Store
import store from './Store'

// Worker
import * as Worker from './Worker'

ReactDOM.render(
    <Provider store={store}>
        <App/>
        <ReduxToastr/>
    </Provider>,
    document.getElementById('root'))
Worker.unregister()