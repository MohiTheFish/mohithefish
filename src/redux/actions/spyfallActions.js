export const START_GAME_SPYFALL = "START_GAME_SPYFALL";
export const ADD_LOCATION_SPYFALL = "ADD_LOCATION_SPYFALL";
export const REMOVE_LOCATION_SPYFALL = "REMOVE_LOCATION_SPYFALL";
export const ADD_NAME_SPYFALL = "ADD_NAME_SPYFALL";
export const REMOVE_NAME_SPYFALL = "REMOVE_NAME_SPYFALL";

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

export function addNameSpyfall(index) {
  return {
    type: ADD_NAME_SPYFALL,
    data: index,
  };
}

export function removeNameSpyfall(index) {
  return {
    type: REMOVE_NAME_SPYFALL,
    data: index,
  };
}