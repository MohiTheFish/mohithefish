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
const MAX_BAR_WIDTH = 50;




export default function buildVisual(data, target) {
  const wrapper = document.getElementById('d3-wrapper');
  const height = wrapper.offsetHeight;
  const width = wrapper.offsetWidth;

  const marginLeftRight = 30;
  const marginTopBottom = 30;



  const svgCanvas = d3.select(target)
    .attr("width", width)
    .attr("height", height)
    .attr("border", "1px solid black");
  
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 1)
    .style('display', 'none');

  const n = data.length;
  let barWidth = Math.min(MAX_BAR_WIDTH, (width - 2 * marginLeftRight) / n - MIN_SPACING_BARS);


  let totals = data.map((d) => getTotalMin(d));
  const max = getMax(totals);
  for (let i=0; i<totals.length; i++) {
    totals[i] = totals[i] / max;
  }

  const y_axis = d3.scaleLinear()
    .domain([max, 0])
    .range([0, height])
  

  svgCanvas.append("g")
    .attr("transform", `translate(${marginLeftRight}, 0)`)
    .call(d3.axisLeft(y_axis));

  const rects = svgCanvas.selectAll("rect")
    .data(data).enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", (d, i) => {
        console.log(parseDate(d.date).getTime());
        return height * totals[i];
      })
      .attr("fill", "orange")
      .attr("x", (d, i) => {
        const val = 2 + marginLeftRight + i/n * width;
        return val;
      })
      .attr("y", (d, i) => {
        return `${height - height * totals[i]}`;
      });

  rects.on('mousemove', function(e, d) {
    // The rectangle.
    d3.select(this).attr('opacity', .85);
    // const i = rects.nodes().indexOf(this);
    // console.log(d, i);
    // const mydata = d.apps[i];
    // console.log(d);

    const tooltipHTML = renderToolTip(d);

    let tooltipClass = `tooltip-donut above`;
    if (e.pageY < 200) {
      tooltipClass = 'tooltip-donut';
    }
    
    tooltip.html(tooltipHTML)
      .style('display', 'block')
      .style("left", (e.pageX + 10) + "px")
      .style("top", (e.pageY) + "px")
      .attr('class', tooltipClass);
    })
  .on('mouseout', function(d, i) {
    d3.select(this).attr('opacity', 1);

    tooltip.style('display', 'none');
  })
}