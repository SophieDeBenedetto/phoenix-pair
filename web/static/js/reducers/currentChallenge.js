import Constants from '../constants';

const initialState = {
  currentChallenge: {
    challenge: {},
    participants: [],
    channel: null
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge}
    case Constants.CURRENT_CHALLENGE_CHANNEL:
      return {...state, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_ADD_PARTICIPANT:
      return {...state, participants: [...state.participants, action.user]}
    default:
      return state;
  }
}