import React                        from 'react';
import PropTypes                    from 'prop-types';
import { Provider }                 from 'react-redux';
import { Router }   from 'react-router';
import invariant                    from 'invariant';
import { ConnectedRouter }          from 'react-router-redux'

import configRoutes                 from '../routes';

const propTypes = {
  routerHistory: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const Root = ({ routerHistory, store }) => {
  invariant(
    routerHistory,
    '<Root /> needs either a routingContext or routerHistory to render.'
  );

  return (
    <Provider store={store}>
      <ConnectedRouter history={routerHistory}>
        {configRoutes(store)}
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = propTypes;
export default Root;
