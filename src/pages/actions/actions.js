export const SET_USERNAME = "SET_USERNAME";
export const SET_GAME = "SET_GAME";
export const SET_GAME_USERNAME = "SET_GAME_USERNAME";


export function setUsername(name) {
  return {
    type: SET_USERNAME,
    name,
  };
}

export function setGame(name) {
  return {
    type: SET_GAME,
    name
  };
}

export function setGameUsername(data) {
  return {
    type: SET_GAME_USERNAME,
    username: data.username,
    gamename: data.gamename,
  };
}
