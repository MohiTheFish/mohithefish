import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import BackToLobby from 'components/BackToLobby/backToLobby';
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
  // const {
  //   gameCredentials,
  //   time,
  //   isPlaying,
  //   game
  // } = props;

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

  if(!isPlaying) {
    return (
      <Redirect to="/games/mafia" />
    );
  }
  return (
    <div className="games-wrapper mafia-page-wrapper">
      <div className="header">
        {headerRow}
        <h4>Your name is: {gameCredentials.username}</h4>
          {
            isSpy 
            ? <h4>You ARE the spy! <span role="img" aria-label="spy emoji">🕵️</span> <br/> Figure out the secret location!</h4>
            : <h4>You are NOT the spy. <br/> The location is <span className="secret-location">{secretLocation}</span></h4>
          }
      </div>
      <div className="time-wrapper">
        {renderTime()}
      </div>

      <div className="players-list">
        <h2 className="title">Players</h2>
        <div className="names">
          <h4 key={host}
            className={selectClass}
            onClick={callback}>
              {host}
          </h4>
          {
            renderNames()
          }
        </div>
      </div>

      <div className="location-section">
        <h2 className="header">Locations</h2>
        <div className="location-wrapper">
          {
            renderLocations()
          }
        </div>
      </div>
    </div>
  );

}
const SubscribedSpyfall = connect(mapStateToProps)(Spyfall);
export default SubscribedSpyfall;