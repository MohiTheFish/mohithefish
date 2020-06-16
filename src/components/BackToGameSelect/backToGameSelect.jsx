import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import store from 'redux-store';
import { returnToGameSelect } from 'redux-store/actions/nameActions';

import './backToGameSelect.scss';

function goBack() {
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