import React from 'react';

import './loading.scss';

export default function Loading({id}) {
  return (
    <div id={id} className="lds-ripple">
      <div />
      <div />
    </div>
  );
}