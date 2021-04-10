import React, {useState} from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import './index.scss';

function InputBox(props) {
  const { value, setValue, errormsg, children } = props;
  // const question = children[0];
  let error = Boolean(errormsg);

  let inputProps = {
    className: "time-input",
    label: "Time",
    value: value,
    onChange: handleChange, 
  }

  function handleChange(e) {
    setValue(e.target.value.toUpperCase());
  }
  return (
    <section className="setting">
      {children}
      <FormControl error={error} className="full-width">
        <Input
          fullWidth={true}
          {...inputProps}
        />
        {
          error
          ? <FormHelperText>{errormsg}</FormHelperText>
          : null
        }
      </FormControl>
    </section>
  );
}

const DEFAULT_STRING_1 = 'GGTAG';
const DEFAULT_STRING_2 = 'GGCAGT';

function ValidSymbols({symbols}) {
  return (
    <section className="possible-symbols">
      <h3>Valid Symbols:</h3>
      <p>
        {
          symbols.map(symbol => <span key={symbol}>{symbol}</span>)
        }
      </p>

    </section>
  );
}

const VALID_SYMBOLS = ['A', 'T', 'C', 'G'];
const VALID_SYMBOLS_LOOKUP = new Set(VALID_SYMBOLS);

function initalizeSimilarityMatrix() {
  return [
    [1, -1, -1, -1, -1],
    [-1, 1, -1, -1, -1],
    [-1, -1, 1, -1, -1],
    [-1, -1, -1, 1, -1],
    [-1, -1, -1, -1, 1],
  ];
}
function Matrix({ matrix, handleChange, isValid }) {
  const n = matrix.length; 
  
  const grid = [
    <p key="empty" id="empty" />,
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
      if (j <= i) {
        grid.push(
          <input key={`${i}${j}`} id={i*n + j} onChange={handleChange} value={matrix[i][j]} className="value" />
        )
      }
      else {
        grid.push(
          <p key={`${i}${j}`} className="value" > {matrix[i][j]} </p>
        )
        
      }
    }
  }

  return (
    <section>
      <h3>Similarity Matrix:</h3>
      <div className="matrix">
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


function isFloat(num) {
  // return /^(\+|-)?\d+$/.test(num);
  return /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(num);
}
function checkIsValidMatrix(matrix) {
  const n = matrix.length;
  for (let i=0; i<n; i++) {
    for (let j=0; j<=i; j++) {
      if (!isFloat(matrix[i][j])){
        console.log(matrix[i][j]);
        return false;
      }
    }
  }
  return true;
}

export default function Alignment() {
  const [string1, setString1] = useState(DEFAULT_STRING_1); 
  const [string2, setString2] = useState(DEFAULT_STRING_2);
  const [matrix, setMatrix] = useState(initalizeSimilarityMatrix());

  function checkIsValidString(str) {
    for(let i=0; i<str.length; i++) {
      if (!VALID_SYMBOLS_LOOKUP.has(str[i]))
        return 'String must only consist of valid symbols A, T, C, G';
    }
    return '';
  }


  function handleMatrixChange(e) {
    const num = Number.parseInt(e.target.id);
    const n = matrix.length;
    const col = num % n;
    const row = Math.floor(num / n);
    
    const mCopy = [...matrix];
    mCopy[row][col] = e.target.value;
    mCopy[col][row] = e.target.value; // Symmetric over the diagonal.
    setMatrix(mCopy);
  }


  const isString1Valid = checkIsValidString(string1);
  const isString2Valid = checkIsValidString(string2);
  const isValidMatrix = checkIsValidMatrix(matrix);
  const shouldEnableButton = (!isString1Valid && !isString2Valid && isValidMatrix);
  return (
    <div className="alignment-wrapper">
      <h1> String Alignment </h1>
      <div className="algorithm">
        <div className="parameters">
          <ValidSymbols symbols={VALID_SYMBOLS} />
          <InputBox value={string1} setValue={setString1} errormsg={isString1Valid}>
            <h3>First string:</h3>
          </InputBox>
          <InputBox value={string2} setValue={setString2} errormsg={isString2Valid}>
            <h3>Second string:</h3>
          </InputBox>
          <Matrix matrix={matrix} isValid={isValidMatrix} handleChange={handleMatrixChange}/>

          <section>
            <Button disabled={!shouldEnableButton} color="primary" variant="contained">Compute Alignment</Button>
          </section>
        </div>
        <div className="output">

        </div>
      </div>
    </div>
  )
}