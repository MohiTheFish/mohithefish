import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './screenTime.scss';
import {
  ACTIVITY_NAMES,
  VERTICAL_ACTIVITY_SPACING,
  initDropdownOptions,
  checkDateValid,
  checkHourValid,
  checkMinuteValid, 
} from './util';
import Dropdown from './dropdown';
import TimeEntry from './timeEntry';

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

function parseTime(num) {
  const ret = Number.parseInt(num);
  if (Number.isNaN(ret)) {
    return 'Invalid Format';
  }
  return ret;
}

function JsonifiedData({hour, minute, activities, date}) {
  const [isCopying, setIsCopying] = useState(false);
  const obj = {
    date: `${date.m.padStart(2, '0')}/${date.d.padStart(2, '0')}/${date.y}`,
    total: {
      hour: parseTime(hour),
      minute: parseTime(minute),
    },
  };
  if (activities.length > 0) {
    const apps = [];
    activities.forEach(({name, h, min}) => {
      if (name.length > 0) {
        let numMin = parseTime(min);
        let numHours = parseTime(h);
        if (numMin > 60) {
          const addHours = Math.floor(numMin / 60);
          numMin = numMin % 60;
          numHours += addHours;
        }
        apps.push({
          name: name.replace(/\s+/g, ' ').trim(),
          hour: numHours,
          minute: numMin,
        })
      }
    });
    if (apps.length > 0)
      obj.apps = apps;
  }

  const str = JSON.stringify(obj, null, 2);

  function copyToClipboard() {
    setIsCopying(true);
    navigator.clipboard.writeText(str).then(() => {
      setIsCopying(false);
    })
  }

  return (
    <div className='json-string'>
      <Button onClick={copyToClipboard} color="primary">Copy to Clipboard</Button>
      {isCopying ? <p className="copying">Copying...</p> : <p className="copying done">Done!</p>}
      <pre>
        {str}
      </pre>
    </div>
  )
}

function initDay() {
  const today = new Date();
  return {
    d: today.getDate().toString(),
    m: (today.getMonth()+1).toString(),
    y: today.getFullYear().toString(),
  };
}

