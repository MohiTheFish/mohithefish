import React, {useState, useEffect} from 'react';
import Loading from 'components/Loading/loading';
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
    ['-inf', -1, -1, -1, -1],
    [-1, 1, -1, -1, -1],
    [-1, -1, 1, -1, -1],
    [-1, -1, -1, 1, -1],
    [-1, -1, -1, -1, 1],
  ];
}
function Matrix({ matrix, handleChange, isValid }) {
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
      <h3>Similarity Matrix:</h3>
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


function isFloat(num) {
  // return /^(\+|-)?\d+$/.test(num);
  return /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(num);
}
function checkIsValidMatrix(matrix) {
  const n = matrix.length;
  for (let i=0; i<n; i++) {
    for (let j=0; j<=i; j++) {
      if (i+j === 0) // we should ignore this entry
        continue;
      if (!isFloat(matrix[i][j])){
        console.log(matrix[i][j]);
        return false;
      }
    }
  }
  return true;
}

function OutputMatrix({decoder, similarityMatrix, string1, string2,}) {
  const n = similarityMatrix.length;
  const [isComputing, setIsComputing] = useState(true);
  const [dpTable, setdpTable] = useState([]);

  const s1 = string1.length;
  const s2 = string2.length;

  async function computeDPTable() {
    //compute here
    const table = [[]];
    for (let j=0; j<s1; j++) {
      table[0].push(-j);
    }
    
    for(let i=1; i<s2; i++) {
      table.push([]);
      table[i].push(-i);
      for (let j=1; j<s1; j++) {
        table[i].push(0);
      }
    }

    for (let i=1; i<s2; i++) {
      for (let j=1; j<s1; j++) {
        const downDir = table[i-1][j] 
      }
    }
    setdpTable(table);
    setIsComputing(false);
  }

  useEffect(() => {
    console.log(similarityMatrix, string1, string2);
    setIsComputing(true);
    console.log('start computing');
    computeDPTable();
  }, [similarityMatrix, string1, string2]);

  const grid = [<p key="empty" className="empty" />,];
  for (let i=0; i<s1; i++) {
    const symbol = string1[i];
    grid.push(<p key={`${symbol}${i}-top`} className="category output-top">{symbol}</p>);
  }

  if (!isComputing) {
    for (let i=0; i<s2; i++) {
      grid.push(<p key={`${string2[i]}${i}-side`} className="category output-side">{string2[i]}</p>);
  
      for (let j=0; j<s1; j++) {
        grid.push(
          <p key={`${i}${j}`}>{dpTable[i][j]}</p>
        );
      }
    }
  }
  else {
    for (let i=0; i<s2; i++) {
      grid.push(<p key={`${string2[i]}${i}-side`} className="category output-side">{string2[i]}</p>);
    }
    grid.push(<Loading key="loading" style={{gridColumnEnd: `${s1 + 2}`, gridRowEnd: `${s2+ 2}`}} id="matrix-loading"/>);
  }

  if (isComputing) {
    return (
      <div className="output-matrix">
        <section className="matrix" style={{ gridTemplateColumns: `repeat(${s1+1}, 40px)`, gridTemplateRows: `repeat(${s2+1}, 30px)`}}>
          {grid}
        </section>
      </div>
    )
  }
  return (
    <div className="output-matrix">
      <section className="matrix" style={{ gridTemplateColumns: `repeat(${s1+1}, 40px)`, gridTemplateRows: `repeat(${s2+1}, 30px)`}}>
        {grid}
      </section>
    </div>
  )
}
function convertToFloatMatrix(matrix) {
  const simMatrix = [];
  const n = matrix.length;
  for (let i=0; i<n; i++) {
    const newRow = [];
    for (let j=0; j<n; j++) {
      if (i+j === 0) {
        newRow.push(-999999999);
      }
      else {
        newRow.push(matrix[i][j]);
      }
    }
    simMatrix.push(newRow);
  }

  // const simMatrix = [];
  // matrix.forEach((row) => {
  //   const newRow = [];
  //   row.forEach((col) => {
  //     newRow.push(Number.parseFloat(col));
  //   });
  //   simMatrix.push(newRow);
  // });
  return simMatrix;
}

function initalizeDecoder() {
  const map = {
    '-': 0,
    'A': 1,
    'T': 2,
    'C': 3.,
    'G': 4,
  };
  return map;
}
export default function Alignment() {
  const [string1, setString1] = useState(DEFAULT_STRING_1); 
  const [string2, setString2] = useState(DEFAULT_STRING_2);
  const [matrix, setMatrix] = useState(initalizeSimilarityMatrix());
  const [inputParameters, setInputParameters] = useState({
    similarityMatrix: convertToFloatMatrix(matrix),
    inputString1: ` ${DEFAULT_STRING_1}`,
    inputString2: ` ${DEFAULT_STRING_2}`,
  });
  const [decoder, ] = useState(initalizeDecoder());
  const { similarityMatrix, inputString1, inputString2 } = inputParameters;

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

  function generateOutput() {
    const n = matrix.length;
    const simMatrix = convertToFloatMatrix(matrix);
    setInputParameters({
      similarityMatrix: simMatrix,
      inputString1: ` ${string1}`,
      inputString2: ` ${string2}`,
    });
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
          <h2>Parameters</h2>
          <ValidSymbols symbols={VALID_SYMBOLS} />
          <InputBox value={string1} setValue={setString1} errormsg={isString1Valid}>
            <h3>First string:</h3>
          </InputBox>
          <InputBox value={string2} setValue={setString2} errormsg={isString2Valid}>
            <h3>Second string:</h3>
          </InputBox>
          <Matrix matrix={matrix} isValid={isValidMatrix} handleChange={handleMatrixChange}/>

          <section>
            <Button disabled={!shouldEnableButton} onClick={generateOutput} color="primary" variant="contained">Compute Alignment</Button>
          </section>
        </div>
        <div className="output">
          <h2>Output</h2>
          <OutputMatrix decoder={decoder} similarityMatrix={similarityMatrix} string1={inputString1} string2={inputString2} />
        </div>
      </div>
    </div>
  )
}