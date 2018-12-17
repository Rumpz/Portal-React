import React from 'react';
const icon = 'fa-clock-o';
const iconSize = null;
const iconStyle = {color: 'yellow'};
let SelectInputs = ({action, values, validationMsg}) => {
  let options = values.map((e, idx) => {
    return (
      <li id='inputs-list' key={idx}>
        <label style={{textAlign: 'left', color: e.isOpen ? 'steelblue' : null}}>
          <input type='checkBox' onClick={action.bind(null, e)} checked={e.isOpen} />
          {e.label}  {e.icon ? <i className={`fa ${icon} ${iconSize}`} style={iconStyle} /> : null}
        </label>
      </li>);
  });

  return (
    <ul className='inputs-list'>
      {options}
    </ul>
  );
};

export default SelectInputs;
