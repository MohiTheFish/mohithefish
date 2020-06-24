import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import './waitingRoom.scss';

import BackToGameSelect from 'components/BackToGameSelect/backToGameSelect';
import RoomInfo from './roomInfo';
import ConnectedChoices from './connectedChoices';
import { clearRoomInfo } from 'redux-store/actions/gameSetupActions';
import { ejectFromRoom, connectToServer } from '../socketHandlers';
import store, { saveState } from 'redux-store';

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
  console.log(props);
  const { gamename, username, isPlaying } = props;
  console.log(`games/${gamename}/play`);

  useEffect(() => {
    connectToServer();
    saveState(store.getState());
  }, [username]);

  if(!gamename) {
    ejectFromRoom();
    store.dispatch(clearRoomInfo());
    return <Redirect to="/games" />;
  }

  // useEffect(() => {
  //   if(!store.getState().gameCredentials.isConnected) {
  //     connectToServer();
  //   }
  // }, [])

  if (isPlaying) {
    storageType.setItem('gameData', JSON.stringify(store.getState().gameData));
    return (
      <Redirect push to={`/games/${gamename}/play`} />
    )
  }

  return (
    <div className="wrapper waiting-room-wrapper">
      <div className="header">
        <div className="header-row">
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