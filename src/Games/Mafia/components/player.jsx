import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import deadimg from 'assets/images/dead.png';
import './player.scss';

const aliveStatus = <h4 className="alive">Alive</h4>
const deadStatus = <h4 className="dead">Dead</h4>

function PlayerCard(props) {
  const { member, isAlive, onClick, isMe } = props;
  const isDay = false;

  function renderInteraction() {
    if (!isAlive) {
      return (
        <div className="dead-img-wrapper">
          <img className="dead-img" src={deadimg} />
        </div>
      );
    }
    if (isDay) {
      return (
        <div className="vote-button-wrapper">
          <div className="vote-button" onClick={onClick}><h2>Vote</h2></div>
          <div className="vote-count">
            <h4>Total count</h4>
            <h4 className="count">0</h4>
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

  const playerClass = `papermui player${isMe ? ' my-player' : ''}`;
  return (
    <div className={playerClass}>
      <div className="info">
        <h3 className="name">{member}</h3>
        {isAlive ? aliveStatus : deadStatus}
      </div>
      {renderInteraction()}
    </div>
  )
}



PlayerCard.propTypes = {
  member: PropTypes.string.isRequired,
  isAlive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { PlayerCard };