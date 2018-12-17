import React from 'react';

let Outputs = ({action, toggleAll, toggleIsOn, values, outputsLabel}) => {
  let outputKeys = Object.keys(values);
  outputKeys.sort();
  let options = outputKeys.map((key, idx) => {
    return (
      <li id='outputs-list' key={`key-${idx}`} >
        <label style={{ color: values[key] ? 'steelblue' : null }}>
          <input type='checkBox' onChange={action.bind(null, key)} checked={values[key]} />
          {outputsLabel[key]}</label>
      </li>);
  });
  return (
    <div className='outputs-div'>
      <label style={{color: toggleIsOn ? 'steelblue' : null}}>
        <input style={{marginBottom: '20px', marginTop: '20px'}}type='checkBox' onChange={toggleAll} checked={toggleIsOn} />
        Todos</label>
      <ul className='outputs-list'>
        {options}
      </ul>
      <br />
    </div>
  );
};

export default Outputs;
