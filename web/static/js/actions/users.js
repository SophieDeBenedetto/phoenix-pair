import { push }   from 'react-router-redux';
import Constants          from '../constants';
import { httpGet }       from '../utils';
import {setCurrentUser}   from './sessions';

const Actions = {};

Actions.getCurrentUser = () => {
  return dispatch => {
    httpGet('/api/v1/current_user')
    .then((data) => {
      setCurrentUser(dispatch, data.user);
    })
    .catch((error) => {
      error.response.json()
      .then((errorJSON) => {
        dispatch({
          type: Constants.SESSIONS_ERROR,
          errors: errorJSON.errors,
        });
      });
    });
  };
};

export default Actions;
