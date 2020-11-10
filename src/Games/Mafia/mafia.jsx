import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import BackToLobby from 'components/BackToLobby/backToLobby';
import Clock from 'components/GameClock/gameClock';
import {RoleCard} from './components/role';
import {PlayerCard} from './components/player';
import EventRecap from './components/eventRecap';
import EventInput from './components/eventRecapInput';
import RoleCount from './components/roleCount';
import GameOverDialog from './components/gameOverDialog';
import Court from './components/court';
import store from 'redux-store';
import './mafia.scss';
import { gamesJourney } from 'constants/constants';
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
          <h1>{isDay ? 'Day' : 'Night  '}</h1>
          {isDay ? <Brightness7Icon/> : <Brightness2Icon/>}
        </div>
      </div>

      <RoleCard />
      <RoleCount />

    </div>
  )
}

function mapStateToPropsC2(state, ownProps) {
  const { myTarget, isRecapPeriod, iAmDead } = state.playState.mafia;
  return {
    ...ownProps,
    targetIndex: myTarget,
    isRecapPeriod, 
    iAmDead,
  };
}
function Column2({myIndex, phase, targetIndex, isRecapPeriod, iAmDead}) {
  return (
    <div className="column2">
      <SubscribedPlayerList
        phase={phase}
        isRecapPeriod={isRecapPeriod}
        myIndex={myIndex}
        targetIndex={targetIndex}
        iAmDead={iAmDead}
      />
      <Court
        myIndex={myIndex}
        phase={phase}
        isRecapPeriod={isRecapPeriod}
        isSelected={targetIndex === -2}
        iAmDead={iAmDead}
      />
    </div>
  );
}
const SubcribedColumn2 = connect(mapStateToPropsC2)(Column2);

function Column1() {
  return (
    <div className="column1">
      <EventRecap />
      <EventInput />
    </div>
  )
}

function mapStateToPropsPL(state, ownProps) {
  return {
    ...ownProps,
    role: state.playState.mafia.role,
    someoneOnTrial: state.playState.mafia.onTrial>=0,
    playerProfiles: state.playState.mafia.playerProfiles,
  }
}
function PlayerList(props) {
  const {
    phase,
    role,
    myIndex,
    playerProfiles,
    isRecapPeriod,
    targetIndex,
    someoneOnTrial,
    iAmDead,
  } = props;
  
  const [members,] = useState(store.getState().gameData.members);
  return (
    <div className="player-list">
      {
        members.map( (member, index) => {
          return <PlayerCard 
            key={`${member}${index}`} 
            phase={phase}
            isRecapPeriod={isRecapPeriod}
            member={member} 
            profile={playerProfiles[index]}
            index={index}
            isSelected={targetIndex === index}
            myIndex={myIndex}
            someoneOnTrial={someoneOnTrial}
            iAmDead={iAmDead}
            role={role}
          />
        })
      }
    </div>
  );
}
const SubscribedPlayerList = connect(mapStateToPropsPL)(PlayerList);

function Mafia(props) {
  useEffect(() => {
    document.title = 'Mafia';
  });
  const [myIndex, ] = useState(store.getState().gameData.myIndex);
  const {
    phase,
    isPlaying,
    wasAttacked,
    wasSaved,
  } = props;

  if(!isPlaying && (process.env.NODE_ENV === 'production' || (process.env.NODE_ENV === 'development' && process.env.REACT_APP_DESIGN === 'false'))) {
    return (
      <Redirect to={`${gamesJourney}/games/mafia`} />
    );
  }
  
  const theme = interpretPhase(phase);
  const isDay = theme === 'day';

  const headerRow = myIndex === 0
  ? <div className="header-row">
      <BackToLobby />
      <h1>Play Mafia</h1>
      {/* <BackToLobby /> */}
    </div>
  : <div className="header-row">
      <h1>Play Mafia</h1>
    </div>

  const savedClass = wasSaved ? 'saved' : '';
  const attackedClass = wasAttacked ? 'attacked' : '';

  return (
    <div className={`wrapper play-games-wrapper mafia-page-wrapper ${theme} ${savedClass} ${attackedClass}`}>
      <GameOverDialog/> 
      <div className="header">
        {headerRow}
        <Clock />
      </div>

      <div className="mafia-game-info">
        <Column1 />
        <SubcribedColumn2 myIndex={myIndex} phase={phase} />
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
    wasAttacked: game.wasAttacked,
    wasSaved: game.wasSaved,
  };
}


const SubscribedMafia = connect(mapStateToProps)(Mafia);
export default SubscribedMafia;