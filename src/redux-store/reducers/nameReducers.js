import {
  SET_IS_CONNECTED,
  SET_GAMENAME,
  SET_USERNAME,
  RETURN_TO_GAME_SELECT,
} from '../actions/nameActions';
import { v4 as uuid } from 'uuid';

const storageType = sessionStorage;

function existUserId() {
  let a = storageType.getItem('userId');

  if(a) {return a;}

  a = uuid();
  storageType.setItem('userId', a);
  return a;
}

export const initialState = {
  isConnected: false,
  username: "",
  gamename: "",
  isUpdatingName: false,
  userId: existUserId(),
};

export function gameCredentials(state = initialState, action) {
  switch(action.type) {
    case SET_IS_CONNECTED:
      return Object.assign({}, state, {
        isConnected: action.isConnected
      });
    case SET_GAMENAME: {
      return Object.assign({}, state, {
        gamename: action.game,
        isUpdatingName: true,
      });
    }
    case SET_USERNAME: {
      return Object.assign({}, state, {
        isUpdatingName: false,
        username: action.name,
      });
    }
    case RETURN_TO_GAME_SELECT: {
      return {
        gamename: "",
        username: state.username,
        userId: state.userId,
        isUpdatingName: state.isUpdatingName,
      };
    }
    default:
      return state;
  }
}