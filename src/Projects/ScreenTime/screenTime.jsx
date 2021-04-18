import React, {useState, useEffect, useRef} from 'react';
import {isPositiveInteger} from 'components/InputBox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './screenTime.scss';

const VERTICAL_ACTIVITY_SPACING = 35;

function TimeEntry({isHour, time, onChange, onFocus}) {
  return (
    <div className="time-container">
      <input type="text" defaultValue={time} onFocus={onFocus} onChange={onChange} className="time-entry"/>
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

const ACTIVITY_NAMES = [
  'Netflix',
  'Disney+',
  'Reddit',
  'Fire Emblem Heroes',
  'Messenger',
  'iMessage',
  'Discord',
  'Manga Reader',
  'WebToons',
  'Manga Storm',
  'Shounen Jump',
  'Gmail',
];

function Dropdown({ dropdownIndex, dropdownCallback, activeDropdown, seenActivities, selectDropdownEntry }) {

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

function initSeen() {
  const ans = new Map();

  ACTIVITY_NAMES.forEach((act) => {
    ans.set(act, false);
  });

  return ans;
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

  const [isSaving, setIsSaving] = useState(false);
  const [activities, setActivities] = useState([]);
  const [seenActivities, setSeenActivities] = useState(initSeen());


  let mydropdown = useRef();
  const actRefs = useRef([]);
  const [date, setDay] = useState({
    d: '02',
    m: '02',
    y: '2020',
  });
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");
  const [dropdownInfo, setDropdownInfo] = useState({
    dropdownIndex: -1,
    activeDropdown: -1, 
  });
  
  const {dropdownIndex, activeDropdown} = dropdownInfo;

  const {
    d: isDayValid,
    m: isMonthValid,
    y: isYearValid,
  } = checkDateValid(date);
  const isHourValid = checkHourValid(hour);
  const isMinuteValid = checkMinuteValid(minute);
  const areActivitiesValid = checkActivitiesValid(activities);

  useEffect(() => {
    
    const hideDropDown = (e) => {
      let newindex = -1;
      if (!actRefs.current[dropdownIndex].contains(e.target) //did not click on the current input box
       && !mydropdown.current.contains(e.target)) // and did not click on the dropdown 
      {
        newindex = -1;
      }
      for (let i=0; i<actRefs.current.length; i++) {
        if (actRefs.current[i].contains(e.target)) {
          newindex = i;
          break;
        }
      }
      setDropdownInfo({
        dropdownIndex: newindex,
        activeDropdown: -1,
      });
    }
    if (dropdownIndex !== -1) {
      window.onclick = hideDropDown;
    }
    else {
      window.onclick = undefined;
    }

    return () => (window.onclick = undefined);
  }, [dropdownIndex]);

  useEffect(() => {
    actRefs.current = actRefs.current.slice(0, activities.length);
  }, [activities.length]);

  const addActivity = () => {
    const actCopy = activities.map(e => e);
    if (activities.length === 0) {
      actCopy.push({
        key: 0,
        name: '',
        h: '0',
        min: '0',
      });
    }
    else {
      actCopy.push({
        key: activities[activities.length-1].key + 1,
        name: '',
        h: '0',
        min: '0',
      });
    }
    setActivities(actCopy);
  }
  

  const showDropdown = (index) => {
    setDropdownInfo({
      dropdownIndex: index,
      activeDropdown: -1,
    });
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

  const handleActivityFocus = (index, e) => {
    const actCopy = activities.map(e => e);
    actCopy[index].name = e.target.value;
    setDropdownInfo({
      dropdownIndex: index,
      activeDropdown: -1,
    });
    setActivities(activities);
  }

  const handleActivityHour = (index, e) => {
    const actCopy = [...activities];
    actCopy[index].h = e.target.value;
    setActivities(actCopy);
  }

  const handleActivityMin = (index, e) => {
    const actCopy = activities.map(e => e);
    actCopy[index].min = e.target.value;
    setActivities(actCopy);
  }
  const handleBlur = () => {
    showDropdown(-1);
  }

  const handleActivityDelete = (index) => {
    const actCopy = activities.filter((v,i) => (i!==index));
    handleBlur();
    setActivities(actCopy);
  }

  const selectDropdownEntry = (index, activeDropdownIndex) => {
    activities[index] = {
      ...activities[index],
      name: ACTIVITY_NAMES[activeDropdownIndex],
    }
    // LITERALLY 0 CLUE WHY SET STATE WAS NOT UPDATING. MANUALLY UPDATE VIA REF HERE.
    actRefs.current[index].value = ACTIVITY_NAMES[activeDropdownIndex];
    const newSeenActivities = initSeen();
    activities.forEach(({name}) => {
      if (newSeenActivities.has(name)) {
        newSeenActivities.set(name, true);
      }
    })
    console.log(newSeenActivities);
    handleBlur();
    setActivities(activities);
    setSeenActivities(newSeenActivities); 
  }
  const handleActKeyDown = (index, e) => {
    if (e.key === 'ArrowDown') {
      let newActiveDropdown = activeDropdown + 1;
      if (newActiveDropdown === ACTIVITY_NAMES.length) {
        newActiveDropdown = 0;
      }
      setDropdownInfo({
        dropdownIndex,
        activeDropdown: newActiveDropdown
      });
    }
    if (e.key === 'ArrowUp') {
      let newActiveDropdown = activeDropdown - 1;
      if (newActiveDropdown < 0) {
        newActiveDropdown = ACTIVITY_NAMES.length - 1;
      }
      setDropdownInfo({
        dropdownIndex,
        activeDropdown: newActiveDropdown
      });
    }
    if (e.key === 'Enter') {
      selectDropdownEntry(index, activeDropdown);
    }
  }

  const saveData = async function() {

    console.log('save!');
  }

  // console.log('render');
  const {d,m,y} = date;

  // console.log(isDayValid, isMonthValid, isYearValid, isHourValid, isMinuteValid);

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
          <div className="activity-entry-container" style={{gridTemplateRows: `repeat(${activities.length}, ${VERTICAL_ACTIVITY_SPACING}px)`}}>
            {
              activities.map(({key, name, h, min}, index) => {
                return (
                  <React.Fragment key={key}>

                    <input
                      type="text"
                      className="activity-entry"
                      defaultValue={name}
                      ref={(el) => (actRefs.current[index] = el)}
                      onFocusCapture={(e) => handleActivityFocus(index, e)}
                      onKeyDown={(e) => handleActKeyDown(index, e)}
                      onClick={() => showDropdown(index)}
                    />
                    <TimeEntry isHour onFocus={handleBlur} time={h} onChange={(e) => handleActivityHour(index, e)} />
                    <TimeEntry onFocus={handleBlur} time={min} onChange={(e) => handleActivityMin(index, e)} />
                    <IconButton size='small' aria-label="delete" onClick={() => handleActivityDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                );
              })
            }
            <Dropdown
              dropdownCallback={(el ) => (mydropdown.current = el)}
              dropdownIndex={dropdownIndex} 
              activeDropdown={activeDropdown}
              seenActivities={seenActivities}
              selectDropdownEntry={selectDropdownEntry}
            />
          </div>
        </div>
        
        
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
        <Button variant="contained" color="primary" onClick={saveData}>Save Data</Button>
    </div>
  )
}