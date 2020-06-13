import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { returnToLobby } from 'Games/socketHandlers';

import './backToLobby.scss';

function goBack() {
  returnToLobby();
}

function BackToLobby() {
  return (
    <div className="backToLobby-wrapper">
      <IconButton aria-label="go-back" color="primary" onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  )
}

export default BackToLobby;