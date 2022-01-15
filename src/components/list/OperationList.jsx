import React from 'react';
import MyButton from "../button/MyButton";

const OperationList = ({items, onClickRemoveBtn}) => {
  return (
      <div>
        <table>
          <thead>
          <tr>
            <th>grn</th>
            <th>course</th>
            <th>usd</th>
            <th>remove btn</th>
          </tr>
          </thead>
          <tbody>
          {items.map(it => (
              <tr key={it.id}>
                <td>{it.uah}</td>
                <td>{it.course}</td>
                <td>{it.usd}</td>
                <td>
                  <MyButton
                      onClick={() => onClickRemoveBtn(it.id)}
                  >x</MyButton>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default OperationList;