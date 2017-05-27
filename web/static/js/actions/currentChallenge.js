import Constants              from '../constants';
import { push }               from 'react-router-redux';
import { Socket }             from 'phoenix';
import { httpGet, httpPost }  from '../utils';

const Actions = {
  connectToChannel: (socket, challengeId) => {
    const channel = socket.channel(`challenges:${challengeId}`);


    channel.join().receive('ok', (response) => {
      dispatch({
        type: Constants.SET_CURRENT_CHALLENGE,
        challenge: response.challenge,
      });

      dispatch({
        type: Constants.CURRENT_CHALLENGE_CHANNEL,
        channel: channel
      })
    });

    channel.on('user:joined', (response) => {
      debugger;
      dispatch({
        type: Constants.CURRENT_CHALLENGE_ADD_PARTICIPANT,
        user: response.user,
      });
    });

    channel.on('user:left', (response) => {
      dispatch({
        type: Constants.CURRENT_CHALLENGE_REMOVE_PARTICIPANT,
        users: response.users,
      });
    });
  },

  addParticipant: (channel, userId) => {
    return dispatch => {
      channel.push('user:join', { user_id: userId })
    };
  },

};

export default Actions;