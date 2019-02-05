
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

export { TableViewer };
