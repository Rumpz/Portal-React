import React from 'react';
import './Inputs.css';

const Select = ({options, label, value, action, placeholder}) => {
  if (!options) return null;
  let mappedOptions = options.map(option => {
    let {value, name} = option;
    return <option key={value + name} value={value}>{name}</option>;
  });
  let labelText = label ? (<label>label</label>) : null;
  return (
    <div>
      {labelText}
      <select
        className='form-control'
        value={value}
        onChange={action}
      >
        {mappedOptions}
      </select>
    </div>
  );
};

export default Select;
