import React from 'react';


export default function Court(props) {
  return (
    <div className="court">
      <div className="court-button not-guilty-wrapper">
        <h2>Not Guilty</h2>
      </div>
      <div className="on-trial">
        <h2>James Baxter</h2>
      </div>
      <div className="court-button guilty-wrapper">
        <h2>Guilty</h2>
      </div>
    </div>
  );
}