import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import BackToLobby from 'components/BackToLobby/backToLobby';
import {PlayerCard} from './components/card';
import store from 'redux-store';

import './mafia.scss';

function mapStateToProps(state) {
  const gd = state.gameData;
  const ps = state.playState;
  const game = ps.mafia;
  return {
    gameCredentials: state.gameCredentials,
    
    time: ps.time,
    isPlaying: gd.isPlaying,
    game,
  };
}

function Mafia(props) {
  const {
    gameCredentials,
    time,
    isPlaying,
    myIndex,
    host,
    game
  } = props;

  function renderTime() {
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;

    return <h3>{minutes}:{seconds.toString().padStart(2, '0')}</h3>
  }

  
  const headerRow = myIndex === -1
  ? <div className="header-row">
      <BackToLobby />
      <h1>Play Mafia</h1>
      {/* <BackToLobby /> */}
    </div>
  : <div className="header-row">
      <h1>Play Mafia</h1>
    </div>

  if(!isPlaying && (process.env.NODE_ENV === 'production' || (process.env.NODE_ENV === 'development' && process.env.REACT_APP_DESIGN === 'false'))) {
    return (
      <Redirect to="/games/mafia" />
    );
  }
  return (
    <div className="wrapper play-games-wrapper mafia-page-wrapper day">
      <div className="header">
        {headerRow}
        <h4>Your name is: {gameCredentials.username}</h4>
      </div>
      <div className="time-wrapper">
        {renderTime()}
      </div>
      <div className="mafia-game-info">
        <PlayerCard />
      </div>
    </div>
  );

}
const SubscribedMafia = connect(mapStateToProps)(Mafia);
export default SubscribedMafia;