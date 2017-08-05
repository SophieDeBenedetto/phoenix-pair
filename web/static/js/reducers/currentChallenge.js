import Constants from '../constants';
import {Presence} from 'phoenix';

const initialState = {
  currentChallenge: {},
  language: "javascript",
  participants: [],
  channel: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CURRENT_CHALLENGE_STATE:
      return {...state, language: action.challenge_state.language}
    case Constants.CURRENT_CHALLENGE_PARTICIPANTS:
      return {...state, participants: action.participants}
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_RESPONSE:
      return {...state, currentChallenge: action.challenge}
    case Constants.CURRENT_CHALLENGE_LANGUAGE:
      return {...state, language: action.language}
    case Constants.CURRENT_CHALLENGE_CHAT_MESSAGES:
      return {...state, currentChallenge: action.challenge}
    default:
      return state;
  }
}
