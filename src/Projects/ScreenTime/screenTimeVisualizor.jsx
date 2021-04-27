import React, { useState, useRef, useEffect } from 'react';
import Loading from 'components/Loading/loading';
import buildVisual from './builder';

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
      "name": "Youtube",
      "hour": 1,
      "minute": 51
    },
    {
      "name": "Netflix",
      "hour": 1,
      "minute": 8
    },
    {
      "name": "Reddit",
      "hour": 0,
      "minute": 29
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
  const [screenData, setScreenData] = useState();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [load,] = useState(false);

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
        setScreenData(res);
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
  }, [load])

  return (
    <div className="screentime-visualizor">
      {
        (isLoadingData&&load) || isLoading 
        ? <Loading />
        : null
      }
      <div id="d3-wrapper" className={isLoading ? 'hidden' : ''} >
        <svg id="d3div" ref={el => d3Div.current = el}/>
      </div>
    </div>
  )
}