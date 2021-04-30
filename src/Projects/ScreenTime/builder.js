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

const MAX_DAYS = 28;
let currentIndex = 0;
export default function buildVisual(data, target) {
  // data.forEach(d => {
  //   data.push(d);
  // });
  let subset = [];
  for (let i=0; i<Math.min(MAX_DAYS, data.length); i++) {
    subset.push(data[i]);
  }
  let n = subset.length;

  const wrapper = document.getElementById('d3-wrapper');
  const height = wrapper.offsetHeight;
  const width = wrapper.offsetWidth;

  const marginLeftRight = 0;
  const marginTopBottom = 20;

  const widthExcludingMargin = width - 100 - 2*marginLeftRight;
  const heightExcludingMargin = height - marginTopBottom;

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


  let totals = data.map((d) => getTotalMin(d));
  let totalCompleteTime = 0;
  const max = getMax(totals);
  for (let i=0; i<totals.length; i++) {
    totalCompleteTime += totals[i];
    totals[i] = totals[i] / max;
  }

  document.getElementById('num-days').innerHTML = data.length;
  let totalTotalHour = Math.floor(totalCompleteTime / 60);
  let totalTotalMinute = totalCompleteTime % 60;
  document.getElementById('total-time').innerHTML = `${totalTotalHour}<span class="tiny-text">h</span> ${totalTotalMinute}<span class="tiny-text">m</span>`

  totalCompleteTime = totalCompleteTime / data.length;
  totalTotalHour = Math.floor(totalCompleteTime / 60);
  totalTotalMinute = Math.floor(totalCompleteTime) % 60;
  document.getElementById('daily-average').innerHTML = `${totalTotalHour}<span class="tiny-text">h</span> ${totalTotalMinute}<span class="tiny-text">m</span>`


  document.getElementById('current-date').innerHTML = `${data[0].date} - ${data[n-1].date}`
  var y_axis = d3.scaleLinear()
    .domain([max, 0])
    .range([0, heightExcludingMargin])
    
  const lenAlongXAxis = widthExcludingMargin;
  var x_axis = d3.scaleTime()
    .domain([parseDate(subset[0].date), parseDate(subset[n-1].date)])
    .range([2, 2 + lenAlongXAxis / MAX_DAYS * (n-1)])
    
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
    .attr("transform", `translate(${marginLeftRight + 2 + barWidth/2}, ${height-marginTopBottom})`)
    .call(
      d3.axisBottom(x_axis)
      .ticks(n)
      .tickFormat( formatDate )
    )
    .selectAll("text")
    .attr("transform", `rotate(0) translate(0, 0)`);

  const color = `rgb(45, 207, 17)`;
  const lightColor = `rgb(54, 242, 22)`;

  const rects = svgCanvas.selectAll("rect")
    .data(data).enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", (d, i) => {
        return heightExcludingMargin * totals[i];
      })
      .attr("fill", color)
      .attr("x", (d, i) => {
        const val = 2 + marginLeftRight + i/n * lenAlongXAxis;
        return val;
      })
      .attr("y", (d, i) => {
        return `${heightExcludingMargin - heightExcludingMargin * totals[i]}`;
      });

  rects.on('mousemove', function(e, d) {
    const tooltipHTML = renderToolTip(d);

    const shouldMoveBelow = e.pageY >= 200;
    const shouldMoveLeft = (e.pageX + 10) >= 1000;
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
    rects.transition().duration(1000).attr("x", (d, i) => {
      const val = 2 + marginLeftRight + (i-offset)/n * lenAlongXAxis;
      return val;
    })
  }
  function translateXAxis(offset) {
    d3.select('#x_axis')
    .transition()
    .duration(1000)
    .attr("transform", `translate(${marginLeftRight + 2 + barWidth/2}, ${height-marginTopBottom})`)
  }

  function rerenderXAxis(offset) {
    const endElement = Math.min(data.length -1 , offset+MAX_DAYS-1);
    const numElements = endElement - offset;

    console.log(offset, endElement);
    x_axis = d3.scaleTime()
    .domain([parseDate(data[offset].date), parseDate(data[endElement].date)])
    .range([2, 2 + lenAlongXAxis / MAX_DAYS * (numElements)])
    
    document.getElementById('current-date').innerHTML = `${data[offset].date} - ${data[endElement].date}`
    d3.select('#x_axis').call(
      d3.axisBottom(x_axis)
      .ticks(numElements)
      .tickFormat(formatDate)
    );
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