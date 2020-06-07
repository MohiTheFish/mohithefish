export const START_GAME = "START_GAME";

export function startSpyfall(time) {
  console.log(time);
  return {
    type: START_GAME,
    time, 
  }
}