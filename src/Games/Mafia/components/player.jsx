
import React from 'react';
import PropTypes from 'prop-types';

import deadimg from 'assets/images/dead.png';
import { votePlayer, interactMafia } from 'Games/socketHandlers';

function renderInteraction(profile, phase, index, myIndex, isSelected, isRecapPeriod, someoneOnTrial, iAmDead) {
  
  if (!profile.isAlive) {
    return (
      <div className="dead-img-wrapper">
        <img className="dead-img" alt="dead" src={deadimg} />
      </div>
    );
  }
  if (iAmDead) {
    const isDay = phase%2 === 0;
    return (
      <div className="vote-button-wrapper">
        <div className="vote-count">
          <h4>Role:</h4>
          <h4>Villager</h4>
        </div>
        {
          isDay
          ? 
          <div className="vote-count">
            <h4>Total count</h4>
            <h4 className="count">{profile.numVotes}</h4>
          </div>
          : ''
        }
      </div>
    )
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
}

function PlayerCard(props) {
  const { member, index, myIndex, profile, phase, isSelected, isRecapPeriod, someoneOnTrial, iAmDead, } = props;

  const playerClass = `papermui player${index === myIndex ? ' my-player' : ''}`;
  return (
    <div className={playerClass}>
      <div className="info">
        <h3 className="name">{member}</h3>
      </div>
      {renderInteraction(profile, phase, index, myIndex, isSelected, isRecapPeriod, someoneOnTrial, iAmDead)}
    </div>
  )
}



PlayerCard.propTypes = {
  member: PropTypes.string.isRequired,
  isAlive: PropTypes.bool.isRequired,
}

export { PlayerCard };