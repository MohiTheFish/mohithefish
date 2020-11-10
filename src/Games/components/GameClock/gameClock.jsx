import React from 'react';
import {connect} from 'react-redux';

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
export default SubscribedClock;