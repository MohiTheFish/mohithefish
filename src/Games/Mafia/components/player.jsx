import React from 'react';


const aliveStatus = <h4 className="alive">Alive</h4>
const deadStatus = <h4 className="dead">Dead</h4>



export function PlayerCard(props) {
  const { member, isAlive } = props;
  return (
    <div className="player">
      <h3 className="name">{member}</h3>
      {isAlive ? aliveStatus : deadStatus}
    </div>
  )
}