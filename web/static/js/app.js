// import React                    from 'react';
// import ReactDOM                 from 'react-dom';
// import { browserHistory }       from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import configureStore           from './store';
// import Root                     from './containers/root';

// const store = configureStore(browserHistory);
// debugger;
// const history = syncHistoryWithStore(browserHistory, store);
// const target = document.getElementById('main_container');
// const node = <Root routerHistory={history} store={store} />;

// ReactDOM.render(node, target);

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers
import MainLayout                   from './layouts/main';

import RegistrationsNew             from './views/registrations/new';
import SessionsNew                  from './views/sessions/new';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        
        <Route path="/sign_up" component={RegistrationsNew} />
        <Route path="/sign_in" component={SessionsNew} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main_container')
)