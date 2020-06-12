import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import store from 'redux/store';

import { goBackToLobby } from 'redux/actions/gameSetupActions';

import './backToLobby.scss';

function goBack() {
  store.dispatch(goBackToLobby());
}

function BackToLobby(props) {
  return (
    <div className="backToLobby-wrapper">
      <IconButton aria-label="go-back" color="primary" onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  )
}

export default BackToLobby;