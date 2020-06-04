import { createStore } from 'redux'
import MohiApp from '../reducers';

const defaultState = {
  username: "",
  gamename: "",
};

class StateLoader {
  loadState() {
    const username = localStorage.getItem('username');
    const gamename = localStorage.getItem('gamename');

    if (username === null || gamename === null) {
      return {
      }
    }
  }
}

const store = createStore(MohiApp);
export default store;