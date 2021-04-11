import React, {useState, useEffect} from 'react';
import Loading from 'components/Loading/loading';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import Matrix from './Matrix';
import ValidSymbols from './ValidSymbols';
import InputBox from 'components/InputBox';
import {
  isFloat,
  initalizeSimilarityMatrix,
  VALID_SYMBOLS,
  VALID_SYMBOLS_LOOKUP,
} from './utils';

import redArrow from 'assets/red_arrow.svg';
import blueArrow from 'assets/blue_arrow.svg';
import greenArrow from 'assets/green_arrow.svg';

import './index.scss';

function RedArrowImage() {
  return <img src={redArrow} alt="Red arrow" className="arrow red-arrow"/>
}
function BlueArrowImage({ up }) {
  return <img src={blueArrow} alt="Blue arrow" className={`arrow blue-arrow-${up ? 'up' : 'left'}`}/>
}
function GreenArrowImage() {
  return <img src={greenArrow} alt="Green arrow" className="arrow green-arrow"/>
}

const DEFAULT_STRING_1 = 'GGTAG';
const DEFAULT_STRING_2 = 'GGCAGT';

function checkIsValidMatrix(matrix) {
  const n = matrix.length;
  for (let i=0; i<n; i++) {
    for (let j=0; j<=i; j++) {
      if (i+j === 0) // we should ignore this entry
        continue;
      if (!isFloat(matrix[i][j])){
        return false;
      }
    }
  }
  return true;
}

const BACKPOINTER_UP = 0;
const BACKPOINTER_DIAG = 1;
const BACKPOINTER_LEFT = 2;

function getArrow(bpEntry) {
  if (bpEntry === BACKPOINTER_DIAG) {
    return <GreenArrowImage />;
  }
  if (bpEntry === -BACKPOINTER_DIAG) {
    return <RedArrowImage />;
  }
  if (bpEntry === BACKPOINTER_UP) {
    return <BlueArrowImage up />
  }
  return <BlueArrowImage />;
}

