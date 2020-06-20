import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import BackToLobby from 'components/BackToLobby/backToLobby';
import {RoleCard} from './components/card';
import {PlayerCard} from './components/player';
import {EventRecap} from './components/eventRecap';
import store from 'redux-store';

import './mafia.scss';
import { useState } from 'react';

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
    game
  } = props;

  function renderTime() {
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;

    return <h3>{minutes}:{seconds.toString().padStart(2, '0')}</h3>
  }
  const [theme, setTheme] = useState('day');
  const isDay = theme === 'day';


  const host = store.getState().gameData.host;
  const members = store.getState().gameData.members;

  function handlePlayerClick(index) {
    console.log('voting for ' + index);
  }
  
  function renderMembers() {
    return members.map( (member, index) => {
      return <PlayerCard 
        key={`${member}${index}`} 
        member={member} 
        onClick={()=>handlePlayerClick(index)}
        isAlive={index%2 === 0 ? true : false}
      />
    });
  }

  function myClick() {
    if (theme === 'day') {
      setTheme('night');
    }
    else {
      setTheme('day');
    }
  }
  const headerRow = myIndex === -1
  ? <div className="header-row">
      <BackToLobby />
      <h1 onClick={myClick}>Play Mafia</h1>
      {/* <BackToLobby /> */}
    </div>
  : <div className="header-row">
      <h1 onClick={myClick}>Play Mafia</h1>
    </div>

  if(!isPlaying && (process.env.NODE_ENV === 'production' || (process.env.NODE_ENV === 'development' && process.env.REACT_APP_DESIGN === 'false'))) {
    return (
      <Redirect to="/games/mafia" />
    );
  }
  return (
    <div className={`wrapper play-games-wrapper mafia-page-wrapper ${theme}`}>
      <div className="header">
        {headerRow}
        
        <div className="time-wrapper">
          {renderTime()}
        </div>
      </div>
      <div className="mafia-game-info">

        <div className="day-night-time">
          <div className="row">
            <h1>{isDay ? 'Day' : 'Night'}</h1>
            {isDay ? <Brightness7Icon/> : <Brightness2Icon/>}
          </div>
        </div>
        <div className="player-list">
          <PlayerCard 
            member={host} 
            onClick={()=>handlePlayerClick(-1)}
            isAlive={-1%2 === 0 ? true : false}
          />
          {renderMembers()}
        </div>
        <RoleCard />
        <EventRecap />
      </div>
    </div>
  );

}
const SubscribedMafia = connect(mapStateToProps)(Mafia);
export default SubscribedMafia;