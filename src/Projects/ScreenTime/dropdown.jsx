import React from 'react';

import {VERTICAL_ACTIVITY_SPACING} from './util';

const HIDDEN_STYLE = { left: '-9999px'};

export default function Dropdown({ dropdownIndex, dropdownCallback, activeDropdown, filter, seenActivities, selectDropdownEntry }) {

  let currStyle={};
  if (dropdownIndex === -1){
    currStyle = HIDDEN_STYLE;
  }
  else {
    const total = VERTICAL_ACTIVITY_SPACING*dropdownIndex;
    currStyle = { left: '20px', top: `${25+total}px`};
  }

  const handleButtonClick = (index) => {
    selectDropdownEntry(dropdownIndex, index);
  }

  let dropdownActs = seenActivities.map((act, index) => {
    return <button key={act} onClickCapture={() => handleButtonClick(index)} className={activeDropdown === index ? 'active' : ''}>{act}</button>;
  })

  if (dropdownActs.length === 0) {
    dropdownActs = <div id="dropdown" style={HIDDEN_STYLE} ref={dropdownCallback} />
  }

  return (
    <div id="dropdown" style={currStyle} ref={dropdownCallback}>
      {dropdownActs}
    </div>
  )
}