import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import store from 'Games/redux-store';
import { ejectFromRoom } from 'Games/socketHandlers';
import { returnToGameSelect } from 'Games/redux-store/actions/nameActions';

import './backToGameSelect.scss';

function goBack() {
  ejectFromRoom();
  store.dispatch(returnToGameSelect());
}

function BackToGameSelect() {
  return (
    <div className="backToLobby-wrapper">
      <IconButton aria-label="go-back" color="primary" onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  )
}

export default BackToGameSelect;