import React, { useState } from 'react';

import './index.scss';

export default function ToolTip({Header, style, className, text}) {
  const [hovered, setHovered] = useState(false);

  const props = {
    className: 'hover-trigger',
  };

  if (!hovered) {
    props.onMouseEnter = () => setHovered(true);
  }


  return (
    <div className={`hoverable ${className ? className :''}`} style={style}>
      <Header {...props} />
      <span className={`mohi-tooltip ${hovered ? 'anim-tooltip': ''}`}>{text}</span>
    </div> 
  );
}