export default function ScreenTime() {

  useEffect(() => {
    const originalOnKeyDown = window.onkeydown;
    const originalOnKeyUp = window.onkeyup;
    return () => {
      window.onkeydown = originalOnKeyDown;
      window.onkeyup = originalOnKeyUp;
    }
  });

  const [activities, setActivities] = useState([]);
  const [seenActivities, setSeenActivities] = useState(initDropdownOptions());


  let mydropdown = useRef();
  const actRefs = useRef([]);
  const [date, setDay] = useState(initDay());
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
  // const areActivitiesValid = checkActivitiesValid(activities);


  useEffect(() => {
    actRefs.current = actRefs.current.slice(0, activities.length);
  }, [activities.length]);

  useEffect(() => {
    
    const hideDropDown = (e) => {
      let newindex = -1;
      if (!actRefs.current[dropdownIndex].contains(e.target) //did not click on the current input box
       && (mydropdown.current && !mydropdown.current.contains(e.target))) // and did not click on the dropdown 
      {
        newindex = -1;
      }
      for (let i=0; i<actRefs.current.length; i++) {
        if (actRefs.current[i] && actRefs.current[i].contains(e.target)) {
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

  const updateActivities = (index, e) => {
    const actCopy = activities.map(e => e);
    actCopy[index].name = e.target.value;
    setActivities(actCopy);
    const newSeenActivities = generateNewSeenActivities(actCopy).filter((str) => {
      return (!e.target.value || str.toLowerCase().startsWith(e.target.value.toLowerCase()))
    });
    setSeenActivities(newSeenActivities);
  }

  const handleActChange = (index, e) => {
    updateActivities(index, e);
    showDropdown(index);
  }
  const handleActivityFocus = (index, e) => {
    updateActivities(index, e);
    showDropdown(index); /** @Todo Handle blur sets dropdownIndex to -1, but this is 'undoing' that. Prolly should consider a different option... */
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
  /** Recreates the list of items in the dropdown */
  const generateNewSeenActivities = (act) => {
    const newSeenActivities = [];
    ACTIVITY_NAMES.forEach((name) => {
      let addThisName = true;
      for (let i = 0; i<act.length; i++) {
        const actName = act[i].name;
        if (name === actName) {
          addThisName = false;
          break;
        }
      }
      if (addThisName) {
        newSeenActivities.push(name);
      }
    });
    return newSeenActivities;
  }
  const handleBlur = (actCopy) => {
    let act = actCopy ? actCopy : activities;
    const newSeenActivities = generateNewSeenActivities(act);
    showDropdown(-1);
    setSeenActivities(newSeenActivities);
  }

  const handleActivityDelete = (index) => {
    const actCopy = activities.filter((v,i) => (i!==index));
    handleBlur(actCopy);
    setActivities(actCopy);
  }

  const selectDropdownEntry = (index, activeDropdownIndex) => {
    const actCopy = activities.map(e => e);
    let name = activities[index].name;
    if (activeDropdownIndex >= 0) {
      name = seenActivities[activeDropdownIndex];
    }
    actCopy[index] = {
      ...actCopy[index],
      name,
    }
    handleBlur(actCopy);
    setActivities(actCopy);
    mydropdown.current.scrollTop = 0;
  }

  const updatedropdownScrollDown = (newActiveDropdown) => {
    const MAX_ELEMS = 10;
    const currentdropdownTop = Math.floor((mydropdown.current.scrollTop) / 20);
    if ( newActiveDropdown < currentdropdownTop || newActiveDropdown >= currentdropdownTop + MAX_ELEMS ) {
      const diff = (newActiveDropdown - currentdropdownTop);
      const newScrollPos = mydropdown.current.scrollTop + 20 * diff;
      if (newScrollPos < mydropdown.current.scrollHeight) {
        mydropdown.current.scrollTop = newScrollPos;
      }
    }
  }
  const updatedropdownScrollUp = (newActiveDropdown, ) => {
    const MAX_ELEMS = 10;
    const currentelems = Math.floor(mydropdown.current.scrollHeight / 20);
    const currentdropdownTop = Math.floor((mydropdown.current.scrollTop) / 20);
    const activePosition = newActiveDropdown - (ACTIVITY_NAMES.length - currentelems);
    if ( activePosition < currentdropdownTop || activePosition >= currentdropdownTop + MAX_ELEMS ) {
      const diff = (activePosition - currentdropdownTop);
      const newScrollPos = mydropdown.current.scrollTop + 20 * diff;
      if (newScrollPos < mydropdown.current.scrollHeight) {
        mydropdown.current.scrollTop = newScrollPos;
      }
    }
  }
  const handleActKeyDown = (index, e) => {
    if (e.key === 'ArrowDown') {
      let newActiveDropdown = activeDropdown + 1;
      if (newActiveDropdown === seenActivities.length) {
        newActiveDropdown = 0;
      }
      setDropdownInfo({
        dropdownIndex,
        activeDropdown: newActiveDropdown
      });
      updatedropdownScrollDown(newActiveDropdown);
    }
    if (e.key === 'ArrowUp') {
      let newActiveDropdown = activeDropdown - 1;
      
      if (newActiveDropdown < 0) {
        newActiveDropdown = seenActivities.length - 1;
      }
      setDropdownInfo({
        dropdownIndex,
        activeDropdown: newActiveDropdown
      });
      updatedropdownScrollUp(newActiveDropdown);
    }
    if (e.key === 'Enter') {
      selectDropdownEntry(index, activeDropdown);
    }
  }

  const {d,m,y} = date;

  const errored = !(!isDayValid && !isMonthValid && !isYearValid && !isHourValid & !isMinuteValid);
  return (
    <div className="screentime-editor">
        <h2 className="row-header">Data Point Entry</h2>
        <div className="data-entry-container date-entry-container">
          <h3>Date (mm/dd/yyyy)</h3>
          <input type="text" value={m} onChange={handleMonth} className="date-entry"/>
          <span className="slash">/</span>
          <input type="text" value={d} onChange={handleDay} className="date-entry"/>
          <span className="slash">/</span>
          <input type="text" value={y} onChange={handleYear} className="date-entry year"/>
        </div>

        <div className="data-entry-container time-entry-container">
          <h3>Total Time</h3>
          <TimeEntry isHour time={hour} onChange={handleHour} />
          <TimeEntry time={minute} onChange={handleMinute} />
        </div>
        <div className="data-entry-container activity-entry-container">
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
          <div className="activity-entry-grid-container" style={{gridTemplateRows: `repeat(${activities.length}, ${VERTICAL_ACTIVITY_SPACING}px)`}}>
            {
              activities.map(({key, name, h, min}, index) => {
                return (
                  <React.Fragment key={key}>

                    <input
                      type="text"
                      className="activity-entry"
                      value={name}
                      ref={(el) => (actRefs.current[index] = el)}
                      onChange={(e) => handleActChange(index, e)}
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
              activities={activities}
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

        {/* <Button variant="contained" color="primary" onClick={saveData}>Get Data</Button> */}
        <JsonifiedData activities={activities} date={date} hour={hour} minute={minute}/>
    </div>
  )
}