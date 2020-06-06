export const GET_AVAILABLE_GAMES = 'GET_AVAILABLE_GAMES';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'; 
export const SET_IS_LOADINGROOM = 'SET_IS_LOADINGROOM';
export const SET_SELECTED_CHOICE = 'SET_SELECTED_CHOICE';
export const SET_HOST_NAME = "SET_HOST_NAME";
export const ROOM_CREATED = "ROOM_CREATED";
export const ROOM_UPDATED = "ROOM_UPDATED";
export const VISIBLE_ROOMS = "VISIBLE_ROOMS";
export const ROOM_JOINED = "ROOM_JOINED";

export function setIsConnected(isConnected) {
  console.log('now connected');
  return {
    type: SET_IS_CONNECTED,
    isConnected,
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
  console.log(data);
  return {
    type: ROOM_CREATED,
    data,
  };
}

export function roomUpdated(data) {
  return {
    type: ROOM_UPDATED,
    data,
  };
}

export function visibleRooms(data) {
  return {
    type: VISIBLE_ROOMS,
    data,
  }
}

export function roomJoined(data) {
  return {
    type: ROOM_JOINED,
    data,
  }
}