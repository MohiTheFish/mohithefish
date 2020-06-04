import {SET_GAME_USERNAME} from '../actions/actions';

const initialState = {
  username: "",
  gamename: "",
};

export function gameSessionNameManager(state = initialState, action) {
  switch(action.type) {
    case SET_GAME_USERNAME:
      return {
        username: action.username,
        gamename: action.gamename,
      }
    default:
      return state;
  }
}