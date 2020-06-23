export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'; 
export const SET_GAME_USERNAME = "SET_GAME_USERNAME";
export const RETURN_TO_GAME_SELECT = "RETURN_TO_GAME_SELECT"; 
export const NAME_UPDATED = "NAME_UPDATED";


export function setIsConnected(isConnected) {
  return {
    type: SET_IS_CONNECTED,
    isConnected,
  };
}

export function setGameUsername(data) {
  return {
    type: SET_GAME_USERNAME,
    username: data.username,
    gamename: data.gamename,
  };
}

export function returnToGameSelect() {
  return {
    type: RETURN_TO_GAME_SELECT
  };
}

export function myNameUpdated(data) {
  return {
    type: NAME_UPDATED,
    username: data.username,
    gamename: data.gamename,
  };
}