import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './games.scss';

const allGames = [
  'spyfall',
  'tictactoe',
  'war',
  'gare',
  'idk fam'
];


function validateName(name) {
  if (!name) {
    return [true, 'Name cannot be empty.'];
  }
  return [false, ""];
}


export default function Games() {
  const [name, setName] = useState("");
  const [redirectPage, setRedirectPage] = useState("");

  useEffect ( () => {
    document.title = "Games";
  }, []);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    console.log(e);
  }
  
  const [isInvalid, msg] = validateName(name);
  if (Boolean(redirectPage) && !isInvalid) {
   return (
     <Redirect push to={{
        pathname: `/games/${redirectPage}`,
        state: {username: name}
      }}
      />
   )
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