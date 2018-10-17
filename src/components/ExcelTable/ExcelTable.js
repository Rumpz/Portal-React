import React from 'react';
import './css/excelTable.css';

const ExcelTable = (props) => {
  return (
    <div>
      <h4>Excel Table Viewer</h4>
      <table>
        <thead>
          <tr key={'headers'}>{props.cols.map((c, i) =>
            <th key={i}>{c.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.data.map((r, i) => <tr key={r[0] + i}>
            {props.cols.map(c => <td key={c.key + i}>{ r[c.key]}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTable;
