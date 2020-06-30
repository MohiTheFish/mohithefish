/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import deadimg from 'assets/images/dead.png';
import './player.scss';
import { votePlayer } from 'Games/socketHandlers';

const aliveStatus = <h4 className="alive">Alive</h4>
const deadStatus = <h4 className="dead">Dead</h4>

function renderInteraction(profile, phase, index, myIndex) {
  if (!profile.isAlive) {
    return (
      <div className="dead-img-wrapper">
        <img className="dead-img" alt="dead" src={deadimg} />
      </div>
    );
  }
  if (phase === 0) {
    return (
      <div className="empty-area-wrapper">
        <div className="empty-area">
          <h2>Wait until Day!</h2>
        </div>
      </div>
    );
  }
  
  const isDay = phase % 2 === 0;
  if (isDay) {
    function onClick() {
      votePlayer(myIndex, index);
    }
    return (
      <div className="vote-button-wrapper">
        <div className="vote-button" onClick={onClick}><h2>Vote</h2></div>
        <div className="vote-count">
          <h4>Total count</h4>
          <h4 className="count">{profile.numVotes}</h4>
        </div>
      </div>
    );
  } 
  else {
    return (
      <div className="interact-button-wrapper">
        <div className="interact-button">
          <h2>Interact</h2>
        </div>
      </div>
    )
  }
}

function PlayerCard(props) {
  const { member, index, myIndex, profile, phase } = props;

  const playerClass = `papermui player${index === myIndex ? ' my-player' : ''}`;
  return (
    <div className={playerClass}>
      <div className="info">
        <h3 className="name">{member}</h3>
        {profile.isAlive ? aliveStatus : deadStatus}
      </div>
      {renderInteraction(profile, phase, index, myIndex)}
    </div>
  )
}



PlayerCard.propTypes = {
  member: PropTypes.string.isRequired,
  isAlive: PropTypes.bool.isRequired,
}

export { PlayerCard };