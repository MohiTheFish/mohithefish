import React from 'react';

export default function TimeEntry({isHour, time, onChange, onFocus}) {
  return (
    <div className="time-container">
      <input type="text" defaultValue={time} onFocus={onFocus} onChange={onChange} className={`time-entry${isHour ? '' : ' minute-entry'}`}/>
      <p>{isHour ? 'h' : 'm'}</p>
    </div>
  )
}