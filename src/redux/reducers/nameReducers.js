import { SET_GAME_USERNAME } from '../actions/nameActions';
import { v4 as uuid } from 'uuid';

function existUUID() {
  let a = localStorage.getItem('uuid');

  if(a) {return a;}

  a = uuid();
  localStorage.setItem('uuid', a);
  return a;
}

export const initialState = {
  username: "",
  gamename: "",
  uuid: existUUID(),
};

export function gameCredentials(state = initialState, action) {
  switch(action.type) {
    case SET_GAME_USERNAME: {
      return {
        username: action.username,
        gamename: action.gamename,
        uuid: state.uuid,
      }
    }
    default:
      return state;
  }
}