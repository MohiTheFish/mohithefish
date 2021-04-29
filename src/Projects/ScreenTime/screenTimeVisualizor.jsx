import React, { useState, useRef, useEffect } from 'react';
import Loading from 'components/Loading/loading';
import buildVisual from './builder';
import Button from '@material-ui/core/Button'

import './screenTimeVisualizor.scss';

const temp_data = [
  {
    "date": "03/29/2021",
    "total": {
      "hour": 6,
      "minute": 5
    },
    "apps": [
      {
        "name": "Youtube",
        "hour": 2,
        "minute": 57
      },
      {
        "name": "Netflix",
        "hour": 1,
        "minute": 9
      },
      {
        "name": "Fire Emblem Heroes",
        "hour": 0,
        "minute": 39
      },
      {
        "name": "Reddit",
        "hour": 0,
        "minute": 20
      },
      {
        "name": "Messenger",
        "hour": 0,
        "minute": 15
      },
      {
        "name": "Gmail",
        "hour": 0,
        "minute": 11
      },
      {
        "name": "Chrome",
        "hour": 0,
        "minute": 9
      },
      {
        "name": "Messages",
        "hour": 0,
        "minute": 1
      }
    ]
  },
  {
  "date": "03/30/2021",
  "total": {
    "hour": 8,
    "minute": 56
  },
  "apps": [
    {
      "name": "Fire Emblem Heroes",
      "hour": 4,
      "minute": 48
    },
    {
      "name": "Messenger",
      "hour": 0,
      "minute": 11
    },
    {
      "name": "Chrome",
      "hour": 0,
      "minute": 8
    },
    {
      "name": "Gmail",
      "hour": 0,
      "minute": 3
    },
    {
      "name": "Messages",
      "hour": 0,
      "minute": 1
    },
    {
      "name": "Discord",
      "hour": 0,
      "minute": 1
    }
  ]
}];

export default function ScreenTimeVisualizor() {
  const d3Div = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [load,] = useState(true);

  useEffect(() => {
    function buildVisualization(data, target) {
      buildVisual(data, target);
        
      setIsLoading(false);
    }

    async function getScreenTimeData() {
      fetch(process.env.PUBLIC_URL + '/screen.json', {
        "content-type": 'application/json',
      }).then(res => res.json())
      .then(res => {
        setIsLoadingData(false);
        buildVisualization(res, d3Div.current);
      });
    }

    if (load) {
      getScreenTimeData();
    }
    else {
      buildVisualization(temp_data, d3Div.current);
    }
  }, [load]);

  return (
    <div className="screentime-visualizor">
      {
        (isLoadingData&&load) || isLoading 
        ? <Loading />
        : null
      }
      <div id="d3-wrapper" className={isLoading ? 'hidden' : ''} >
        <div className="summary">
          <h3>Days Recorded: <span id="num-days"></span></h3>
          <h3>Total Time: <span id="total-time"></span></h3>
          <h3>Daily Average: <span id="daily-average"></span></h3>
        </div>
        <div className="controls">
          <h3>Currently Viewing: <span id="current-date"></span></h3>
          <Button color="primary" id="see-prev">See Prev</Button>
          <Button color="primary" id="see-next">See Next</Button>
        </div>
        <svg id="d3div" ref={el => d3Div.current = el}/>
      </div>
    </div>
  )
}