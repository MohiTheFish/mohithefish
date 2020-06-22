import React from 'react';

import './court.scss';
export default function Court(props) {
  const { onTrial } = props;
  if (!onTrial) {
    return (
      <div className="flex vertically-center-text empty-court">
        <h2>You need to vote for someone to lynch!</h2>
        <h3>Or you can decide against voting today</h3>
        <div className="abstain papermui">
          <h2>Abstain</h2>
        </div>
        <h5>*Need a majority to abstain in order to pass the day.</h5>
        <h2>Number of abstainees: 5</h2>
      </div>
    )
  }
  return (
    <div className="court">
      <div className="on-trial">
        <h2>On trial</h2>

        <h1>Zendaya</h1>

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