import React from 'react';
import { Input } from '../../../components/old/Inputs/Inputs.js';
import SelectMulti from 'react-select';
import '../css/puts.css';
// import 'react-select/dist/react-select.css';

let InputInputs = ({inputs, action, getAsyncOptions}) => {
  /* inputs = Object.keys(inputs).map(e => inputs[e]); */

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
          options={data.combinations}
          value={data.value}
          multi
        />
      </div>);
  }
};

let SelectInputs = ({action, values}) => {
  let options = values.map((e, idx) => {
    return (
      <li key={idx} style={{paddingRight: '20px'}}>
        <label style={{textAlign: 'left', color: e.isOpen ? 'steelblue' : null}}>
          <input type='checkBox' onClick={action.bind(null, e)} checked={e.isOpen} />
          {e.label}
        </label>
      </li>);
  });

  return (
    <div style={{padding: '10px 0'}}>
      <ul className='flex-list' style={{flexDirection: 'column', justifyContent: 'space-evenly', height: '125px'}}>
        {options}
      </ul>
    </div>
  );
};

let SelectOutputs = ({action, toggleAll, toggleIsOn, values}) => {
  let options = values.map((val, idx) => {
    return (
      <li key={idx} style={{paddingLeft: '20px'}}>
        <label style={{ textAlign: 'left', color: 'steelblue' }}>
          <input type='checkBox' onClick={action.bind(null, val)} />
          {val}
        </label>
      </li>);
  });

  return (
    <div>
      <ul className='flex-list' style={{flexDirection: 'column', justifyContent: 'space-evenly', height: '350px'}}>
        {options}
      </ul>
      <br />
    </div>
  );
};

export {
  SelectInputs,
  SelectOutputs,
  InputInputs
};