function OutputMatrix({decoder, similarityMatrix, string1, string2, isComputing, setIsComputing}) {
  const [dpTable, setdpTable] = useState({
    score: [],
    bp: [],
    solution: [],
  });
  const [showOnlySolutionArrows, setShowOnlySolutionArrows] = useState(true);

  useEffect(() => {
    console.log('start computing');
    setIsComputing(true);

    async function computeDPTable() {
      function decode(symbol1, symbol2) {
        return similarityMatrix[decoder[symbol1]][decoder[symbol2]];
      }
    
      //compute here
      
      const s1 = string1.length;
      const s2 = string2.length;
      const table = [[]];
      const bpointer = [];
      const solution = [];
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
        bpointer.push([]);
        for (let j=1; j<s1; j++) {
          const downDir = table[i-1][j] + decode('-', string2[i]);
          const rightDir = table[i][j-1] + decode('-', string1[j]);
          const diagonal = table[i-1][j-1] + decode(string1[j], string2[i]);
          let choice = diagonal;
          let backpointer = string1[j] === string2[i] ? BACKPOINTER_DIAG : -BACKPOINTER_DIAG;
          
          if (downDir > rightDir && downDir > diagonal) {
            choice = downDir;
            backpointer = BACKPOINTER_UP;
          }
          else if (rightDir > downDir && rightDir > diagonal) {
            choice = rightDir;
            backpointer = BACKPOINTER_LEFT;
          }
  
          table[i][j] = choice;
          bpointer[i-1].push(backpointer);
        }
      }
      let curr_row = s2 - 1;
      let curr_col = s1 - 1;
      while(curr_row !== 0 && curr_col !== 0) {
        solution.push([curr_row, curr_col]);
        const dir = bpointer[curr_row-1][curr_col-1];
        switch(dir) {
          case BACKPOINTER_UP: {
            curr_row--;
            break;
          }
          case BACKPOINTER_LEFT: {
            curr_col--;
            break;
          }
          case BACKPOINTER_DIAG:
          case -BACKPOINTER_DIAG: {
            curr_row--;
            curr_col--;
            break;
          }
          default: 
        }
      }
      solution.push([0,0]);
      solution.reverse();
      setdpTable({
        score: table,
        bp: bpointer,
        solution,
      });
      setIsComputing(false);
    }
    computeDPTable();
  }, [similarityMatrix, setIsComputing, string1, string2, decoder]);

  
  const s1 = string1.length;
  const s2 = string2.length;
  const grid = [<p key="empty" className="empty" />,];
  for (let i=0; i<s1; i++) {
    const symbol = string1[i];
    grid.push(<p key={`${symbol}${i}-top`} className="category output output-top">{symbol}</p>);
  }

  if (!isComputing) {
    const {score, bp, solution} = dpTable;
    let solutionIndex = 0;
    for (let i=0; i<s2; i++) {
      grid.push(<p key={`${string2[i]}${i}-side`} className="category output output-side">{string2[i]}</p>);
  
      for (let j=0; j<s1; j++) {
        const [solrow, solcol] = solution[solutionIndex];
        const isSol = (i===solrow) && (j===solcol)
        if (isSol) {
          solutionIndex++;
        }
        
        const entryClass = `output${isSol ? ' answer' : ''}`;
        if (i > 0 && j > 0){
          grid.push(
            <p key={`${i}${j}`} className={entryClass}>
              {score[i][j]}
              {(showOnlySolutionArrows && isSol) || (!showOnlySolutionArrows) ? getArrow(bp[i-1][j-1]) : null}
            </p>
          );
        }
        else {
          grid.push(
            <p key={`${i}${j}`} className={entryClass}>{score[i][j]}</p>
          );
        }
      }
    }
  }
  else {
    for (let i=0; i<s2; i++) {
      grid.push(<p key={`${string2[i]}${i}-side`} className="category output output-side">{string2[i]}</p>);
    }
    grid.push(<Loading key="loading" style={{gridColumnEnd: `${s1 + 2}`, gridRowEnd: `${s2+ 2}`}} id="matrix-loading"/>);
  }

  return (
    <div className="output-matrix">
      <section className="matrix" style={{ gridTemplateColumns: `repeat(${s1+1}, 60px)`, gridTemplateRows: `repeat(${s2+1}, 45px)`}}>
        {grid}
      </section>
      <div className="switch-wrapper">
        <Switch
          onChange={() => setShowOnlySolutionArrows(!showOnlySolutionArrows)}
          checked={showOnlySolutionArrows}
          color="primary"
        />
        <p>Only show solution arrows?</p>
      </div>
      <section>
        <h2>Answer:</h2>
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
        newRow.push(Number.parseFloat(matrix[i][j]));
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


export default function Alignment() {
  const [string1, setString1] = useState(DEFAULT_STRING_1); 
  const [string2, setString2] = useState(DEFAULT_STRING_2);
  const [matrix, setMatrix] = useState(initalizeSimilarityMatrix());
  const [inputParameters, setInputParameters] = useState({
    similarityMatrix: convertToFloatMatrix(matrix),
    inputString1: ` ${DEFAULT_STRING_1}`,
    inputString2: ` ${DEFAULT_STRING_2}`,
  });
  const [isComputing, setIsComputing] = useState(true);
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
    const simMatrix = convertToFloatMatrix(matrix);
    setInputParameters({
      similarityMatrix: simMatrix,
      inputString1: ` ${string1}`,
      inputString2: ` ${string2}`,
    });
    setIsComputing(true);
  }


  const isString1Valid = checkIsValidString(string1);
  const isString2Valid = checkIsValidString(string2);
  const isValidMatrix = checkIsValidMatrix(matrix);
  const shouldEnableButton = (!isString1Valid && !isString2Valid && isValidMatrix);

  return (
    <div className="alignment-wrapper">
      <h1> String (Sequence) Alignment </h1>
      <div className="algorithm">
        <div className="parameters">
          <h2>Parameters</h2>
          <ValidSymbols symbols={VALID_SYMBOLS} />
          <InputBox value={string1} setValue={setString1} errormsg={isString1Valid} className="padleft">
            <h3>First string:</h3>
          </InputBox>
          <InputBox value={string2} setValue={setString2} errormsg={isString2Valid} className="padleft">
            <h3>Second string:</h3>
          </InputBox>
          <Matrix matrix={matrix} isValid={isValidMatrix} handleChange={handleMatrixChange}/>

          <section>
            <Button disabled={!shouldEnableButton} onClick={generateOutput} color="primary" variant="contained">Compute Alignment</Button>
          </section>
        </div>
        <div className="output">
          <h2>Output</h2>
          <OutputMatrix
            isComputing={isComputing} setIsComputing={setIsComputing}
            decoder={decoder}
            similarityMatrix={similarityMatrix}
            string1={inputString1} string2={inputString2}
          />
        </div>
      </div>
    </div>
  )
}