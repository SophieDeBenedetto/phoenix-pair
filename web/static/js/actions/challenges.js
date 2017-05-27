import Constants              from '../constants';
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from '../utils';

const Actions = {
  fetchChallenges: () => {
    return dispatch => {
      httpGet('/api/v1/challenges')
      .then((data) => {
        dispatch({
          type: Constants.CHALLENGES_RECEIVED,
          challenges: data.challenges
        });
      });
    };
  }
};

export default Actions;