import { createStore, applyMiddleware }        from 'redux';
import { createLogger }                        from 'redux-logger'
import thunkMiddleware                         from 'redux-thunk';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers                                from '../reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export default function configureStore() {
  // const reduxRouterMiddleware = syncHistoryWithStore(browserHistory);
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

  return createStoreWithMiddleware(reducers);
}
