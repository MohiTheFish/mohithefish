import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const aliveStatus = <h4 className="alive">Alive</h4>
const deadStatus = <h4 className="dead">Dead</h4>

function PlayerCard(props) {
  const { member, isAlive, onClick } = props;

  return (
    <Paper className="player">
      <div className="info">
        <h3 className="name">{member}</h3>
        {isAlive ? aliveStatus : deadStatus}
      </div>
      {
        onClick
        ? <div className="vote-button" onClick={onClick}>
            Vote
          </div>
        : ''
      }
    </Paper>
  )
}



PlayerCard.propTypes = {
  member: PropTypes.string.isRequired,
  isAlive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { PlayerCard };