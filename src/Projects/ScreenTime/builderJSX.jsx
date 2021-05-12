import ReactDOMServer from 'react-dom/server';
import React from 'react';

function tagTime(t, tag) {
  return (
    <React.Fragment key={`${tag}-${t}`}>
    {t}
    <span className='tiny-text'>{`${tag} `}</span>
    </React.Fragment>
  )
}

function buildTooltipTime(name, hour, minute) {
  let str = [<span key={name}>{`${name}: `}</span>];
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

function D3Tooltip({data, flat}) {
  let mostPElems = '';
  if (flat) {
    mostPElems = buildTooltipTime(data.name, data.hour, data.minute);
  }
  else {
    const apps = data.apps;

    mostPElems = apps.map(({name, hour, minute}) => {
      return buildTooltipTime(name, hour, minute);
    });
  }

  return (
    <div className="tooltip-content">
      <h3>{data.date}</h3>
      {mostPElems}
    </div>
  )
}

export function renderToolTip(data) {
  return ReactDOMServer.renderToString(<D3Tooltip data={data}/>);
}

export function renderToolTipStacked(data) {
  return ReactDOMServer.renderToString(<D3Tooltip flat data={data}/>)
}