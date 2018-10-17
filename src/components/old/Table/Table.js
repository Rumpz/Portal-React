import React from 'react';
import './table.css';

const Table = (props) => {
  return (
    <div className='table table-hover'>
      <table>
        <Header arrValues={props.header} />
        <Body body={props.values} actions={props.actions} style={props.style} />
      </table>
    </div>
  );
};

const Header = ({arrValues}) => {
  let thVals = arrValues.map((value, idx) => {
    return <th key={idx}>{value}</th>;
  });
  return (
    <thead>
      <tr>{thVals}</tr>
    </thead>
  );
};

const Body = ({body, actions, style}) => {
  let row = body.map((value, idx) => {
    return <Row style={style} key={idx} value={value} actions={actions} />;
  });
  return (
    <tbody>
      {row}
    </tbody>
  );
};

const Row = ({value, actions, style}) => {
  let tRows = value.data.map((element, idx) => {
    return <Cell key={idx} value={element} />;
  });
  return (
    <tr onClick={actions ? actions.row.bind(null, value) : null}>{tRows}<ModalButton onClick={actions ? actions.row.bind(null, value) : null} /></tr>
  );
};

const Cell = ({value, style}) => {
  return <td style={style} >{value}</td>;
};

const ModalButton = ({actions, style}) => {
  return <button style={style} onClick={actions} className='btn btn-primary' data-toggle='modal' data-target='#myModal' >..</button>;
};

export default Table;
