import React from 'react';

import './court.scss';
import { votePlayer } from 'Games/socketHandlers';
import { connect } from 'react-redux';

function mapStateToPropsClock(state) {
  return {
    time: state.playState.mafia.secondaryTime,
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

function Court(props) {
  const { onTrial, myIndex, isRecapPeriod, secondaryTime, isSelected, numAbstain } = props;
  if (!onTrial) {
    return (
      <div className="flex vertically-center-text empty-court">
        <h2>You need to vote for someone to lynch!</h2>
        <h3>Or you can decide against voting today</h3>
        <div className={ `abstain papermui${isSelected ? ' selected' : ''}`} onClick={() => {votePlayer(myIndex, -2)}}>
          <h2>Abstain</h2>
        </div>
        <h5>*Need a majority to abstain in order to pass the day.</h5>
        <h2>Number of abstainees: {numAbstain}</h2>
      </div>
    )
  }
  return (
    <div className="court">
      <div className="on-trial">
        <h2>On trial</h2>
        <h1>{onTrial}</h1>
        <SubscribedClock />
      </div>
      <div className="court-decision not-guilty-wrapper">
        <div className="button">
          <h2>Not Guilty</h2>
        </div>
        <div className="papermui voters">
          <p>abby</p>
          <p>beatric</p>
          <p>charles</p>
          <p>david</p>
          <p>evan</p>
          <p>farqan</p>
          <p>abby</p>
          <p>beatric</p>
          <p>charles</p>
          <p>david</p>
          <p>evan</p>
          <p>farqan</p>
          <p>abby</p>
          <p>beatric</p>
          <p>charles</p>
          <p>david</p>
          <p>evan</p>
          <p>farqan</p>
        </div>
      </div>
      <div className="court-decision guilty-wrapper">
        <div className="button">
          <h2>Guilty</h2>
        </div>
        <div className="voters">
          <p>abby</p>
          <p>beatric</p>
          <p>charles</p>
          <p>david</p>
          <p>evan</p>
          <p>farqan</p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const { numAbstain, secondaryTime, onTrial, } = state.playState.mafia;
  return {
    ...ownProps,
    numAbstain,
    secondaryTime,
    onTrial,
  }
}

const SubscribedCourt = connect(mapStateToProps)(Court);
export default SubscribedCourt;