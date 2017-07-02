import Constants from '../constants';

const initialState = {
  currentChallenge: {},
  participants: [],
  currentParticipant: null,
  channel: null,
  language: 'ruby'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_PARTICIPANTS:
      if (action.language)
        return {...state, participants: action.users, language: action.language, currentParticipant: action.user}
      else
        return {...state, participants: action.users}
    case Constants.CURRENT_CHALLENGE_RESPONSE:
      return {...state, currentChallenge: action.challenge, currentParticipant: action.user}
    case Constants.CURRENT_CHALLENGE_LANGUAGE:
      return {...state, language: action.language}
    case Constants.CURRENT_PARTICIPANT_REMOVED:
      return {...state, currentParticipant: null}
    default:
      return state;
  }
}
