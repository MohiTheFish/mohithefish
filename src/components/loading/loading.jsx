import React from 'react';

import './loading.scss';

export default function Loading({id, style}) {
  return (
    <div id={id} className="lds-ripple" style={style}>
      <div />
      <div />
    </div>
  );
}