import ReactDOMServer from 'react-dom/server';
import React from 'react';

function tagTime(t, tag) {
  return (
    <>
    {t}
    <span className='tiny-text'>{`${tag} `}</span>
    </>
  )
}

function buildTooltipTime(name, hour, minute) {
  let str = [<span>{`${name}: `}</span>];
  if (hour > 0) {
    str.push(tagTime(hour, 'h'));
  }
  if (minute > 0) {
    str.push(tagTime(minute, 'm'));
  }
  return (
    <p key={name}>
      {str}
    </p>
  );
}

function D3Tooltip({data}) {
  const {apps, total, date} = data;
  let totalTime = 0;

  const mostPElems = apps.map(({name, hour, minute}) => {
    totalTime += hour*60 + minute;
    return buildTooltipTime(name, hour, minute);
  });

  const incOther = total.hour * 60 + total.minute;
  const diff = incOther - totalTime;

  mostPElems.push(buildTooltipTime('Other', Math.floor(diff / 60), diff % 60));


  return (
    <div className="tooltip-content">
      <h3>{date}</h3>
      {mostPElems}
    </div>
  )
}

export function renderToolTip(data) {
  return ReactDOMServer.renderToString(<D3Tooltip  data={data}/>);
}