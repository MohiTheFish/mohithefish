import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import store, { saveState } from 'redux-store';
import {connectToServer, updateMyName} from '../Games/socketHandlers';
import {
  setGameUsername
} from 'redux-store/actions/nameActions';

import './games.scss';
import { gameCredentials } from 'redux-store/reducers/nameReducers';
import { connect } from 'react-redux';

/**
 * List of all games available to play. Make sure this matches up with the server
 */
const allGames = [
  'spyfall',
  'mafia',
];

function mapStateToProps(state, ownProps) {
  return {
    isConnected: state.gameCredentials.isConnected,
    ...ownProps,
  };
}
function Games({isConnected, ...ownProps}) {
  console.log(isConnected);
  const [name, setName] = useState(store.getState().gameCredentials.username);
  const [redirectPage, setRedirectPage] = useState("");

  useEffect ( () => {
    document.title = "Games";
    
    if (process.env.REACT_APP_DESIGN !== "true") {
      if (!store.getState().gameData.isConnected) {
        connectToServer();
      }
    }
  }, []);

  function handleChange(e) {
    setName(e.target.value);
  }

  if (Boolean(redirectPage) && isConnected) {
    if (isConnected && ((process.env.NODE_ENV === "development" && process.env.REACT_APP_DESIGN === 'false') || process.env.NODE_ENV==="production")) {
      updateMyName(name);
    }
    store.dispatch(setGameUsername({
      username: name,
      gamename: redirectPage,
    }));
    
    saveState(store.getState());
    return (
     <Redirect push to={`/games/${redirectPage}`}/>
   );
  }
  return (
    <div className="games-page-wrapper">
      <h1 className="header">Games</h1>
      <h3 className="input-message">Please create your username before continuing.</h3>
      <div className="input">
        <TextField
          id="filled-required"
          label="Required"
          variant="filled"
          value={name}
          onChange={handleChange}
          helperText="If no name is given, a default one will be generated"
        />
      </div>


      <div className="buttons-wrapper">
        {
          allGames.map(val =>
            <Button 
              key={val}
              variant="contained"
              color="primary"
              disabled={!isConnected}
              onClick={() => setRedirectPage(val)}
            >
              {val}
            </Button>
          )
        }
      </div>
    </div>
  );
}

const SubscribedGames = connect(mapStateToProps)(Games);
export default SubscribedGames;