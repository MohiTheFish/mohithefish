import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import store, { saveState } from 'redux-store';
import {connectToServer, updateMyName} from '../Games/socketHandlers';
import {
  setGameName
} from 'redux-store/actions/nameActions';

import './games.scss';

/**
 * List of all games available to play. Make sure this matches up with the server
 */
const allGames = [
  'spyfall',
  'mafia',
];

function mapStateToProps(state) {
  const gc = state.gameCredentials;
  return {
    isConnected: gc.isConnected,
    isUpdatingName: gc.isUpdatingName,
    gamename: gc.gamename,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setGameInfo: (name, gamename) => {
      updateMyName(name);
      dispatch(setGameName(gamename));
    }
  }
}
function Games(props) {
  const { isConnected, gamename, isUpdatingName, setGameInfo } = props;
  const [name, setName] = useState(store.getState().gameCredentials.username);

  useEffect ( () => {
    document.title = "Games";
    
    if (process.env.REACT_APP_DESIGN !== "true") {
      if (!isConnected) { 
        connectToServer();
      }
    }
  }, [isConnected]);

  function handleChange(e) {
    setName(e.target.value);
  }

  console.log('redirectPage: ' + gamename);
  console.log('isConnected: ' + isConnected);
  console.log('!isUpdatingName: '+ isUpdatingName);
  if (Boolean(gamename) && isConnected && isUpdatingName) {
    if (((process.env.NODE_ENV === "development" && process.env.REACT_APP_DESIGN === 'false') || process.env.NODE_ENV==="production")) {
      console.log('env: ' + (process.env.NODE_ENV === "development" && process.env.REACT_APP_DESIGN === 'false') );
      return (
        <Redirect push to={`/games/${gamename}`}/>
      );
    }
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
              onClick={() => setGameInfo(name, val)}
            >
              {val}
            </Button>
          )
        }
      </div>
    </div>
  );
}

const SubscribedGames = connect(mapStateToProps, mapDispatchToProps)(Games);
export default SubscribedGames;