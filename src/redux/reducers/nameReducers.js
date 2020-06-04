import {SET_GAME_USERNAME, SET_GAMENAME, SET_USERNAME} from '../actions/actions';

export const initialState = {
  username: "",
  gamename: "",
};

export function gameSessionNameManager(state = initialState, action) {
  switch(action.type) {
    case SET_GAME_USERNAME: {
      return {
        username: action.username,
        gamename: action.gamename,
      }
    }
    case SET_GAMENAME: {
      return {
        gamename: action.gamename,
      }
    }
    case SET_USERNAME: {
      return {
        username: action.username,
      }
    }

    default:
      return state;
  }
}