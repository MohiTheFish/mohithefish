import ReactDOMServer from 'react-dom/server';
import React from 'react';

function D3Tooltip({data}) {
  let total = 0;
  const mostPElems = data.apps.map(({name, hour, minute}) => {
    total += hour*60 + minute;
    return <p key={name}>{`${name}: ${hour*60 + minute}`}</p>;
  });

  const incOther = data.total.hour * 60 + data.total.minute;

  mostPElems.push(
    <p key='other'>{`Other: ${incOther - total}`}</p>
  );


  return (
    <div>
      {mostPElems}
    </div>
  )
}

export function renderToolTip(data) {
  return ReactDOMServer.renderToString(<D3Tooltip  data={data}/>);
}