export const SET_SPYFALL_TIME = "SET_SPYFALL_TIME";
export const MAX_SPYFALL_TIME = 100;
export function isValidTime(time) {
  return /^\d+$/.test(time) && Number.parseInt(time) < MAX_SPYFALL_TIME;
}

export function setSpyfallTime(time) {
  return {
    game: 'spyfall',
    type: SET_SPYFALL_TIME,
    time,
  };
}