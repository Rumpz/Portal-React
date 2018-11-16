import React from 'react';
const Loading = ({className}) => {
  return (
    <div
      className={className || 'fa fa-spinner fa-spin'}
      style={{fontSize: '50px', color: 'red'}}
    />);
};
export default Loading;
