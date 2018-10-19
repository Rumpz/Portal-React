import React from 'react';
import {Input} from '../../../../components/old/Inputs/Inputs';
import SelectMulti from 'react-select';
// import 'react-select/dist/react-select.css';

let InputInputs = ({inputs, action, getAsyncOptions}) => {
  inputs = Object.keys(inputs).map(e => inputs[e]);
  if (!inputs.length) return null;
  let inputsReady = inputs.map((e, idx) => {
    return e.isOpen
      ? (
        <li key={idx}>
          <SomeInput data={e} action={action} getAsyncOptions={getAsyncOptions} />
        </li>)
      : null;
  });
  return (
    <ul className='flex-list'>
      {inputsReady}
    </ul>
  );
};

export default InputInputs;

let SomeInput = ({data, action, getAsyncOptions}) => {
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
          onChange={action.bind(null, data)}
          value={data.value}
          options={data.options}
          multi
        />
      </div>);
  }
};
