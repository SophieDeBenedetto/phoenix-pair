import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {
  ConnectedRouter as Router,
  routerMiddleware
} from 'react-router-redux'
import {
  Route,
  Link
} from 'react-router-dom'


import configRoutes from './routes'
import App from './views/registrations/new'
import AnotherApp from './views/sessions/new'
import rootReducer from './reducers'

const history = createHistory()
const rMiddleware = routerMiddleware(history)

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, rMiddleware)
)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        {configRoutes(store)}
      </div>
    </Router>
  </Provider>,
  document.getElementById('main_container')
);
