import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { browserHistory }       from 'react-router';
import configureStore           from './store';
import Root                     from './containers/root';
import { syncHistoryWithStore}  from 'react-router-redux'

const store  = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
const target = document.getElementById('main_container');
const node = <Root routerHistory={history} store={store}/>;

ReactDOM.render(node, target);