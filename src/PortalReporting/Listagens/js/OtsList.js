import React from 'react';
import '../css/otsList.css';

const style = {
  list: {
    listStyle: 'none',
    width: '100px',
    margin: '0 auto',
    backgroundColor: 'burlywood',
    borderStyle: 'solid',
    borderColor: 'cornsilk'
  }
};

const OtsList = (props) => {
  const list = props.data.map((e, index) => {
    return (
      <li style={style.list} key={`item${index}`}>
        {e}
      </li>
    );
  });
  return (
    <ul className='items' >
      {list}
    </ul>
  );
};

export default OtsList;
