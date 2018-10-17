import React from 'react';
import {Input} from '../../../components/old/Inputs/Inputs.js';
import SelectMulti from 'react-select';
import '../css/reactSelect.css';

let ReactSelect = ({inputs, action, isOpen}) => {
  if (!inputs) return null;
  inputs = Object.keys(inputs).map(e => inputs[e]);
  let inputsReady = inputs.map((e, idx) => {
    return isOpen
      ? (
        <li key={idx}>
          <SomeInput data={e} action={action.bind(null, e)} />
        </li>)
      : null;
  });
  return (
    <ul className='flex-list'>
      {inputsReady}
    </ul>
  );
};

export default ReactSelect;

let SomeInput = ({data, action, getAsyncOptions}) => {
  if (!data) return null;
  if (data.type === 'text') {
    return (
      <Input
        label={data.label}
        action={action.bind(null, data)}
        value={data.value}
      />
    );
  } else if (data.type === 'select') {
    return (
      <div style={{width: '250px'}}>
        <label>{data.label}</label>
        <SelectMulti
          onChange={action}
          value={data.value}
          options={data.combinations}
          multi
        />
      </div>);
  }
};
