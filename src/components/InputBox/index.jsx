import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

import './index.scss';

export default function InputBox(props) {
  const { value, setValue, errormsg, children, styles, className } = props;
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
      <FormControl error={error} styles={styles} className={`full-width-input ${className ? className : ''}`}>
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
