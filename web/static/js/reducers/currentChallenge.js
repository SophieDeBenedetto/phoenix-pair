import Constants from '../constants';

const initialState = {
  currentChallenge: {},
  participants: [],
  channel: null,
  language: 'ruby'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_PARTICIPANTS:
      return {...state, participants: action.users}
    case Constants.CURRENT_CHALLENGE_RESPONSE:
      return {...state, currentChallenge: action.challenge}
    case Constants.CURRENT_CHALLENGE_LANGUAGE:
      return {...state, language: action.language}
    default:
      return state;
  }
}
