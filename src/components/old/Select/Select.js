import React from 'react';

const Select = ({options, action, style}) => {
  let opt = options.map((elements, idx) => {
    return (<option key={idx} value={elements.value}>{elements.label}</option>);
  });
  return (
    <select style={style} onChange={action}>{opt}</select>
  );
};

export default Select;
