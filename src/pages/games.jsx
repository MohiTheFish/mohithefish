import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import store, { saveState } from 'redux-store';
import {updateMyName} from '../Games/socketHandlers';
import {
  setGameUsername
} from 'redux-store/actions/nameActions';

import './games.scss';

/**
 * List of all games available to play. Make sure this matches up with the server
 */
const allGames = [
  'spyfall',
  'mafia',
];


function validateName(name) {
  if (!name) {
    return [true, 'Name cannot be empty.'];
  }
  return [false, ""];
}


export default function Games() {
  const [name, setName] = useState(store.getState().gameCredentials.username);
  const [redirectPage, setRedirectPage] = useState("");

  useEffect ( () => {
    document.title = "Games";
  }, []);

  function handleChange(e) {
    setName(e.target.value);
  }

  /**
   * @todo Look into creating the component as soon as the link is pressed.
   */
  const [isInvalid, msg] = validateName(name);
  if (Boolean(redirectPage) && !isInvalid) {
    const isConnected = store.getState().gameData.isConnected;
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
          error={isInvalid}
          required
          id="filled-required"
          label="Required"
          variant="filled"
          value={name}
          onChange={handleChange}
          helperText={msg}
        />
      </div>


      <div className="buttons-wrapper">
        {
          allGames.map(val =>
            <Button 
              key={val}
              variant="contained"
              color="primary"
              disabled={isInvalid}
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