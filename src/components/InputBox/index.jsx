import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import './index.scss';

export function isInteger(arg) {
  return /^(\+|-)?\d+$/.test(arg);
}

export function isFloat(arg) {
  return /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(arg);
}

export default function InputBox(props) {
  const { value, setValue, errormsg, children, styles, className, variant } = props;
  // const question = children[0];
  let error = Boolean(errormsg);

  let inputProps = {
    className: "time-input",
    label: "Time",
    value: value,
    onChange: handleChange, 
  }
  const InputType = variant === 'outlined' ? OutlinedInput : Input;

  function handleChange(e) {
    setValue(e.target.value.toUpperCase());
  }
  return (
    <section className="setting">
      {children}
      <FormControl error={error} styles={styles} className={`full-width-input ${className ? className : ''}`}>
        <InputType
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
