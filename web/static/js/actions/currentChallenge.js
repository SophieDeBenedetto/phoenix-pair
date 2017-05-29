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
        var users = response.users.map((user) => JSON.parse(user))
        dispatch({
          type: Constants.CURRENT_CHALLENGE_PARTICIPANTS,
          users: users
        });
      });

      channel.on("response:updated", (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_RESPONSE,
          challenge: response.challenge
        });
      })
    }
  },

  removeParticipant: (channel) => {
    return dispatch => {
      channel.leave();
    }
  },

  updateResponse: (channel, codeResponse) => {
    return dispatch => {
      channel.push("response:update", {response: codeResponse})
    }
  }

};

export default Actions;
