export const SET_GAME_USERNAME = "SET_GAME_USERNAME";

export function setGameUsername(data) {
  return {
    type: SET_GAME_USERNAME,
    username: data.username,
    gamename: data.gamename,
  };
}
