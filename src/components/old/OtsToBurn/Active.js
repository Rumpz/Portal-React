import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';
import Table from './Table';
import moment from 'moment';
import { refresh } from './API.js';

const columName = [
  '#OT',
  'CS',
  'Tipo OT',
  'Tecnologia',
  'Parceiro',
  'Hora Inicio',
  'Situação',
  'Motivo',
  'Last Change',
  'Duração',
  'Nivel',
  '...'
];
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
      'OT Orçamentação': 'ORC',
      'OT Manutenção': 'M'
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
    let duration;
    let formatDate = (begin, end) => {
      return moment('2000-01-01 00:00:00').add(moment.duration(moment(begin).diff(moment(end)))).format('HH:mm:ss');
    };
    if (row.estado === 'realizada') {
      duration = formatDate(row.DATA_FECHO_OT, row.DATA_ABERTURA_OT);
    } else if (row.estado === 'emitida') {
      duration = Math.round(minutes(row.DATA_INICIO_OT, moment()));
    } else if (row.DATA_ABERTURA_OT) {
      duration = formatDate(moment(), row.DATA_ABERTURA_OT);
    } else if (row.SITUACAO === 'Pré-Recolhida') {
      duration = formatDate(moment(), row.DATA_FECHO_OT);
    } else if (row.ERRO_CANCELAMENTO) {
      duration = -1;
    } else {
      duration = 0;
    }
    row.duration = duration;
    return duration;
  },
  (row) => {
    return row.NIVEL_SERVICO ? row.NIVEL_SERVICO : '';
  },
  (row, links) => {
    let values = {
      ot: row.CODIGO_OT,
      duration: row.duration,
      date: row.DATA_INICIO_OT,
      obsCtl: row.OBS_CTL
    };

    return (
      <a
        onClick={links.bind(null, values)}
        className='clean'>
        <i className='fa fa-cog' />
      </a>
    );
  }
];

function minutes (startDate, endDate) {
  var _startDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
  var _endDate = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
  var duration = moment.duration(_endDate.diff(_startDate));
  var days = duration.asMinutes();
  return days;
}

