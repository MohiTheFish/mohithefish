/* eslint-disable */
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import BackToLobby from 'components/BackToLobby/backToLobby';
import {RoleCard} from './components/role';
import {PlayerCard} from './components/player';
import {EventRecap} from './components/eventRecap';
import RoleCount from './components/roleCount';
import Court from './components/court';
import store from 'redux-store';

import './mafia.scss';
import { useState } from 'react';
// window.onscroll = function(ev) {
//   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//       // you're at the bottom of the page
//   }
// };


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
    </div>
  )
}


function mapStateToProps(state) {
  const gd = state.gameData;
  const ps = state.playState;
  const game = ps.mafia;
  return {
    gameCredentials: state.gameCredentials,
    
    time: ps.time,
    theme: game.timeOfDay,
    isPlaying: gd.isPlaying,
    game,
  };
}

function Mafia(props) {
  const {
    gameCredentials,
    time,
    theme, 
    isPlaying,
    game
  } = props;

  function renderTime() {
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;

    return <h3>{minutes}:{seconds.toString().padStart(2, '0')}</h3>
  }

  const [gameObj, ] = useState(store.getState().gameData)
  const isDay = theme === 'day';

  const {
    members, 
    myIndex
  } = gameObj;

  function handlePlayerClick(index) {
    console.log('voting for ' + index);
  }
  
  function renderMembers() {
    return members.map( (member, index) => {
      let onClickfn = null;
      if (index !== myIndex) {
        onClickfn = ()=>handlePlayerClick(index);
      }
      return <PlayerCard 
        key={`${member}${index}`} 
        member={member} 
        onClick={onClickfn}
        isAlive={index%2 === 0 ? true : false}
        isMe={myIndex===index}
      />
    });
  }

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
        <div className="time-wrapper">
          {renderTime()}
        </div>
      </div>

      <div className="mafia-game-info">

        <Column1 />
        <div className="column2">
          <div className="player-list">
            {renderMembers()}
          </div>
          
          <Court />
        </div>
        <Column3 isDay={isDay}/>
      </div>
    </div>
  );

}
const SubscribedMafia = connect(mapStateToProps)(Mafia);
export default SubscribedMafia;