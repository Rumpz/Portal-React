import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DatePicker from './DatePicker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/pt';
import Table from './Table';
import moment from 'moment';
import Modal from 'react-modal';

const columName = ['#OT', 'CS', 'Tipo OT', 'Tecnologia', 'Parceiro', 'Hora Inicio', 'Situação', 'Motivo', 'Last Change', 'Duração', 'Observações', 'Utilizador'];

const tds = [
  (row) => {
    return row.CODIGO_OT;
  },
  (row) => {
    return row.CONTA_SERVICO;
  },
  (row) => {
    const tipoOT = {
      'OT Instalação': 'I+R',
      'OT Alteração de Serviço': 'AS',
      'OT Restabelecimento': 'I+R',
      'OT Orçamentação': 'ORC'
    };
    return tipoOT[row.TIPO_OT];
  },
  (row) => {
    return row.Tecnologia;
  },
  (row) => {
    return row.DELEGACAO;
  },
  (row) => {
    return row.DATA_INICIO_OT;
  },
  (row) => {
    return row.estado;
  },
  (row) => {
    return row.DESCRICAO;
  },
  (row) => {
    return row.ULTIMA_ALTERACAO;
  },
  (row) => {
    return row.duration;
  },
  (row, links) => {
    return (
      <a
        onClick={links.bind(null, row.CODIGO_OT)}
        className='clean'>
        X
      </a>
    );
  },
  (row) => {
    return row.user;
  }
];

const style = (row, opacity) => {
  let style;
  if (moment(row.DATA_CRIACAO_OT).isAfter(moment(row.DATA_INICIO_OT))) {
    style = {
      opacity: opacity ? 0.7 : 1,
      color: 'lightblue'
    };
  } else if (row.estado === 'cancelada') {
    style = {
      opacity: opacity ? 0.7 : 1,
      color: 'red'
    };
  } else {
    style = {
      opacity: opacity ? 0.7 : 1
    };
  }
  return style;
};

const trId = (row) => {
  return row.CODIGO_OT;
};

class History extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedBeginDate: 0,
      selectedEndDate: 0,
      table: null,
      start: false,
      modalDisplay: false,
      modalBody: false
    };

    this.options = this.options.bind(this);
    this.getTable = this.getTable.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.displayObs = this.displayObs.bind(this);
  }

  componentDidMount () {
    this.refresh = setInterval(
      () => this.getTable(),
      10000
    );
  }

  componentWillUnmount () {
    clearInterval(this.refresh);
  }

  options (data) {
    this.setState({
      selectedBeginDate: data.selectedBeginDate,
      selectedEndDate: data.selectedEndDate,
      start: true
    });
    return data.submit ? this.getTable() : null;
  }

  getTable () {
    if (this.state.start) {
      let begin = this.state.selectedBeginDate;
      let end = this.state.selectedEndDate;
      let url = `/otsToBurn/find/history/${begin}.${end}`;
      axios.get(url).then((res) => {
        this.setState({table: res.data});
      }).catch((err) => {
        this.setState({table: false});
        console.log(err);
      });
    }
  }

  handleOpenModal (ot) {
    let url = `/otsToBurn/find/obs/${ot}`;
    axios.get(url).then((res) => {
      console.log(res.data)
      this.displayObs(res.data.obs);
    }).catch((err) => {
      console.log(err);
    });
  }

  handleCloseModal () {
    this.setState({modalDisplay: false});
  }

  displayObs (obsArray) {
    let body =
      <div>
        {obsArray.map((obs) => {
          return (
            <div className='obsModal'>
              <p className='obsModal-header'>{`Utilizador : ${obs.name} Data : ${moment(obs.date).format('YYYY-MM-DD HH:mm')}`}</p>
              <p className='obsModal-body'>{obs.obs}</p>
            </div>
          );
        })}
      </div>;
    this.setState({modalBody: body, modalDisplay: true});
  }

  render () {
    if (this.state.start) {
      return (
        <div>
          <Options
            onSubmit={this.options}
            table={this.state.table}
          />
          <Modal
            isOpen={this.state.modalDisplay}
            contentLabel='modal'
            className={{
              base: 'modalbg',
              afterOpen: 'modalbg_after-open'
            }}
            overlayClassName={{
              base: 'Overlay',
              afterOpen: 'Overlay_after-open'
            }}>
            <div className='dialog'>
              {this.state.modalBody}
              <a className='btn btn-close' onClick={this.handleCloseModal}>X</a>
            </div>
          </Modal>
          <Table
            columName={columName}
            table={this.state.table}
            tds={tds}
            style={style}
            trId={trId}
            selected={{ot: null}}
            links={this.handleOpenModal}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Options
            onSubmit={this.options}
            table={this.state.table}
          />
        </div>
      );
    }
  }
}

class Options extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedBeginDate: 0,
      selectedEndDate: 0,
      submit: false
    };
    this.selectedBeginDate = this.selectedBeginDate.bind(this);
    this.selectedEndDate = this.selectedEndDate.bind(this);
  }

  selectedBeginDate (date) {
    let formatedDate = moment(date).format('YYYY-MM-DD');
    this.setState({selectedBeginDate: formatedDate, submit: true});
  }

  selectedEndDate (date) {
    let formatedDate = moment(date).format('YYYY-MM-DD');
    this.setState({selectedEndDate: formatedDate, submit: true});
  }

  render () {
    return (
      <div className='options'>
        <ul className='options-list'>
          <li>
            <label>Data de Inicio</label>
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
        <div className='submit'>
          <a className='btn btn-submit'onClick={this.props.onSubmit.bind(null, this.state)}>
            Pesquisar
          </a>
        </div>
      </div>
    );
  }
}

export default History;
