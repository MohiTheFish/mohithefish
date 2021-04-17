import React, {useState, useEffect} from 'react';
import {isPositiveInteger} from 'components/InputBox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './screenTime.scss';

function TimeEntry({isHour, time, onChange}) {
  return (
    <div className="time-container">
      <input type="text" defaultValue={time} onChange={onChange} className="time-entry"/>
      <p>{isHour ? 'h' : 'm'}</p>
    </div>
  )
}

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
  if (year.length !== 4) {
    errors.y = 'Year must have length 4';
  }
  else if (!isPositiveInteger(year)) {
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

  if (month.length > 2) {
    errors.m = 'Month has too many digits.';
  }
  else if(!isPositiveInteger(month)) {
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

  if (day.length > 2) {
    errors.d = 'Day has too many digits';
  }
  else if (!isPositiveInteger(day)) {
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
  if(!isPositiveInteger(hour)) {
    return 'Hour must be a positive integer';
  }
  if (Number.parseInt(hour) >= 24) {
    return 'Hour must be less than or equal to 24.'
  }
  return '';
}
function checkMinuteValid(min) {
  if(!isPositiveInteger(min)) {
    return 'Minute must be a positive integer';
  }
  if (Number.parseInt(min) >= 60) {
    return 'Minute must be less than or equal to 60.'
  }
  return '';
}

function checkActivitiesValid(acts) {
  const ans = [];
  acts.forEach(({name, h, min}) => {
    ans.push({
      h: checkHourValid(h),
      min: checkMinuteValid(min),
    });
  });
  return ans;
}

function DataErrors(props) {
  const {
    isDayValid,
    isMonthValid,
    isYearValid,
    isHourValid,
    isMinuteValid,
  } = props;

  return (
    <div className="errors">
      <p>{isDayValid}</p>
      <p>{isMonthValid}</p>
      <p>{isYearValid}</p>
      <p>{isHourValid}</p>
      <p>{isMinuteValid}</p>
    </div>
  )
}

export default function ScreenTime() {

  useEffect(() => {
    const originalOnKeyDown = window.onkeydown;
    const originalOnKeyUp = window.onkeyup;
    
    return () => {
      window.onkeydown = originalOnKeyDown;
      window.onkeyup = originalOnKeyUp;
    }
  })
  const [activities, setActivities] = useState([{
    key: 0,
    name: '',
    h: '0',
    min: '0',
  }]);

  const [date, setDay] = useState({
    d: '02',
    m: '02',
    y: '2020',
  });
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");

  const {
    d: isDayValid,
    m: isMonthValid,
    y: isYearValid,
  } = checkDateValid(date);
  const isHourValid = checkHourValid(hour);
  const isMinuteValid = checkMinuteValid(minute);
  const areActivitiesValid = checkActivitiesValid(activities);
  console.log(areActivitiesValid);


  const addActivity = () => {
    const actCopy = activities.map(e => e);
    actCopy.push({
      key: activities[activities.length-1].key + 1,
      name: '',
      h: '0',
      min: '0',
    });
    setActivities(actCopy);
  }
  const handleDay = (e) => {
    const {m,y} = date;
    setDay({
      d: e.target.value,
      m,
      y,
    });
  };
  const handleMonth = (e) => {
    const {d,y} = date;
    setDay({
      d,
      m: e.target.value,
      y,
    });
  }
  const handleYear = (e) => {
    const {m,d} = date;
    setDay({
      d,
      m,
      y: e.target.value,
    });
  }
  const handleHour = (e) => {
    setHour(e.target.value);
  };
  const handleMinute = (e) => {
    setMinute(e.target.value);
  };

  const handleActivityKey = (index, e) => {
    const actCopy = activities.map(e => e);
    actCopy[index].name = e.target.value;
    setActivities(activities);
  }

  const handleActivityHour = (index, e) => {
    console.log('act hour');
    const actCopy = [...activities];
    actCopy[index].h = e.target.value;
    setActivities(actCopy);
  }

  const handleActivityMin = (index, e) => {
    const actCopy = activities.map(e => e);
    actCopy[index].min = e.target.value;
    setActivities(actCopy);
  }

  const handleActivityDelete = (index) => {
    const actCopy = activities.filter((v,i) => (i!==index));
    setActivities(actCopy);
  }

  const {d,m,y} = date;

  // console.log(isDayValid, isMonthValid, isYearValid, isHourValid, isMinuteValid);
  // console.log(activities);

  const errored = !(!isDayValid && !isMonthValid && !isYearValid && !isHourValid & !isMinuteValid);
  return (
    <div className="screentime-wrapper">
      <h1>Some ScreenTime Data</h1>
        <h2 className="row-header">Data Point Entry</h2>
        <div className="data-entry-container date-entry-container">
          <h3>Date (mm/dd/yyyy)</h3>
          <input type="text" defaultValue={m} onChange={handleMonth} className="date-entry"/>
          <span className="slash">/</span>
          <input type="text" defaultValue={d} onChange={handleDay} className="date-entry"/>
          <span className="slash">/</span>
          <input type="text" defaultValue={y} onChange={handleYear} className="date-entry year"/>
        </div>

        <div className="data-entry-container time-entry-container">
          <h3>Total Time</h3>
          <TimeEntry isHour time={hour} onChange={handleHour} />
          <TimeEntry time={minute} onChange={handleMinute} />
        </div>
        <div className="data-entry-container">
          <h3>Activities</h3>
          <div className="activity-entry-container" style={{gridTemplateRows: `repeat(${activities.length}, 35px)`}}>
            {
              activities.map(({key, name, h, min}, index) => {
                return (
                  <React.Fragment key={key}>
                    <input type="text" className="activity-entry" defaultValue={name} onChange={(e) => handleActivityKey(index, e)} />
                    <TimeEntry isHour time={h} onChange={(e) => handleActivityHour(index, e)} />
                    <TimeEntry time={min} onChange={(e) => handleActivityMin(index, e)} />
                    <IconButton size='small' aria-label="delete" onClick={() => handleActivityDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                );
              })
            }
          </div>
        </div>
        <Button
          className="btn"
          color="primary"
          variant="contained"
          disableRipple
          onClick={addActivity}
          size="small"
        >
          Add Activity
        </Button>
        
        
        {
          errored 
          ? <DataErrors
            isDayValid={isDayValid}
            isMonthValid={isMonthValid}
            isYearValid={isYearValid}
            isHourValid={isHourValid}
            isMinuteValid={isMinuteValid} />
          : null
        }
    </div>
  )
}