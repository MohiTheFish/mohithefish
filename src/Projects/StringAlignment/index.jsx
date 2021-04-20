import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

import Matrix from './Matrix';
import ValidSymbols from './ValidSymbols';
import InputBox from 'components/InputBox';
import OutputMatrix from './Output';
import {
  isFloat,
  initalizeSimilarityMatrix,
  VALID_SYMBOLS,
  VALID_SYMBOLS_LOOKUP,
  DEFAULT_STRING_1,
  DEFAULT_STRING_2,
  initalizeDecoder,
  convertToFloatMatrix,
} from './utils';
import './index.scss';

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
            <h3 className="hoverable">
              First string:
              <span className="tooltip">The first DNA Sequence to align.</span>
            </h3>
          </InputBox>
          <InputBox value={string2} setValue={setString2} errormsg={isString2Valid} className="padleft">
            <h3 className="hoverable">
              Second string:
              <span className="tooltip">The second DNA Sequence to align</span>
            </h3>
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