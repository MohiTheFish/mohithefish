import { renderToolTipStacked } from './builderJSX';
import {renderToolTip} from './builderJSX';

const d3 = window.d3;

function getMax(d) {
  let maxVal = d[0];
  for (let i = 0; i<d.length; i++) {
    if (d[i] > maxVal) {
      maxVal = d[i];
    }
  }
  return maxVal;
}

function getTotalMin({total}) {
  return total.hour*60 + total.minute;
}

function getTotalTime(arg) {
  return arg.hour*60 + arg.minute;
}

export function preprocess(data) {
  let totals = data.map((d) => getTotalMin(d));
  
  let totalCompleteTime = 0;
  const max = getMax(totals);
  for (let i=0; i<totals.length; i++) {
    totalCompleteTime += totals[i];
    totals[i] = totals[i] / max;
  }

  for (let i=0; i<data.length; i++) {
    if (data[i].apps.length === 0) {
      data[i].apps.push({
        name: 'Other',
        hour: -1,
        minute: -1,
        range: .1,
        offset: 0,
      })
      continue;
    }
    data[i].apps.sort((a, b) => getTotalTime(b) - getTotalTime(a));
    for (let j=0; j<data[i].apps.length; j++) {
      const app = data[i].apps[j];
      app.range = getTotalTime(app) / getTotalMin(data[i]) * totals[i];
      if (j !== 0) {
        app.offset = data[i].apps[j-1].range + data[i].apps[j-1].offset;
      }
      else { // j === 0
        app.offset = 0;
      }
    }


    let totalTime = 0;
    data[i].apps.forEach(({hour, minute}) => {
      totalTime += hour*60 + minute;
    });

    const otherTime = getTotalMin(data[i]) - totalTime;
    const lastapp = data[i].apps[data[i].apps.length - 1];

    data[i].apps.push({
      name: 'Other',
      hour: Math.floor(otherTime / 60),
      minute: otherTime % 60,
      range: otherTime / getTotalMin(data[i]) * totals[i],
      offset: lastapp.range + lastapp.offset
    })
  }

  return {
    max,
    totals,
    data,
    totalCompleteTime,
  };
}

function collectUniqueActivities(data) {
  const keys = new Set();
  data.forEach(({apps}) => {
    apps.forEach(({name}) => {
      keys.add(name);
    })
  })

  return keys;
}

function formatDate(date) {
  const [month, day, year] = date.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).split('/');
  return `${month}/${day}/${year.substring(2)}`;
}

const parseDate = d3.timeParse("%m/%d/%Y");

function getOneAfter(date) {
  let curr = parseDate(date).getTime();
  curr += 1000 * 60 * 60 * 24; 
  return new Date(curr);
}

const MIN_SPACING_BARS = 5;
const MAX_BAR_WIDTH = 30;
const ADDITIONAL_PADDING = 2;

