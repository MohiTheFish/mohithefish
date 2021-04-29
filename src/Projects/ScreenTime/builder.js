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

const parseDate = d3.timeParse("%m/%d/%Y");

const MIN_SPACING_BARS = 5;
const MAX_BAR_WIDTH = 30;

export default function buildVisual(data, target) {
  // data.forEach(d => {
  //   data.push(d);
  // });
  const wrapper = document.getElementById('d3-wrapper');
  const height = wrapper.offsetHeight;
  const width = wrapper.offsetWidth;

  const marginLeftRight = 50;
  const marginTopBottom = 20;

  const widthExcludingMargin = width - 2*marginLeftRight;
  const heightExcludingMargin = height - marginTopBottom;

  const svgCanvas = d3.select(target)
    .attr("width", widthExcludingMargin)
    .attr("height", height)
    .attr("border", "1px solid black");

  
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 1)
    .style('display', 'none');

  const n = data.length;
  let barWidth = Math.min(MAX_BAR_WIDTH, widthExcludingMargin / n - MIN_SPACING_BARS);


  let totals = data.map((d) => getTotalMin(d));
  const max = getMax(totals);
  for (let i=0; i<totals.length; i++) {
    totals[i] = totals[i] / max;
  }

  const y_axis = d3.scaleLinear()
    .domain([max, 0])
    .range([0, heightExcludingMargin])
    
  const x_axis = d3.scaleTime()
    .domain([parseDate(data[0].date), parseDate(data[data.length-1].date)])
    .range([0, widthExcludingMargin])
    

  svgCanvas.append("g")
    .attr("transform", `translate(${marginLeftRight}, 0)`)
    .call(d3.axisLeft(y_axis)
    .ticks(5)
    .tickSize(-(width - marginLeftRight), 0, 0)
    .tickFormat( function(d) { return d } ));
  
  const format = date => {
    const [month, day, year] = date.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).split('/');
    return `${month}/${day}/${year.substring(2)}`;
  }

  svgCanvas.append("g")
    .attr("transform", `translate(${marginLeftRight + 2 + barWidth/2}, ${height-marginTopBottom})`)
    .call(
      d3.axisBottom(x_axis)
      .ticks(data.length)
      .tickFormat( function(d) { return format(d) } )
    )
    .selectAll("text")
    .attr("transform", `rotate(0) translate(00, 0)`);


  const color = `rgb(45, 207, 17)`;
  const lightColor = `rgb(54, 242, 22)`;

  const rects = svgCanvas.selectAll("rect")
    .data(data).enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", (d, i) => {
        // console.log(parseDate(d.date).getTime());
        return heightExcludingMargin * totals[i];
      })
      .attr("fill", color)
      .attr("x", (d, i) => {
        const val = 2 + marginLeftRight + i/n * (width - marginLeftRight);
        return val;
      })
      .attr("y", (d, i) => {
        return `${heightExcludingMargin - heightExcludingMargin * totals[i]}`;
      });

  rects.on('mousemove', function(e, d) {
    // const i = rects.nodes().indexOf(this);
    // console.log(d, i);
    // const mydata = d.apps[i];
    // console.log(d);

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
    // This rectangle
    d3.select(this).attr('fill', color);

    tooltip.style('display', 'none');
  })
  .on('mouseenter', function(d, i) {
    // This rectangle
    d3.select(this).attr('fill', lightColor);
    tooltip.style('display', null);
  });
}