import Constants from '../constants';

const initialState = {
  currentChallenge: {},
  participants: [],
  channel: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_PARTICIPANTS:
      return {...state, participants: action.users}
    case Constants.CURRENT_CHALLENGE_RESPONSE:
      return {...state, currentChallenge: action.challenge}
    default:
      return state;
  }
}
