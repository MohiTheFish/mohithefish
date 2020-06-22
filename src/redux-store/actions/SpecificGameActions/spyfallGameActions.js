export const SET_SPYFALL_TIME = "SET_SPYFALL_TIME";

export function setSpyfallTime(time, isValid) {
  return {
    game: 'spyfall',
    type: SET_SPYFALL_TIME,
    time,
    isValid,
  };
}