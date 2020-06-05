import {
  SET_IS_CONNECTED,
  SET_NUM_PLAYERS,
  SET_IS_LOADINGROOM,
  SET_SELECTED_CHOICE,
} from '../actions/gameActions';

export const initialState = {
  isConnected: false,
  selectedChoice: "",
  isLoadingRoom: false,
  numPlayers: 1,
}

export function gameData(state = initialState, action) {
  switch(action.type) {
    case SET_IS_CONNECTED:
      return Object.assign({}, state, {
        isConnected: action.isConnected
      });
    case SET_NUM_PLAYERS:
      return Object.assign({}, state, {
        numPlayers: action.numPlayers
      });
    case SET_IS_LOADINGROOM:
      return Object.assign({}, state, {
        isLoadingRoom: action.isLoadingRoom
      });
    case SET_SELECTED_CHOICE:
      return Object.assign({}, state, {
        selectedChoice: action.selectedChoice
      });

    default:
      return state;
  } 
}