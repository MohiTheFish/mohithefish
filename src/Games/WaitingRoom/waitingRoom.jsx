import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import './waitingRoom.scss';

import BackToGameSelect from 'components/BackToGameSelect/backToGameSelect';
import RoomInfo from './roomInfo';
import ConnectedChoices from './connectedChoices';
import {clearRoomInfo } from 'redux-store/actions/gameSetupActions';
import { connectToServer, ejectFromRoom } from '../socketHandlers';
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

  if(!gamename) {
    ejectFromRoom();
    store.dispatch(clearRoomInfo());
    return <Redirect to="/games" />;
  }

  if (isPlaying) {
    storageType.setItem('gameData', JSON.stringify(store.getState().gameData));
    return (
      <Redirect push to={`${location.pathname}/play`} />
    )
  }

  return (
    <div className="wrapper waiting-room-wrapper">
      <div className="header-text">
        <div className="same-row">
          <BackToGameSelect/>
          <h1>Play {gamename}</h1>
        </div>
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