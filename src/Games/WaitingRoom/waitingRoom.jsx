import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import './waitingRoom.scss';

import BackToGameSelect from 'Games/components/BackToGameSelect/backToGameSelect';
import RoomInfo from './roomInfo';
import ConnectedChoices from './connectedChoices';
import { clearRoomInfo } from 'Games/redux-store/actions/gameSetupActions';
import { connectToServer } from '../socketHandlers';
import store, { saveState } from 'Games/redux-store';
import {gamesJourney} from 'constants/constants';

// const storageType = sessionStorage;

function mapStateToPropsWR(state) {
  const { gamename, username, isConnected } = state.gameCredentials
  return {
    gamename,
    username,
    isConnected,
    isPlaying: state.gameData.isPlaying,
  };
}

function WaitingRoom(props) {
  const { gamename, username, isConnected, isPlaying } = props;
  
  useEffect(() => {
    if (!isConnected && (process.env.NODE_ENV === 'production' || process.env.REACT_APP_DESIGN === 'false')) {
      connectToServer();
    }
  }, [isConnected, username]);

  useEffect(() => {
    saveState(store.getState());
  }, [username]);

  if(!gamename) {
    store.dispatch(clearRoomInfo());
    return <Redirect to={`${gamesJourney}/games`} />;
  }

  if (isPlaying) {
    // storageType.setItem('gameData', JSON.stringify(store.getState().gameData));
    return (
      <Redirect to={`${gamesJourney}/games/${gamename}/play`} />
    );
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