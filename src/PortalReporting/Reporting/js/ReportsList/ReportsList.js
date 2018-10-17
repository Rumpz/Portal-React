import React from 'react';
import './css/reports.css';
import Checkbox from '@material-ui/core/Checkbox';

const ReportsList = (props) => {
  const filterValues = [];
  const filterButton = props.subCat
    ? <button
      id='filterButton'
      className='btn btn-warning'
      onClick={props.actions.checkSubCat.bind(null, filterValues)}>
      <i className='fa fa-search' />Pesquisar
    </button>
    : null;
  return (
    <div style={{marginTop: '10px', marginBottom: '10px'}} className='table table-hover'>
      <h4>Filtrar por subcategoria</h4>
      <ul style={{display: 'inline-flex'}}>
        {props.subCat ? props.subCat.map((el, index) => {
          return (
            <li key={el + index}>
              <label>{el}</label>
              <Checkbox
                id={el + '_'}
                value={el}
                onChange={(event, checked) => {
                  return checked
                    ? filterValues.push(event.target.value)
                    : filterValues.splice(filterValues.indexOf(el));
                }}
              />
            </li>
          );
        }) : null}
        {filterButton}
      </ul>
      <p id='filterP'><b>{props.errMsg}</b></p>
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
  let tRows = value.values.map((element, idx) => {
    return <Cell key={idx} value={element}><button className='icon-home icon-4x'>..</button></Cell>;
  });
  return (
    <tr onClick={actions ? actions.row.bind(null, value) : null}>{tRows}</tr>
  );
};

const Cell = ({value, style}) => {
  return <td style={style} >{value}</td>;
};

export default ReportsList;
