import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './waitingRoom.scss';

import RoomInfo from './roomInfo';
import ConnectedChoices from './connectedChoices';
import { connectToServer } from '../socketHandlers';

function mapStateToPropsWR(state) {
  return {
    gameCredentials: state.gameCredentials,
  };
}

function WaitingRoom(props) {
  const { gamename, username } = props.gameCredentials;

  useEffect(() => {
    connectToServer();
    document.title= "Waiting Room";
  },[]);

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