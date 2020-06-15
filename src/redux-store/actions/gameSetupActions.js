export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'; 
export const SET_IS_LOADINGROOM = 'SET_IS_LOADINGROOM';
export const SET_IS_LOADING_ROOM_SELECTED_CHOICE = "SET_IS_LOADING_ROOM_SELECTED_CHOICE";
export const SET_HOST_NAME = "SET_HOST_NAME";
export const ROOM_CREATED = "ROOM_CREATED";
export const ROOM_MEMBERS_UPDATED = "ROOM_MEMBERS_UPDATED";
export const ROOM_SETTINGS_UPDATED = "ROOM_SETTINGS_UPDATED";
export const VISIBLE_ROOMS = "VISIBLE_ROOMS";
export const ROOM_JOINED = "ROOM_JOINED";
export const PLAYER_LEFT = "PLAYER_LEFT";
export const START_PLAYING = "START_PLAYING";
export const SET_IS_PRIVATE = "SET_IS_PRIVATE";
export const GO_BACK_TO_LOBBY = "GO_BACK_TO_LOBBY";


export const lobbyStates = {
  CREATE: "create",
  JOIN: "join",
  CREATED: "created",
  JOINED: "joined",
};

export function setIsConnected(isConnected) {
  return {
    type: SET_IS_CONNECTED,
    isConnected,
  };
}

export function setSelectedChoiceAndLoadingRoom(selectedChoice) {
  return {
    type: SET_IS_LOADING_ROOM_SELECTED_CHOICE,
    isConnected: true,
    selectedChoice,
  }
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
  };
}

export function roomUpdated(data) {
  return {
    type: ROOM_MEMBERS_UPDATED,
    data,
  };
}

export function roomSettingsUpdated(settings) {
  return {
    type: ROOM_SETTINGS_UPDATED,
    settings,
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

export function playerLeft(index) {
  return {
    type: PLAYER_LEFT,
    index,
  };
}

export function startPlaying() {
  return {
    type: START_PLAYING,
    isPlaying: true,
  }
}

export function roomPrivacyToggled() {
  return {
    type: SET_IS_PRIVATE,
  };
}

export function goBackToLobby() {
  return {
    type: GO_BACK_TO_LOBBY,
  };
}