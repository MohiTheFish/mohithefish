export const SET_SPYFALL_TIME = "SET_SPYFALL_TIME";

export function isValidTime(time) {
  return /^\d+$/.test(time) && Number.parseInt(time) < 10;
}

export function setSpyfallTime(time) {
  return {
    game: 'spyfall',
    type: SET_SPYFALL_TIME,
    time,
  };
}