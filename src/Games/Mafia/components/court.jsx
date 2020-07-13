import React from 'react';

import { 
  votePlayer,
  voteGuiltyMafia,
} from 'Games/socketHandlers';
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
  const {
    onTrialName,
    onTrialIndex,
    isDefending,
    myIndex,
    phase,
    isRecapPeriod,
    isSelected,
    numAbstain,
    numGuilty,
    numNotGuilty,
    myGuiltyDecision,
    iAmDead,
  } = props;

  if (iAmDead) {
    const isDay = phase%2 === 0;
    return (
      <div className="vertically-center-text empty-court">
        <h2>You have died. You can no longer interact.</h2>
        {isDay 
        ? <h2>Number of abstainees: {numAbstain}</h2>
        : ''}
      </div>
    )
  }
  function voteGuilty() {
    voteGuiltyMafia(myIndex, 'guilty');
  }

  function voteNotGuilty() {
    voteGuiltyMafia(myIndex, 'not guilty');
  }
  if(phase%2 === 0){ //isDay
    if (!onTrialName) { //no one on trial && isDay
      if (!isRecapPeriod) { // is not RecapPeriod && no one on trial && isDay
        return (
          <div className="vertically-center-text empty-court">
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
      // IS RecapPeriod && no one on trial && isDay
      return (
        <div className="vertically-center-text empty-court">
          <h3>Wait until night time.</h3>
        </div>
      );
    }
    // IS on trial && isDay
    console.log('myGuiltyDecision:' + myGuiltyDecision);
    const iAmOnTrial = onTrialIndex === myIndex;
    // const iAmOnTrial = false;
    let notGuiltyClass = `papermui button-padding`;
    let guiltyClass = `papermui button-padding`;
    if (!iAmOnTrial) {
      notGuiltyClass += ' button';
      guiltyClass += ' button';
      const isG = myGuiltyDecision[0] === 'g';
      const isN = myGuiltyDecision[0] === 'n';
      if(isG) {
        notGuiltyClass += ' inactive';
        guiltyClass += ' active';
      }
      else if(isN){
        notGuiltyClass += ' active';
        guiltyClass += ' inactive';
      }
    }
    let guiltyButtons = '';
    if (!isDefending) {
      if (!iAmOnTrial) {
        guiltyButtons = (
          <>
          <div className="court-decision not-guilty-wrapper">
            <div className={notGuiltyClass} onClick={voteNotGuilty}>
              <h2>Not Guilty</h2>
            </div>
            <div className="voters">
              <h3>Total Votes</h3>
              <h2>{numNotGuilty}</h2>
            </div>
          </div>
          <div className="court-decision guilty-wrapper">
            <div className={guiltyClass} onClick={voteGuilty}>
              <h2>Guilty</h2>
            </div>
            <div className="voters">
              <h3>Total Votes</h3>
              <h2>{numGuilty}</h2>
            </div>
          </div>
          </>
        );
      }
      else {
        guiltyButtons = (
          <>
          <div className="court-decision not-guilty-wrapper">
            <div className={notGuiltyClass}>
              <h2>Not Guilty</h2>
            </div>
            <div className="voters">
              <h3>Total Votes</h3>
              <h2>{numNotGuilty}</h2>
            </div>
          </div>
          <div className="court-decision guilty-wrapper">
            <div className={guiltyClass}>
              <h2>Guilty</h2>
            </div>
            <div className="voters">
              <h3>Total Votes</h3>
              <h2>{numGuilty}</h2>
            </div>
          </div>
          </>
        )
      }
    }
    return (
      <div className="court">
        <div className="on-trial">
          <h2>On Trial</h2>
          <h1>{onTrialName}</h1>
          <SubscribedClock />
          <h4>Need a simple majority (more guilty votes than non-guilty).</h4>
        </div>
        {guiltyButtons}
      </div>
    );
  }
  // isNight
  return ( 
    <div className="flex vertically-center-text empty-court">
      <h2>Use your power, if you can! Otherwise, wait until day time to vote.</h2>
      <h5>If you are attacked, your screen will flash red! If you are saved, your screen will afterwards flash green. </h5>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const members = state.gameData.members;
  const { numAbstain, onTrial, isDefending, numGuilty, numNotGuilty, myGuiltyDecision} = state.playState.mafia;
  return {
    ...ownProps,
    numAbstain,
    onTrialName: members[onTrial],
    onTrialIndex: onTrial,
    isDefending,
    numGuilty,
    numNotGuilty,
    myGuiltyDecision,
  }
}

const SubscribedCourt = connect(mapStateToProps)(Court);
export default SubscribedCourt;