import { SET_GAME_USERNAME } from '../actions/nameActions';
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
  username: "",
  gamename: "",
  userId: existUserId(),
};

export function gameCredentials(state = initialState, action) {
  switch(action.type) {
    case SET_GAME_USERNAME: {
      return {
        username: action.username,
        gamename: action.gamename,
        userId: state.userId,
      }
    }
    default:
      return state;
  }
}