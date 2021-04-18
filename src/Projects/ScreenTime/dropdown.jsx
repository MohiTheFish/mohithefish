import React from 'react';

import {ACTIVITY_NAMES, VERTICAL_ACTIVITY_SPACING} from './util';

export default function Dropdown({ dropdownIndex, dropdownCallback, activeDropdown, seenActivities, selectDropdownEntry }) {

  let currStyle={};
  if (dropdownIndex === -1){
    currStyle = { left: '-9999px'};
  }
  else {
    const total = VERTICAL_ACTIVITY_SPACING*dropdownIndex;
    currStyle = { left: '20px', top: `${25+total}px`};
  }

  console.log(seenActivities);
  const handleButtonClick = (index) => {
    selectDropdownEntry(dropdownIndex, index);
  }

  return (
    <div id="dropdown" style={currStyle} ref={dropdownCallback}>
      {
        ACTIVITY_NAMES.map((act, index) => {
          if (!seenActivities.get(act)) {
            return <button key={act} onClickCapture={() => handleButtonClick(index)} className={activeDropdown === index ? 'active' : ''}>{act}</button>;
          }
          return null;
        })
      }
    </div>
  )
}