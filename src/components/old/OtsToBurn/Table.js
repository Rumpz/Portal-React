import React from 'react';
import './App.css';
import Extra from './Extra.js';
function Table (props) {
  if (!props.table) return <div className='spinner' />;
  let opacity = false;
  return (
    <table className='table'>
      <thead>
        <tr className='thread'>
          {props.columName.map((name) => {
            return (
              <th key={name}>{name}</th>
            );
          })}
        </tr>
      </thead>
      {props.table.map((row) => {
        opacity = !opacity;
        return (
          <tbody key={props.trId(row)}>
            <tr style={props.style(row, opacity)}>
              {props.tds.map((td, i) => {
                return <td key={props.trId(row) + i} >{td(row, props.links)}</td>;
              })}
            </tr>
            {props.selected.ot === props.trId(row) ? <Extra row={row} selected={props.selected} action={props.action} /> : null}
          </tbody>
        );
      })}
    </table>
  );
}

export default Table;