const MAX_DAYS = 28;
let currentIndex = 0;
export default function buildVisual(preparedData, target, option) {
  console.log('build visual');
  const {max, totals, data, totalCompleteTime} = preparedData;
  let n = Math.min(MAX_DAYS, data.length);

  const wrapper = document.getElementById('d3-wrapper');
  const height = wrapper.offsetHeight;
  const width = wrapper.offsetWidth;

  const marginLeftRight = 0;
  const marginTopBottom = 20;

  const widthExcludingMargin = width - 100 - 2*marginLeftRight;
  const heightExcludingMargin = height - marginTopBottom;

  target.innerHTML = '';
  const svgCanvas = d3.select(target)
    .attr("width", widthExcludingMargin)
    .attr("height", height)
    .attr("border", "1px solid black");

  
  let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .attr("id", "d3-tooltip")
    .style("opacity", 1)
    .style('display', 'none');

  let barWidth = Math.min(MAX_BAR_WIDTH, widthExcludingMargin / n - MIN_SPACING_BARS);

  document.getElementById('num-days').innerHTML = data.length;
  let totalTotalHour = Math.floor(totalCompleteTime / 60);
  let totalTotalMinute = totalCompleteTime % 60;
  document.getElementById('total-time').innerHTML = `${totalTotalHour}<span class="tiny-text">h</span> ${totalTotalMinute}<span class="tiny-text">m</span>`

  let avgCompleteTime = totalCompleteTime / data.length;
  let avgTotalHour = Math.floor(avgCompleteTime / 60);
  let avgTotalMinute = Math.floor(avgCompleteTime) % 60;
  document.getElementById('daily-average').innerHTML = `${avgTotalHour}<span class="tiny-text">h</span> ${avgTotalMinute}<span class="tiny-text">m</span>`
  
  document.getElementById('current-date').innerHTML = `${data[0].date} - ${data[n-1].date}`
  var y_axis = d3.scaleLinear()
    .domain([max, 0])
    .range([0, heightExcludingMargin])
    
  const lenAlongXAxis = widthExcludingMargin;
  function calcBarPositions(i, offset) {
    return ADDITIONAL_PADDING + marginLeftRight + (i-offset)/ MAX_DAYS * lenAlongXAxis;
  }
  var x_axis = d3.scaleTime()
    .domain([parseDate(data[0].date), parseDate(data[data.length-1].date)])
    .range([0, (data.length-1) * (lenAlongXAxis / MAX_DAYS) ])
  
  var z_axis = d3.scaleOrdinal().range(['#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b','#d53e4f','#fc8d59','#fee08b',]);
  z_axis.domain(data.map(function(d) { return d.keys; }));
  
  function rerenderXAxis(offset) {
    const endElement = Math.min(data.length -1 , offset+MAX_DAYS-1);

    d3.select('#x_axis')
    .transition()
    .duration(1000)
    .attr("transform", `translate(${marginLeftRight + ADDITIONAL_PADDING + barWidth/2 + -offset * (lenAlongXAxis / MAX_DAYS)}, ${height-marginTopBottom})`);

    document.getElementById('current-date').innerHTML = `${data[offset].date} - ${data[endElement].date}`
    d3.select('#x_axis').call(
      d3.axisBottom(x_axis)
      .ticks(data.length)
      .tickFormat(formatDate)
    );
  }

  svgCanvas.append("g")
    .attr("id", "y_axis")
    .attr("transform", `translate(${marginLeftRight}, 0)`)
    .call(d3.axisLeft(y_axis)
    .ticks(5)
    .tickSize(-lenAlongXAxis, 0, 0)
    .tickFormat( function(d) { return d } ))
    .selectAll("text")
    .attr("transform", `translate(30, -5)`);

    
  svgCanvas.append("g")
  .attr("id", "x_axis")
    .attr("transform", `translate(${marginLeftRight + ADDITIONAL_PADDING + barWidth/2 + -currentIndex*7 * (lenAlongXAxis / MAX_DAYS)}, ${height-marginTopBottom})`)
    .call(
      d3.axisBottom(x_axis)
      .ticks(data.length)
      .tickFormat( formatDate )
    )
    .selectAll("text")
    .attr("transform", `rotate(0) translate(0, 0)`);

  const color = `rgb(45, 207, 17)`;
  const lightColor = `rgb(54, 242, 22)`;


  if (option === 0) {
    const bars = svgCanvas.selectAll(".bar").data(data).enter().append('g')
      .attr('class', 'bar')
      .attr('transform', (d, i) => `translate(${calcBarPositions(i, currentIndex*7)}, 0)` );

    const rects = bars.selectAll('rect').data(d => d.apps).enter()
      .append('rect')
      .attr('fill', color)
      .attr('class', (d) => `${d.name.toLowerCase().split(' ').join('_')}`)
      .attr("width", barWidth)
      .attr('y', (d, i) => heightExcludingMargin - (d.offset * heightExcludingMargin) - (d.range * heightExcludingMargin))
      .attr("height", (d) => d.range * heightExcludingMargin);

    rects.on('mousemove', function(e, d) {
      const tooltipHTML = renderToolTipStacked(d);

      const shouldMoveBelow = e.pageY >= 200;
      const shouldMoveLeft = (e.pageX + 10) >= 1000;

      // Move the position of the tooltip origin if switching between left and right.
      const xVal = shouldMoveLeft ? e.pageX - 10 : e.pageX + 10;
      
      let tooltipClass = `tooltip-donut ${shouldMoveBelow ? 'moveBelow' : ''} ${shouldMoveLeft ? 'moveLeft' : ''}`;
      tooltip.html(tooltipHTML)
        .style("left", xVal + "px")
        .style("top", (e.pageY) + "px")
        .attr('class', tooltipClass);
      })
    .on('mouseout', function(d, i) {
      d3.select(this).attr('fill', color);
      tooltip.style('display', 'none');
    })
    .on('mouseenter', function(d, i) {
      d3.select(this).attr('fill', lightColor);
      tooltip.style('display', null);
    });

    function rerenderRects(offset) {
      bars.transition().duration(1000).attr('transform', (d, i) => `translate(${calcBarPositions(i, offset)}, 0)` )
    }
    
    d3.select('#see-next')
    .on("click", function(d) {
      
      const offset = (currentIndex+1) * 7;
      if (offset+1 > data.length) { //don't do anything if there aren't at least 7 days to display
        return;
      }
      currentIndex += 1;


      rerenderRects(offset);
      rerenderXAxis(offset);
      
    })

    d3.select('#see-prev')
    .on("click", function(d) {
      
      if (currentIndex === 0) { // don't do anything if we are at the beginning of history
        return;
      }
      currentIndex -= 1;
      const offset = currentIndex * 7;
      
      rerenderRects(offset);
      rerenderXAxis(offset);
    })
  }
  else {
    const rects = svgCanvas.selectAll("rect")
    .data(data).enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", (d, i) => {
        if (totals[i] < 0) {
          return heightExcludingMargin * .1;
        }
        return heightExcludingMargin * totals[i];
      })
      .attr("fill", color)
      .attr("x", (d, i) => calcBarPositions(i, currentIndex*7))
      .attr("y", (d, i) => {
        if (totals[i] < 0) {
          return heightExcludingMargin - (heightExcludingMargin * .1);
        }
        return `${heightExcludingMargin - heightExcludingMargin * totals[i]}`;
      });

    rects.on('mousemove', function(e, d) {
      const tooltipHTML = renderToolTip(d);

      const shouldMoveBelow = e.pageY >= 200;
      const shouldMoveLeft = (e.pageX + 10) >= 1000;

      // Move the position of the tooltip origin if switching between left and right.
      const xVal = shouldMoveLeft ? e.pageX - 10 : e.pageX + 10;
      
      let tooltipClass = `tooltip-donut ${shouldMoveBelow ? 'moveBelow' : ''} ${shouldMoveLeft ? 'moveLeft' : ''}`;
      tooltip.html(tooltipHTML)
        .style("left", xVal + "px")
        .style("top", (e.pageY) + "px")
        .attr('class', tooltipClass);
      })
    .on('mouseout', function(d, i) {
      d3.select(this).attr('fill', color);
      tooltip.style('display', 'none');
    })
    .on('mouseenter', function(d, i) {
      d3.select(this).attr('fill', lightColor);
      tooltip.style('display', null);
    });


    function rerenderRects(offset) {
      rects.transition().duration(1000).attr("x", (d, i) => { return calcBarPositions(i, offset); });
    }

    d3.select('#see-next')
    .on("click", function(d) {
      
      const offset = (currentIndex+1) * 7;
      if (offset+1 > data.length) { //don't do anything if there aren't at least 7 days to display
        return;
      }
      currentIndex += 1;

      rerenderRects(offset);
      rerenderXAxis(offset);
    })

    d3.select('#see-prev')
    .on("click", function(d) {
      
      if (currentIndex === 0) { // don't do anything if we are at the beginning of history
        return;
      }
      currentIndex -= 1;
      const offset = currentIndex * 7;
      
      rerenderRects(offset);
      rerenderXAxis(offset);
    })
  }
}