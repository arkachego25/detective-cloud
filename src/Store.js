// Libraries
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import thunk from 'redux-thunk'

// Reducers
import globalReducer from './Reducers/GlobalReducer'
import indexReducer from './Reducers/IndexReducer'
import loginReducer from './Reducers/LoginReducer'
import registerReducer from './Reducers/RegisterReducer'
import logoutReducer from './Reducers/LogoutReducer'
import analyserReducer from './Reducers/AnalyserReducer'

const store = createStore(
    combineReducers({
        toastr: toastrReducer,
        global: globalReducer,
        index: indexReducer,
        login: loginReducer,
        register: registerReducer,
        logout: logoutReducer,
        analyser: analyserReducer
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

export default store