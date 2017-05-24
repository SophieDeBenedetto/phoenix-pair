// import React                    from 'react';
// import ReactDOM                 from 'react-dom';
// import { createBrowserHistory } from 'history';
// import { syncHistoryWithStore } from 'react-router-redux';
// import configureStore           from './store';
// import Root                     from './containers/root';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'


// const store = configureStore(createBrowserHistory());
// debugger;
// const history = createBrowserHistory()
// const target = document.getElementById('main_container');
// const node = <Root routerHistory={history} store={store} />;

// ReactDOM.render(node, target);

import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios'
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
// import App from './App';
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
