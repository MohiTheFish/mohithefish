import React, {useState} from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

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

const DEFAULT_STRING_1 = 'GGTAGP';
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
export default function Alignment() {

  const [string1, setString1] = useState(DEFAULT_STRING_1); 
  const [string2, setString2] = useState(DEFAULT_STRING_2);

  function checkIsValidString(str) {
    for(let i=0; i<str.length; i++) {
      if (!VALID_SYMBOLS_LOOKUP.has(str[i]))
        return 'String must only consist of valid symbols A, T, C, G';
    }
    return '';
  }

  const isString1Valid = checkIsValidString(string1);
  const isString2Valid = checkIsValidString(string2);


  return (
    <div className="alignment-wrapper">
      <h1> String Alignment </h1>
      <div className="functionality">
        <ValidSymbols symbols={VALID_SYMBOLS} />
        <InputBox value={string1} setValue={setString1} errormsg={isString1Valid}>
          <h3>First string:</h3>
        </InputBox>
        <InputBox value={string2} setValue={setString2} errormsg={isString2Valid}>
          <h3>Second string:</h3>
        </InputBox>
      </div>
    </div>
  )
}