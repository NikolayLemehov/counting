import React from 'react';
import classes from "./Output.module.css";

const Output = ({usd}) => {
  return (
      <div className={classes.wrapper}>
        <div className={classes.lead}>Usd</div>
        <div className={classes.data}>{usd}</div>
      </div>
  );
};

export default Output;