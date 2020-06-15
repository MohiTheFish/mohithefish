import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import './waitingRoom.scss';

import RoomInfo from './roomInfo';
import ConnectedChoices from './connectedChoices';
import { connectToServer } from '../socketHandlers';
import store from 'redux-store';

const storageType = sessionStorage;

function mapStateToPropsWR(state) {
  const { gamename, username } = state.gameCredentials
  return {
    gamename,
    username,
    isPlaying: state.gameData.isPlaying,
  };
}

function WaitingRoom(props) {
  const { gamename, username, isPlaying } = props;
  const { location } = props;

  useEffect(() => {
    if (process.env.REACT_APP_DESIGN !== "true") {
      if (!store.getState().gameData.isConnected){
        connectToServer();
      }
    }
    document.title= "Waiting Room";
  },[]);

  if (isPlaying) {
    storageType.setItem('gameData', JSON.stringify(store.getState().gameData));
    return (
      <Redirect push to={`${location.pathname}/play`} />
    )
  }

  return (
    <div className="wrapper waiting-room-wrapper">
      <div className="header-text">
        <h1>Play {gamename}</h1>
        <h3>Your name is: {username}</h3>
      </div>
      <ConnectedChoices />

      <RoomInfo
        username={username}
      />
    </div>
  );
}


const SubscribedWaitingRoom = connect(mapStateToPropsWR)(WaitingRoom);
export default SubscribedWaitingRoom;