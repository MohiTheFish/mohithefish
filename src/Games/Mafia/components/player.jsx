import React from 'react';
import PropTypes from 'prop-types';


const aliveStatus = <h4 className="alive">Alive</h4>
const deadStatus = <h4 className="dead">Dead</h4>

function PlayerCard(props) {
  const { member, isAlive } = props;
  return (
    <div className="player">
      <h3 className="name">{member}</h3>
      {isAlive ? aliveStatus : deadStatus}
    </div>
  )
}



PlayerCard.propTypes = {
  member: PropTypes.string.isRequired,
  isAlive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { PlayerCard };