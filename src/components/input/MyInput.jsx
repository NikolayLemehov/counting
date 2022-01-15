import React from 'react';
import classes from './MyInput.module.css'

const MyInput = ({label, inputProps}) => {
  return (
      <label className={classes.myLabel}>{label}
        <input className={classes.myInput} {...inputProps} />
      </label>
  );
};

export default MyInput;