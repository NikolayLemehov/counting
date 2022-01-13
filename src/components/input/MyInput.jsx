import React from 'react';
import classes from './MyInput.module.css'

const MyInput = (props) => {
  return (
      <label className={classes.myLabel}>{props.label.text}
        <input className={classes.myInput} {...props} />
      </label>
  );
};

export default MyInput;