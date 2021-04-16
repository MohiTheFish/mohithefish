import React, {useState} from 'react';
import InputBox, {isInteger} from 'components/InputBox';


function checkHourValid(hour) {
  if(!isInteger(hour)) {
    return 'Hour must be a positive integer';
  }
  if (Number.parseInt(hour) >= 60) {
    return 'Hour must be less than equal to 60.'
  }
  return '';
}
function checkMinuteValid(min) {
  if(!isInteger(min)) {
    return 'Minute must be a positive integer';
  }
  if (Number.parseInt(min) >= 60) {
    return 'Minute must be less than equal to 60.'
  }
  return '';
}


export default function ScreenTime() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");

  const isHourValid = checkHourValid(hour);
  const isMinuteValid = checkMinuteValid(minute);
  return (
    <div className="screentime-wrapper">
      <h1>Some ScreenTime</h1>
      <InputBox value={hour} setValue={setHour} errormsg={isHourValid} variant="outlined" className="time-entry">
        <h3>Hour:</h3>
      </InputBox>
      <InputBox value={minute} setValue={setMinute} errormsg={isMinuteValid} variant="outlined" className="time-entry">
        <h3>Minute:</h3>
      </InputBox>
    </div>
  )
}