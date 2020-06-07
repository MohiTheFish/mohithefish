import {
  START_GAME
} from 'redux/actions/spyfallActions';

export const initialState = {
  time: 0,
  isPlaying: false,
};

export function playState(state = initialState, action) {
  switch(action.type) {
    case START_GAME: return Object.assign({}, state, {
      time: action.time,
      isPlaying: true,
    });
    default:
      return state;
  }
}