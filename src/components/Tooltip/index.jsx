import React from 'react';

import './index.scss';

export default function ToolTip({Header, style, className, text}) {
  return (
    <div className={`hoverable ${className ? className :''}`} style={style}>
      <Header className="hover-trigger"/>
      <span className="tooltip">{text}</span>
    </div> 
  );
}