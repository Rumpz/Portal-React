
import React from 'react';
import TableViewer1 from './tableTemplates/tableViewer1';
import TableViewer2 from './tableTemplates/tableViewer2';

const TableViewer = ({ values }) => {
  return values.cores === 'template1'
    ? <TableViewer1 values={values} />
    : values.cores === 'template2'
      ? <TableViewer2 values={values} />
      : null;
};

/*
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
  const values = Object.values(vals);
  const body = values.map((e, index) => {
    return (
      <td key={`td-${index}`}>{e}</td>
    );
  });
  return (
    <tbody><tr>{body}</tr></tbody>
  );
};

const TableViewer1 = ({ values }) => {
  const table = values.data.map((el, index) => {
    const headersVals = Object.keys(el);
    return (
      <table key={`table-${index}`}>
        <caption style>
          <strong>{values.title}</strong>
        </caption>
        <Headers vals={headersVals} />
        <Body vals={el} />
      </table>
    );
  });
  return (
    <div className='table-div' id={values.order}>
      {table}
    </div>
  );
};

const TableViewer2 = ({ values }) => {
  const table = values.data.map((el, index) => {
    const headersVals = Object.keys(el);
    return (
      <table key={`table-${index}`}>
        <caption style>
          <strong>{values.title}</strong>
        </caption>
        <Headers vals={headersVals} />
        <Body vals={el} />
      </table>
    );
  });
  return (
    <div className='table-div' id={values.order}>
      {table}
    </div>
  );
}; */

export { TableViewer };
