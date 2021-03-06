import React from 'react';

import Tooltip from 'components/Tooltip';
import { VALID_SYMBOLS } from './utils';

export default function Matrix({ matrix, handleChange, isValid }) {
  const n = matrix.length; 
  
  const grid = [
    <p key="empty" className="empty" />,
    <p key="blank-top" className="category blank-top">-</p>,
  ];
  VALID_SYMBOLS.forEach((symbol) => {
    grid.push(<p key={`${symbol}-top`} className={`category ${symbol}-top`}>{symbol}</p>);
  })
  for (let i=0; i<n; i++) {
    if (i === 0) {
      grid.push(<p key="blank-side" className="category blank-side">-</p>);
    }
    else {
      grid.push(<p key={`${VALID_SYMBOLS[i-1]}-side`} className={`category ${VALID_SYMBOLS[i-1]}-side`}>{VALID_SYMBOLS[i-1]}</p>);
    }

    for (let j=0; j<n; j++) {
      if ((i+j) === 0 || j>i) {
        grid.push(
          <p key={`${i}${j}`} className="value" > {matrix[i][j]} </p>
        )
      }
      else {
        grid.push(
          <input key={`${i}${j}`} id={i*n + j} onChange={handleChange} value={matrix[i][j]} className="value" />
        )
      }
    }
  }

  return (
    <section>
      <Tooltip
       Header={(props) => <h3 {...props}>Similarity Matrix:</h3>}
       text="This is used to align the sequences. Each entry corresponds to how favorable a connection is. Example: a +2 on the intersection of A and G means the algorithm is more likely to align A with G. The '-' character indicates a gap in the alignment, meaning the best match is to skip the character."
       />
      <div className="matrix similarity-matrix">
        {grid}
      </div>
      {
        isValid
        ? null
        : <p className="error-matrix">Please ensure all weights are numbers.</p>
      }
    </section>
  )
}