/* eslint-disable */
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import BackToLobby from 'components/BackToLobby/backToLobby';
import {RoleCard} from './components/role';
import {PlayerCard} from './components/player';
import EventRecap from './components/eventRecap';
import EventInput from './components/eventRecapInput';
import RoleCount from './components/roleCount';
import Court from './components/court';
import store from 'redux-store';

import './mafia.scss';
import { useState } from 'react';
import { useEffect } from 'react';
// window.onscroll = function(ev) {
//   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//       // you're at the bottom of the page
//   }
// };

function interpretPhase(phase) {
  const isEven = phase % 2 === 0;
  if (isEven) {
    return `day`;
  }
  else {
    return `night`;
  }
}

function Column3({isDay}) {
  return (
    <div className="column3">
      
      <div className="day-night-time">
        <div className="row">
          <h1>{isDay ? 'Day' : 'Night '}</h1>
          {isDay ? <Brightness7Icon/> : <Brightness2Icon/>}
        </div>
      </div>

      <RoleCard />
      <RoleCount />

    </div>
  )
}
function Column1() {
  return (
    <div className="column1">
      <EventRecap />
      <EventInput />
    </div>
  )
}

function mapStateToPropsClock(state) {
  return {
    time: state.playState.time,
  };
}
function Clock({time}) {
  const minutes = Math.floor(time / 60); 
  const seconds = time % 60;

  return (
    <div className="time-wrapper">
      <h3>{minutes}:{seconds.toString().padStart(2, '0')}</h3>
    </div>
  );
}
const SubscribedClock = connect(mapStateToPropsClock)(Clock);

function handlePlayerClick(index) {
  console.log('voting for ' + index);
}

  
function renderMembers(members, phase, myIndex) {
  return members.map( (member, index) => {
    let onClickfn = ()=>handlePlayerClick(index);
    return <PlayerCard 
      key={`${member}${index}`} 
      phase={phase}
      member={member} 
      onClick={onClickfn}
      isAlive={true}
      isMe={myIndex===index}
    />
  });
}

function Mafia(props) {
  useEffect(() => {
    document.title = 'Mafia';
  });
  const [gameObj, ] = useState(store.getState().gameData);
  const {
    phase,
    isPlaying,
  } = props;
  const theme = interpretPhase(phase);
  const isDay = theme === 'day';
  const {
    members, 
    myIndex
  } = gameObj;

  const headerRow = myIndex === 0
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
    <div className={`wrapper play-games-wrapper mafia-page-wrapper ${theme}`}>
      <div className="header">
        {headerRow}
        <SubscribedClock />
      </div>

      <div className="mafia-game-info">

        <Column1 />
        <div className="column2">
          <div className="player-list">
            {renderMembers(members, phase, myIndex)}
          </div>
          
          <Court />
        </div>
        <Column3 isDay={isDay}/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const gd = state.gameData;
  const ps = state.playState;
  const game = ps.mafia;
  return {
    phase: game.phase,
    isPlaying: gd.isPlaying,
  };
}

const SubscribedMafia = connect(mapStateToProps)(Mafia);
export default SubscribedMafia;