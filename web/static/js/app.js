import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './store';
import Root                     from './containers/root';

const store = configureStore(createBrowserHistory());
debugger;
const history = createBrowserHistory()
const target = document.getElementById('main_container');
const node = <Root routerHistory={history} store={store} />;

ReactDOM.render(node, target);
