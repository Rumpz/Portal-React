import React from 'react';
import './Inputs.css';

const Select = ({options, label, value, action, placeholder, style, className, active, disabled}) => {
  if (!options) return null;
  let mappedOptions = options.map(option => {
    let {value, name, active} = option;
    return <option key={value + name} value={value} selected={active} >{name || value}</option>;
  });
  return (
    <div className={className} style={style}>
      {label ? <label>{label}</label> : null}
      <select
        className={'form-control'}
        value={value}
        onChange={action}
        disabled={disabled}
      >
        {active ? null : <option value={-1}>{placeholder}</option>}
        {mappedOptions}
      </select>
    </div>
  );
};

const CheckBox = ({label, action, value, checked}) => {
  return <label>{label} <input type='checkbox' checked={value || checked} onClick={action} className='form-control' /></label>;
};

const Input = ({label, action, type, value, placeholder, disabled}) => {
  return (
    <div>
      {label ? <label>{label}</label> : null}
      <input
        className={'form-control'}
        value={value}
        type={type || 'text'}
        onChange={action}
        onFocus={action}
        placeholder={placeholder}
        disabled={disabled}
        />
    </div>
  );
};

const TextBox = ({label, rows, value, action, placeholder}) => {
  return (
    <div>
      <label>{label}</label>
      <textarea
        rows={rows || 3}
        className='form-control'
        value={value}
        onChange={action}
        placeholder={placeholder}
      />
    </div>
  );
};
export {
  CheckBox,
  Select,
  Input,
  TextBox
};
