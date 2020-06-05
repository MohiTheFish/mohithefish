export const GET_AVAILABLE_GAMES = 'GET_AVAILABLE_GAMES';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'; 
export const SET_NUM_PLAYERS = 'SET_NUM_PLAYERS';
export const SET_IS_LOADINGROOM = 'SET_IS_LOADINGROOM';
export const SET_SELECTED_CHOICE = 'SET_SELECTED_CHOICE';

export function setIsConnected(isConnected) {
  return {
    type: SET_IS_CONNECTED,
    isConnected,
  };
}

export function setNumPlayers(numPlayers) {
  return {
    type: SET_NUM_PLAYERS,
    numPlayers,
  };
}

export function setSelectedChoice(selectedChoice) {
  return {
    type: SET_SELECTED_CHOICE,
    selectedChoice,
  };
}

export function setIsLoadingRoom(isLoadingRoom) {
  return {
    type: SET_IS_LOADINGROOM,
    isLoadingRoom,
  };
}