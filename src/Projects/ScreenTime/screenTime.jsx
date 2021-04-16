import React, {useState} from 'react';
import InputBox, {isInteger, InputDate} from 'components/InputBox';

import './screenTime.scss';

function isValidDay(day, month, year) {
  const thirtyOneDayMonths = new Set([1,3,5,7,8,10,12]);
  if (day < 1 || day > 31) {
    return false;
  }
  if (day < 29) { // We don't need to do other checks
    return true;
  }
  if (day <= 31 && thirtyOneDayMonths.has(day)) {
    return true;
  }
  if (day <= 30 && month !== 2) {
    return true;
  }
  if (day === 29 && month === 2 && (year % 4 === 0)) {
    return true;
  }
  return false;
}

function checkDateValid(date) {
  const {d: day, m: month, y: year} = date;
  const errors = {
    d: '',
    m: '',
    y: '',
  };
  let monthNum = 0;
  let dayNum = 0;
  let yearNum = 0;
  
  if (!isInteger(year)) {
    errors.y = 'Year must be an integer';
  }
  else {
    yearNum = Number.parseInt(year);
    if (yearNum > 2021) {
      errors.y = 'Must be a valid year';
    }
    else {
      errors.y = '';
    }
  }

  if(!isInteger(month)) {
    errors.m = 'Month must be an integer';
  }
  else {
    monthNum = Number.parseInt(month);
    if (monthNum < 1 || monthNum > 12) {
      errors.m = 'Month must be 1-12';
    }
    else {
      errors.m = '';
    }
  }

  if (!isInteger(day)) {
    errors.d = 'Day must be an integer.';
  }
  else {
    dayNum = Number.parseInt(day);
    if (dayNum < 1 || !isValidDay(dayNum, monthNum, yearNum)) {
      errors.d = 'Must be a valid day';
    }
    else {
      errors.d = '';
    }
  }
  return errors;
}

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
  const [date, setDay] = useState({
    d: '2',
    m: '2',
    y: '2',
  });
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");

  const isDateValid = checkDateValid(date);
  const isHourValid = checkHourValid(hour);
  const isMinuteValid = checkMinuteValid(minute);

  const handleDay = (e) => {
    const {m,y} = date;
    setDay({
      d: e.value,
      m,
      y,
    });
  };
  const handleMonth = (e) => {
    const {d,y} = date;
    setDay({
      d,
      m: e.value,
      y,
    });
  }
  const handleYear = (e) => {
    const {m,d} = date;
    setDay({
      d,
      m,
      y: e.value,
    });
  }
  const handleHour = (e) => {
    setHour(e.value);
  };
  const handleMinute = (e) => {
    setMinute(e.value);
  };

  console.log(isDateValid);
  const {d,m,y} = date;
  return (
    <div className="screentime-wrapper">
      <h1>Some ScreenTime</h1>
      <div className="data-entry">
        <h2 className="row-header">Data Point Entry</h2>
        <input type="text" defaultValue={2} onChange={handleDay} className="date-entry"/>
        <input type="text" defaultValue={2} onChange={handleMonth} className="date-entry"/>
        <input type="text" defaultValue={2} onChange={handleYear} className="date-entry"/>
        <input type="text" defaultValue={2} onChange={handleHour} className="time-entry"/>
        <input type="text" defaultValue={2} onChange={handleMinute} className="time-entry"/>

        {/* <InputDate value={date} setValue={setDate} errormsg={isDateValid} className="time-entry">
          <h3>Date:</h3>
        </InputDate>
        <InputBox value={hour} setValue={setHour} errormsg={isHourValid} className="time-entry">
          <h3>Hour:</h3>
        </InputBox>
        <InputBox value={minute} setValue={setMinute} errormsg={isMinuteValid} className="time-entry">
          <h3>Minute:</h3>
        </InputBox> */}
      </div>
    </div>
  )
}