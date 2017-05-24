import Constants from '../constants';

const initialState = {
  challenges: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CHALLENGES_RECEIVED:
      return { ...state, challenges: action.challenges}
    default:
      return state;
  }
}