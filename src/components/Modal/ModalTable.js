import React from 'react';

const ModalTable = (props) => {
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
  let row = body.values.map((value, idx) => {
    return <Row style={style} key={idx} value={value} actions={actions} />;
  });
  return (
    <tbody>{row}</tbody>
  );
};

const Row = ({value, actions, style}) => {
  let tRows = value.map((element, idx) => {
    return <Cell key={idx} value={element} />;
  });
  return (
    <tr onClick={actions ? actions.row.bind(null, value) : null}>{tRows}</tr>
  );
};

const Cell = ({value}) => {
  return <td>{value}</td>;
};

export default ModalTable;
