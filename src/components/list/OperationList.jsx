import React from 'react';
import MyButton from "../button/MyButton";
import {formatDate} from "../../utils";
import classes from "./OperationList.module.css";

const OperationList = ({items, onClickRemoveBtn}) => {
  return (
      <div>
        <div>Balance USD: {items.reduce((acc, it) => {
          acc += it.usd;
          return acc;
        }, 0).toFixed(2)}</div>
        <table>
          <thead>
          <tr>
            <th className={classes.cell}>grn</th>
            <th className={classes.cell}>course</th>
            <th className={classes.cell}>usd</th>
            <th className={classes.cell}>date</th>
            <th className={classes.cell}>remove btn</th>
          </tr>
          </thead>
          <tbody>
          {items.map(it => (
              <tr key={it.id}>
                <td className={classes.cell}>{it.uah}</td>
                <td className={classes.cell}>{it.course}</td>
                <td className={classes.cell}>{it.usd.toFixed(2)}</td>
                <td className={classes.cell}>{formatDate(it.date)}</td>
                <td className={classes.cell}>
                  <MyButton
                      onClick={() => onClickRemoveBtn(it.id)}
                  >x</MyButton>
                </td>
              </tr>
          )).reverse()}
          </tbody>
        </table>
      </div>
  );
};

export default OperationList;