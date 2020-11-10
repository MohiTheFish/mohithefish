import {defaultMafiaState, mafiaReducers } from './specificPlayReducers/mafiaPlayReducers';
import {defaultSpyfallState, spyfallReducers } from './specificPlayReducers/spyfallPlayReducers';
export const initialState = {
  time: 0,
  spyfall: defaultSpyfallState,
  mafia: defaultMafiaState
};

export function playState(state = initialState, action) {
  switch(action.game) {
    case 'mafia': {
      return mafiaReducers(state, action);
    }
    default: { // spyfall
      return spyfallReducers(state, action);
    }
  }
}