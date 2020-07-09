import { gameCredentials, initialState as initialGameCredentialState } from './nameReducers';
import { gameData, initialState as initialGameData } from './gameReducers';
import { playState, initialState as initialPlayState } from './playReducers';
export const defaultState = {
  gameData: initialGameData,
  gameCredentials: initialGameCredentialState,
  playState: initialPlayState,
};
function customReducer(state = defaultState, action) {
  const myIndex = state.gameData.myIndex;
  const playStateWithIndex = state.playState;
  playStateWithIndex.myIndex = myIndex;
  return {
    gameCredentials: gameCredentials(state.gameCredentials, action),
    gameData: gameData(state.gameData, action),
    playState: playState(playStateWithIndex, action),
  };
}

export default customReducer;