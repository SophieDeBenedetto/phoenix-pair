import Constants              from '../constants';
import { push }               from 'react-router-redux';
import { Socket }             from 'phoenix';
import { httpGet, httpPost }  from '../utils';

const Actions = {
  connectToChannel: (socket, challengeId) => {
    return dispatch => {
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
        var users = response.users.map((user) => JSON.parse(user))
        dispatch({
          type: Constants.CURRENT_CHALLENGE_PARTICIPANTS,
          users: users
        });
      });

      channel.on('user:left', (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_PARTICIPANTS,
          users: users
        });
      });
    }
  },

  addParticipant: (channel, userId, currentParticipants) => {
    return dispatch => {
      channel.push('user:join', { user_id: userId, users: currentParticipants })
    };
  },

};

export default Actions;