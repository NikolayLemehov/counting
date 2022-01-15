import React from 'react';

const OperationList = ({items}) => {
  return (
      <div>
        <ul>
          {items.map(it => (<li key={it.id}>uah - {it.uah}, course - {it.course}, usd - {it.usd}</li>))}
        </ul>
      </div>
  );
};

export default OperationList;