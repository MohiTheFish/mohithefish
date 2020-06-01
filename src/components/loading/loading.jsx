import React from 'react';

import './loading.scss';

export default function Loading() {
  return (
    <div className="loading">

      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}