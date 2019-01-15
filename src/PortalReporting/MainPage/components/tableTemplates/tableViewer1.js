
import React from 'react';
import '../css/table1.css';

const TableViewer1 = ({ values }) => {
  const headersVals = Object.keys(values.data[0]);
  return (
    <div className='table1-div' id={values.order}>
      <h4><strong>{values.title}</strong></h4>
      <table className='table1' >
        <Headers vals={headersVals} />
        <Body vals={values.data} />
      </table>
    </div>
  );
};

const Headers = ({ vals }) => {
  const heads = vals.map((e, index) => {
    return (
      <th key={`tRow-${index}`}>{e}</th>
    );
  });
  return (
    <thead><tr>{heads}</tr></thead>
  );
};

const Body = ({ vals }) => {
  const keys = Object.keys(vals[0]);
  const body = vals.map((e, index) => {
    const renderVals = keys.map((key) => {
      return (
        <td key={`td-${key}`}>{vals[index][key]}</td>
      );
    });
    return <tr key={`tr-${index}`}>{renderVals}</tr>;
  });
  return (
    <tbody>{body}</tbody>
  );
};

export default TableViewer1;
