export const START_GAME_SPYFALL = "START_GAME_SPYFALL";
export const ADD_LOCATION_SPYFALL = "ADD_LOCATION_SPYFALL";
export const REMOVE_LOCATION_SPYFALL = "REMOVE_LOCATION_SPYFALL";
export const ADD_NAME = "ADD_NAME";
export const REMOVE_NAME = "REMOVE_NAME";

export function startSpyfall(time) {
  console.log(time);
  return {
    type: START_GAME_SPYFALL,
    time, 
  };
}

export function addLocationSpyfall(name) {
  console.log(name);
  return {
    type: ADD_LOCATION_SPYFALL,
    data: name,
  };
}

export function removeLocationSpyfall(name) {
  console.log(name);
  return {
    type: REMOVE_LOCATION_SPYFALL,
    data: name,
  };
}

export function addName(index) {
  return {
    type: ADD_NAME,
    data: index,
  };
}

export function removeName(index) {
  return {
    type: REMOVE_NAME,
    data: index,
  };
}