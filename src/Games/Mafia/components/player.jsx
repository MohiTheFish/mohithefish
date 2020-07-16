
import React from 'react';

import deadimg from 'assets/images/dead.png';
import { votePlayer, interactMafia } from 'Games/socketHandlers';
import {ROLES} from './role';

const DEAD_IMAGE = 
<div className="dead-img-wrapper">
  <img className="dead-img" alt="dead" src={deadimg} />
</div>;
function iHavePower(role) {
  return role === 1 || role === 2 || role === 3;
}

function interpretRole(role) {
  switch(role) {
    case ROLES.VILLAGER : {
      return 'VILLAGER';
    }
    case ROLES.DETECTIVE : {
      return 'DETECTIVE';
    }
    case ROLES.MEDIC : {
      return 'MEDIC';
    }
    case ROLES.MAFIA : {
      return 'MAFIA';
    }
    case ROLES.GODFATHER : {
      return 'GODFATHER';
    }
    case ROLES.SK : {
      return 'SERIAL KILLER';
    }
    case ROLES.JOKER : {
      return 'JOKER';
    }
    default: {
      return 'VILLAGER';
    }
  }
}

function renderInteraction(profile, phase, index, myIndex, isSelected, isRecapPeriod, someoneOnTrial, iAmDead, role) {
  if (iAmDead) {
    const isDay = phase%2 === 0;
    const isDead = !profile.isAlive;
    return (
      <div className="vote-button-wrapper">
        <div className="vote-count">
          <h4>Role:</h4>
          <h4>{interpretRole(profile.role)}</h4>
        </div>
        {
          isDead
          ? DEAD_IMAGE
          : (
            isDay
            ? <div className="vote-count">
                <h4>Total count</h4>
                <h4 className="count">{profile.numVotes}</h4>
              </div>
            : ''
          )
        }
      </div>
    )
  }
  
  if (!profile.isAlive) {
    return (
      <div className="vote-button-wrapper">
      <div className="vote-count">
        <h4>Role:</h4>
        <h4>{interpretRole(profile.role)}</h4>
      </div>
      {DEAD_IMAGE}
    </div>
    );
  }

  if (isRecapPeriod || phase === 0) {
    return (
      <div className="empty-area-wrapper">
        <div className="empty-area">
          <h2>Wait until Day!</h2>
        </div>
      </div>
    );
  }
  
  const isDay = phase % 2 === 0;
  let selectClass = '';
  if(isSelected) {
    selectClass="selected ";
  }
  if(someoneOnTrial) {
    selectClass +="disabled";
  }
  if (isDay) {
    function onClick() {
      if(someoneOnTrial) {return;}
      votePlayer(myIndex, index);
    }
    return (
      <div className="vote-button-wrapper">
        <div className={`vote-button ${selectClass}`} onClick={onClick}><h2>Vote</h2></div>
        <div className="vote-count">
          <h4>Total count</h4>
          <h4 className="count">{profile.numVotes}</h4>
        </div>
      </div>
    );
  } 
  else {
    if(iHavePower(role)) {
      function interact() {
        interactMafia(myIndex, index);
      }
      return (
        <div className="interact-button-wrapper">
          <div className={`interact-button ${selectClass}`} onClick={interact}>
            <h2>Interact</h2>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="interact-button-wrapper">
          <h2 style={{textAlign: 'center'}}>No Power</h2>
        </div>
      )
    }
  }
}

function PlayerCard(props) {
  const { member, index, myIndex, profile, phase, isSelected, isRecapPeriod, someoneOnTrial, iAmDead, role } = props;

  const playerClass = `papermui player${index === myIndex ? ' my-player' : ''}`;
  return (
    <div className={playerClass}>
      <div className="info">
        <h3 className="name">{member}</h3>
      </div>
      {renderInteraction(profile, phase, index, myIndex, isSelected, isRecapPeriod, someoneOnTrial, iAmDead, role)}
    </div>
  )
}

export { PlayerCard };