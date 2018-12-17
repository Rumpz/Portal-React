import React from 'react';

let SelectOutputs = ({action, toggleAll, toggleIsOn, values, outputsLabel}) => {
  let outputKeys = Object.keys(values);
  outputKeys.sort();
  let options = outputKeys.map((key, idx) => {
    return (
      <li id='outputs-list' key={idx} >
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
      <ul className='outputs-list'>
        {options}
      </ul>
      <br />
    </div>
  );
};

export default SelectOutputs;
