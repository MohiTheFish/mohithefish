import React, { useState, useRef, useEffect } from 'react';
import Loading from 'components/Loading/loading';

import './screenTimeVisualizor.scss';

const d3 = window.d3;

const data = [{
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
  let d3Div = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (d3Div) {
      const svgCanvas = d3.select(d3Div)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("border", "1px solid black")

      svgCanvas.selectAll("rect")
        .data(data).enter()
          .append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill", "orange");
      setIsLoading(false);
    }
  }, [d3Div])

  return (
    <div className="screentime-visualizor">
      {
        isLoading
        ? <Loading />
        : null
      }
      <div id="d3div" className={isLoading ? 'hidden' : ''} ref={el => d3Div = el} />
    </div>
  )
}