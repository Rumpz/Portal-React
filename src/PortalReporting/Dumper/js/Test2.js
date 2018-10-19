import React from 'react';
import { Input } from '../../../components/old/Inputs/Inputs.js';
import SelectMulti from 'react-select';
import '../css/puts.css';
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

let SelectInputs = ({action, values}) => {
  let options = values.map((e, idx) => {
    return (
      <li key={idx} style={{paddingRight: '20px'}}>
        <label style={{textAlign: 'left', color: 'steelblue'}}>
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

let SelectOutputs = ({action, toggleAll, toggleIsOn, values, outputsLabel}) => {
  let outputKeys = Object.keys(values);
  outputKeys.sort();
  let options = outputKeys.map((key, idx) => {
    return (
      <li key={idx} style={{paddingLeft: '20px'}}>
        <label style={{ textAlign: 'left', color: values[key] ? 'steelblue' : null }}>
          <input type='checkBox' onClick={action.bind(null, key)} checked={values[key]} />
          {outputsLabel[key]}</label>
      </li>);
  });

  return (
    <div>
      <label style={{textAlign: 'center', padding: '10px 0', color: toggleIsOn ? 'steelblue' : null}}>
        <input type='checkBox' onClick={toggleAll} checked={toggleIsOn} />
        Todos</label>
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
