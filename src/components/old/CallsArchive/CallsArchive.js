import React, { Component } from 'react';
import './CallsArchive.css';
import 'react-select/dist/react-select.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/pt';
import moment from 'moment';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const columName = ['#OT', 'CS', 'Inicio de Chamada', 'Duração', 'Tipo de Fecho', 'Tipificação', 'Operador', 'Observações'];

class CallsArchive extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tableResults: false,
      excel: false
    };
    this.search = this.search.bind(this);
    this.getExcel = this.getExcel.bind(this);
  }

  getExcel (state) {
    let url = `/API/calls/find/excel/${state.selectedBeginDate}.${state.selectedEndDate}`;
    axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer'
    }).then((res) => {
      let name = `chamadas_de_${state.selectedBeginDate}_a_${state.selectedEndDate}.xlsx`;
      let blob = new Blob([res.data], {type: 'application/octet-stream'});
      let url = window.URL.createObjectURL(blob);
      var a = document.createElement('A');
      a.href = url;
      a.target = '_blank';
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }).catch((err) => {
      console.log(err);
    });
  }

  search (state) {
    let url = `/API/calls/find/${state.selectedBeginDate}.${state.selectedEndDate}`;
    axios({
      method: 'get',
      url: url,
      responseType: 'json'
    }).then((res) => {
      this.setState(() => {
        return {
          tableResults: res.data
        };
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  render () {
    return (
      <div className='container-fluid'>
        <Navbar />
        <h1>Arquivo de Chamadas</h1>
        <Options
          findExcel={this.getExcel}
          onSubmit={this.search}
        />
        <Table
          columName={columName}
          calls={this.state.tableResults}
          />
      </div>
    );
  }
}

class DatePicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openDatePicker = this.openDatePicker.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
  }

  openDatePicker () {
    this.setState(() => {
      return {
        isOpen: !this.state.isOpen
      };
    });
  }

  selectedDate (date) {
    this.openDatePicker();
    this.props.selectedDate(date);
  }

  render () {
    if (this.state.isOpen) {
      return (
        <DayPicker
          localeUtils={LocaleUtils}
          locale='pt'
          onDayClick={this.selectedDate}
        />
      );
    } else {
      return (
        <input
          className='form-control'
          name={this.props.name}
          defaultValue={this.props.value}
          onClick={this.openDatePicker}
        />
      );
    }
  }
}

class Options extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedEndDate: 0,
      selectedBeginDate: 0,
      selectedTipification: 0,
      selectedOT: 0,
      selectedNClient: 0
    };
    this.selectedBeginDate = this.selectedBeginDate.bind(this);
    this.selectedEndDate = this.selectedEndDate.bind(this);
  }

  selectedBeginDate (date) {
    let formatedDate = moment(date).format('YYYY-MM-DD');
    this.setState(() => {
      return {
        selectedBeginDate: formatedDate
      };
    });
  }

  selectedEndDate (date) {
    let formatedDate = moment(date).format('YYYY-MM-DD');
    this.setState(() => {
      return {
        selectedEndDate: formatedDate
      };
    });
  }

  render () {
    return (
      <div className='options'>
        <ul className='options-list'>
          <li>
            <label>Data de Inico</label>
            <DatePicker
              selectedDate={this.selectedBeginDate}
              value={this.state.selectedBeginDate ? this.state.selectedBeginDate : ''}
            />
          </li>
          <li>
            <label>Data de Fim</label>
            <DatePicker
              selectedDate={this.selectedEndDate}
              value={this.state.selectedEndDate ? this.state.selectedEndDate : ''}
            />
          </li>
        </ul>
        <div className='excel'>
          <a className='btn btn-submit'onClick={this.props.findExcel.bind(null, this.state)}>
            Excel
          </a>
        </div>
        <div className='submit'>
          <a className='btn btn-submit'onClick={this.props.onSubmit.bind(null, this.state)}>
            Pesquisar
          </a>
        </div>
      </div>
    );
  }
}

function Table (props) {
  if (!props.calls) return <div />;
  let opacity = false;
  return (
    <div>
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
        <tbody>
          {props.calls.map((row) => {
            opacity = !opacity;
            return (
              <Row
                key={row.CODIGO_OT}
                row={row}
                opacity={opacity}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row (props) {
  let tds = [];
  for (let i in props.row) {
    tds.push(props.row[i]);
  }
  return (
    <tr className='row' style={props.opacity ? {opacity: 0.5} : null}>
      {tds.map((td) => {
        return <td>{td}</td>;
      })}
    </tr>
  );
}

export default CallsArchive;
