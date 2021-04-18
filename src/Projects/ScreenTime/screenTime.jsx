import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import download from 'downloadjs';

import './screenTime.scss';
import Loading from 'components/Loading/loading';
import {
  ACTIVITY_NAMES,
  VERTICAL_ACTIVITY_SPACING,
  initSeen,
  checkDateValid,
  checkHourValid,
  checkMinuteValid, 
  checkActivitiesValid,
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

export default function ScreenTime() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const originalOnKeyDown = window.onkeydown;
    const originalOnKeyUp = window.onkeyup;

    async function getScreenTimeData() {
      setIsLoading(false);
    }

    getScreenTimeData();

    return () => {
      window.onkeydown = originalOnKeyDown;
      window.onkeyup = originalOnKeyUp;
    }
  });

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
    setIsSaving(true);
  }

  // console.log('render');
  const {d,m,y} = date;

  // console.log(isDayValid, isMonthValid, isYearValid, isHourValid, isMinuteValid);

  const errored = !(!isDayValid && !isMonthValid && !isYearValid && !isHourValid & !isMinuteValid);
  return (
    <div className="screentime-editor">
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
        {
          isSaving
          ? <Loading style={{marginLeft: '0'}}/>
          : null
        }
    </div>
  )
}