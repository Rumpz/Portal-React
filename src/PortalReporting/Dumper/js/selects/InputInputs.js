import React from 'react';
import {Input} from '../../../../components/old/Inputs/Inputs';
import Select from 'react-select';
// import CreatableSelect from 'react-select/lib/Creatable';
// import 'react-select/dist/react-select.css';

let InputInputs = ({inputs, action, validationMsg}) => {
  inputs = Object.keys(inputs).map(e => inputs[e]);
  if (!inputs.length) return null;
  let inputsReady = inputs.map((e, idx) => {
    return e.isOpen
      ? (
        <li key={idx}>
          <SomeInput data={e} action={action} validationMsg={validationMsg} />
        </li>)
      : null;
  });
  return (
    <ul className='flex-list'>
      {inputsReady}
      <p style={{color: 'red'}}>{validationMsg}</p>
    </ul>
  );
};

export default InputInputs;

let SomeInput = ({data, action, validationMsg}) => {
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
        <Select
          onChange={action.bind(this, data)}
          options={data.options}
          isMulti
        />
      </div>);
  }
};
