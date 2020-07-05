export const SET_IS_LOADINGROOM = 'SET_IS_LOADINGROOM';
export const SET_IS_LOADING_ROOM_SELECTED_CHOICE = "SET_IS_LOADING_ROOM_SELECTED_CHOICE";
export const ROOM_CREATED = "ROOM_CREATED";
export const SET_SETTINGS_IS_UPDATING = "SET_SETTINGS_IS_UPDATING";
export const ROOM_SETTINGS_UPDATED = "ROOM_SETTINGS_UPDATED";
export const VISIBLE_ROOMS = "VISIBLE_ROOMS";
export const ROOM_JOINED = "ROOM_JOINED";
export const ROOM_SPECTATED = "ROOM_SPECTATED";
export const SET_MY_INDEX = "SET_MY_INDEX";
export const PLAYER_ADDED = "PLAYER_ADDED";
export const PLAYER_LEFT = "PLAYER_LEFT";
export const SET_IS_PRIVATE = "SET_IS_PRIVATE";
export const GO_BACK_TO_LOBBY = "GO_BACK_TO_LOBBY";
export const CLEAR_ROOM_INFO = "CLEAR_ROOM_INFO";

export const lobbyStates = {
  CREATE: "create",
  JOIN: "join",
  CREATED: "created",
  JOINED: "joined",
};

export function setSelectedChoiceAndLoadingRoom(selectedChoice) {
  return {
    type: SET_IS_LOADING_ROOM_SELECTED_CHOICE,
    selectedChoice,
  }
}

export function setIsLoadingRoom(isLoadingRoom) {
  return {
    type: SET_IS_LOADINGROOM,
    isLoadingRoom,
  };
}

export function roomCreated(data) {
  return {
    type: ROOM_CREATED,
    data,
  };
}

export function setSettingsIsUpdating() {
  return {
    type: SET_SETTINGS_IS_UPDATING,
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

export function roomSpectated(data) {
  return {
    type: ROOM_SPECTATED,
    data,
  };
}

export function setMyIndex(data) {
  return {
    type: SET_MY_INDEX,
    data,
  }
}

export function playerAdded(data) {
  return {
    type: PLAYER_ADDED,
    data,
  };
}

export function playerLeft(index) {
  return {
    type: PLAYER_LEFT,
    index,
  };
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

export function clearRoomInfo() {
  return {
    type: CLEAR_ROOM_INFO,
  };
}