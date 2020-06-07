import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import './waitingRoom.scss';

import RoomInfo from './roomInfo';
import ConnectedChoices from './connectedChoices';
import { connectToServer } from '../socketHandlers';

function mapStateToPropsWR(state) {
  return {
    gameCredentials: state.gameCredentials,
    isPlaying: state.playState.isPlaying,
  };
}

function WaitingRoom(props) {
  const { gamename, username } = props.gameCredentials;
  const { isPlaying, location } = props;

  useEffect(() => {
    connectToServer();
    document.title= "Waiting Room";
  },[]);

  if (isPlaying) {
    return (
      <Redirect to={`${location.pathname}/play`} />
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