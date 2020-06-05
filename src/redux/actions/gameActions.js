export const GET_AVAILABLE_GAMES = 'GET_AVAILABLE_GAMES';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'; 
export const SET_NUM_PLAYERS = 'SET_NUM_PLAYERS';
export const SET_IS_LOADINGROOM = 'SET_IS_LOADINGROOM';
export const SET_SELECTED_CHOICE = 'SET_SELECTED_CHOICE';
export const SET_HOST_NAME = "SET_HOST_NAME";
export const ROOM_CREATED = "ROOM_CREATED";

export function setIsConnected(isConnected) {
  console.log('now connected');
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

export function setHostName(host) {
  return {
    type: SET_HOST_NAME,
    host,
  }
}

export function roomCreated(data) {
  return {
    type: ROOM_CREATED,
    data,
  }
}