const style = (row, opacity) => {
  let style;
  if (moment(row.DATA_CRIACAO_OT).isAfter(moment(row.DATA_INICIO_OT))) {
    style = {
      opacity: opacity ? 0.7 : 1,
      color: 'lightblue'
    };
  } else if (row.estado === 'emitida' && row.duration > 30) {
    style = {
      opacity: opacity ? 0.7 : 1,
      color: 'green'
    };
  } else if (row.estado === 'cancelada') {
    style = {
      opacity: opacity ? 0.7 : 1,
      color: 'orange'
    };
  } else if (row.ERRO_CANCELAMENTO) {
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

class Active extends Component {
  constructor (props) {
    super(props);

    this.state = {
      table: null,
      showModal: false,
      cleanValues: false,
      action: false,
      modalDisplay: false,
      modalBody: {
        tipoAssunto: '',
        subAssunto: '',
        obs: '',
        dateOpen: '',
        state: ''
      }
    };

    this.clean = this.clean.bind(this);
    /* this.getTable = this.getTable.bind(this); *S/
    this.handleOpenExtra = this.handleOpenExtra.bind(this);
    this.handleCloseExtra = this.handleCloseExtra.bind(this);
    this.displayCalls = this.displayCalls.bind(this);
    this.displayInc = this.displayInc.bind(this);
    this.displayObs = this.displayObs.bind(this);
    this.updateObs = this.updateObs.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    refresh((err, data) => {
      console.log(data);
      if (err) return console.log(err);
      this.updateTable(data);
    });
  }

  componentDidMount () {
    this.setState({
      action: {
        close: this.handleCloseExtra,
        displayInc: this.displayInc,
        displayCalls: this.displayCalls,
        displayObs: this.displayObs,
        updateObs: this.updateObs,
        clean: this.clean
      }
    });

/*     this.getTable();
    this.refresh = setInterval(
      () => this.getTable(),
      1000 * 60 * 1.5
    ); */
  }

  componentWillUnmount () {
    clearInterval(this.refresh);
  }

  displayCalls (values) {
    let body =
      <div>
        {values.map((each, i) => {
          return (
            <div className='callHistory' key={'call' + i}>
              <div className='callHistory-header'>
                <p>{each.callStart}</p>
                <p>{'Utilizador : ' + each.operador + ' | Tipo de fecho : ' + each.closeType + ' | Tipo de chamada : ' + each.tipification }</p>
              </div>
              <div className='callHistory-body'>
                <p>{each.obs}</p>
              </div>
            </div>
          );
        })}
      </div>;
    this.setState({modalBody: body, modalDisplay: true});
  }

  displayObs (values) {
    let body =
      <div>
        {values.map((obs) => {
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

  displayInc (inc) {
    let body =
      <ul className='IncModal'>
        <li>
          <p className='IncModal-header'>Tipo de Assunto</p>
          <p className='IncModal-body'>{inc.tipoAssunto}</p>
        </li>
        <li>
          <p className='IncModal-header'>Sub Assunto</p>
          <p className='IncModal-body'>{inc.subAssunto}</p>
        </li>
        <li>
          <p className='IncModal-header'>Observações</p>
          <p className='IncModal-body'>{inc.obs}</p>
        </li>
        <li>
          <p className='IncModal-header'>Data de Abertura</p>
          <p className='IncModal-body'>{inc.dateOpen}</p>
        </li>
        <li>
          <p className='IncModal-header'>Data de Fecho</p>
          <p className='IncModal-body'>{inc.dateClose}</p>
        </li>
        <li>
          <p className='IncModal-header'>Estado</p>
          <p className='IncModal-body'>{inc.state}</p>
        </li>
      </ul>;

    this.setState({modalBody: body, modalDisplay: true});
  }

  updateObs (obs) {
    let url = `/otsToBurn/obs/`;
    let data = {
      ot: this.state.cleanValues.ot,
      obs: obs};
    axios.post(url, data).then((res) => {
      this.handleOpenExtra(this.state.cleanValues);
    }).catch((err) => {
      console.log(err);
    });
  }

  handleOpenExtra (values) {
    let url = `/otsToBurn/find/extra/${values.ot}`;
    axios.get(url).then((res) => {
      values.inc = res.data.incs;
      values.calls = res.data.callHistory;
      values.obs = res.data.obs;
      values.sum = res.data.sum;
      this.setState({cleanValues: values});
    }).catch((err) => {
      console.log(err);
    });
  }

  handleCloseExtra () {
    this.setState({ cleanValues: false });
  }

  handleCloseModal () {
    this.setState({modalDisplay: false});
  }

  clean () {
    let values = this.state.cleanValues;
    let url = `/otsToBurn/clean`;
    axios.post(url, values).then((res) => {
      this.handleCloseExtra();
    }).catch((err) => {
      this.setState({table: null});
      console.log(err);
    });
  }
 /*  getTable () {
    let url = `otsToBurn/find/daily`;
    axios.get(url).then((res) => {
      this.setState({table: res.data});
      if (this.state.cleanValues) this.handleOpenExtra(this.state.cleanValues);
    }).catch((err) => {
      this.setState({table: null});
      console.log(err);
    });
  } */

  updateTable (data) {
    this.setState({table: data});
    if (this.state.cleanValues) this.handleOpenExtra(this.state.cleanValues);
  }

  render () {
    return (
      <div>
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
          }}
        >
          <div className='dialog'>
            {this.state.modalBody}
            <a className='btn btn-close' onClick={this.handleCloseModal}>X</a>
          </div>
        </Modal>
        <Table
          columName={columName}
          table={this.state.table}
          links={this.handleOpenExtra}
          tds={tds}
          style={style}
          trId={trId}
          selected={this.state.cleanValues}
          action={this.state.action}
        />
      </div>
    );
  }
}

export default Active;
