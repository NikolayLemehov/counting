import React from 'react';
import classes from "./Output.module.css";

const Output = ({usd}) => {
  return (
      <div className={classes.wrapper}>
        <div>Usd</div>
        <div>{usd}</div>
      </div>
  );
};

export default Output;