import React from 'react';

const DateSelector = ({options, action, style}) => {
  let opt = options.map((elements, idx) => {
    return (<option key={idx} value={elements}>{elements}</option>);
  });
  return (
    <select style={style} onChange={action}>{opt}</select>
  );
};

export default DateSelector;
