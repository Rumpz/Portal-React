import React, { Component } from 'react';
import Select from 'react-select';
import moment from 'moment';

// Custom imports
import NavBar from '../../components/NavBar/NavBar';
import Outputs from './js/Outputs';
import BetweenDates from '../../components/old/Dates/BetweenDates';

import { exportXLS, uploadFile, getOptions, getAvailables } from './API';

import './css/main.css';

class PortalReporting extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showMsg: false,
      title: 'Listagens',
      buttonDisabled: true,
      campoPesquisa: '',
      data: 0,
      startDate: null,
      endDate: null,
      validationMsg: false,
      filtrosDatas: [],
      tipoDeData: '',
      options: [],
      outputs: [],
      outputslabel: {},
      maquina: [],
      imagem: [],
      tabela: [],
      available: '',
      showSearch: 1,
      uploadVisible: false,
      fieldOpt: [],
      outputToggleAll: false,
      loading: false,
      filtroDataVisible: false,
      user: ''
    };

    this.handleFonte = this.handleFonte.bind(this);
    this.handleImagem = this.handleImagem.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCampo = this.handleCampo.bind(this);
    this.showUpload = this.showUpload.bind(this);
    this.toggleAllOutputs = this.toggleAllOutputs.bind(this);
    this.selectOutput = this.selectOutput.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  // get available fontes list
  componentWillMount () {
    getAvailables().then(Response => {
      this.setState({
        options: Response.data,
        available: Response.data
      });
    }).catch(err => {
      return alert(`${err}`);
    });
  }

  // Get options by selected fonte
  handleFonte (e) {
    this.setState({
      fieldOpt: {label: '', value: ''},
      tipoDeData: {label: '', value: ''},
      startDate: null,
      endDate: null
    })
    getOptions(e.value).then(Response => {
      Response.data = Response.data[0];
      this.setState({
        maquina: Response.data.maquina,
        fieldOpt: Response.data.campoPesquisa,
        outputs: Response.data.outputs,
        outputslabel: Response.data.outputsLabel,
        imagem: Response.data.imagem,
        filtrosDatas: Response.data.filtrosDatas,
        tabela: Response.data.tabela,
        showSearch: Response.data.available
      });
    }).catch(err => {
      alert(`${err}`);
    });
  }

  handleCampo (e) {
    this.setState({ campoPesquisa: e.value });
    this.showUpload();
  }

  handleImagem (e) {
    this.setState({ tabela: e.values });
  }

  // Show upload after campo is selected
  showUpload () {
    this.setState({uploadVisible: true});
  }

  handleUpload (e) {
    let query = {
      dbConnection: this.state.maquina,
      file: e.target.files[0]
    };
    if (!e.target.files[0]) return; // if no fill exit method
    this.setState({loading: true});
    return e.target.files[0].type !== 'text/plain' // make sure its the correct extension
      ? this.setState({
        validationMsg: 'Por favor insira um ficheiro no formato .txt',
        buttonDisabled: true,
        showMsg: true,
        loading: false
      })
      : uploadFile(query.dbConnection, query.file).then(Response => { // upload the file to the server and wait response
        this.setState({ loading: false, validationMsg: false, buttonDisabled: false, user: Response.data.user, data: Response.data.info });
      }).catch(err => {
        alert(`${err}`);
      });
  }

  selectOutput (input) {
    let outputs = this.state.outputs;
    outputs[input] = !outputs[input];
    this.setState({selectedOutputs: outputs, inputOutputModified: true, showMsg: false});
  }

  toggleAllOutputs (e) {
    let value = e.target.checked;
    let { outputs } = this.state;
    for (let i in outputs) {
      outputs[i] = value;
    }
    this.setState({selectedOutputs: outputs, outputToggleAll: value, showMsg: false});
  }

  handleSubmit (e) {
    const { maquina, data, campoPesquisa, tabela, outputs, startDate, endDate, tipoDeData } = this.state;
    let selectedOutputs = Object.keys(outputs).map(key => {
      if (outputs[key]) return key;
    });
    selectedOutputs = selectedOutputs.filter(e => e);

    const dataToSend = {
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      tipoDeData: tipoDeData !== '' ? tipoDeData.value : null,
      dbConnection: maquina,
      tabela: typeof tabela === 'string' ? tabela : tabela[0],
      campoPesquisa: campoPesquisa,
      selectedOutputs: selectedOutputs,
      values: data,
      user: this.state.user
    };

    /*  if (dataToSend.dbConnection === null || dataToSend.dbConnection === 'undefined' || dataToSend.dbConnection === '') {
      this.setState({loading: false});
      return alert(`Por favor escolha qual a fonte a pesquisar`);
    }

    if (dataToSend.tabela === '' || dataToSend.tabela.length < 1) {
      return this.setState({loading: false, validationMsg: 'Por favor seleccione qual a tabela a pesquisar'});
    } */

    if (!dataToSend.selectedOutputs.filter(e => e !== false).length > 0) {
      return this.setState({loading: false, showMsg: true, validationMsg: 'Por favor seleccione pelo menos uma coluna de Output'});
    }

    this.setState({loading: true, validationMsg: ''});
    exportXLS(dataToSend).then(Response => {
      let exportName =
      `Extração_Listagem_${dataToSend.tabela}_${moment().format('YYYY-MM-DD HH:mm')}.xlsx`;
      this.downloadFile(Response.data, exportName);
      this.setState({ loading: false, validationMsg: '' });
    }).catch(err => {
      if (err.toString() === 'Error: Network Error') {
        return this.setState({
          loading: false,
          showMsg: true,
          validationMsg: 'Erro de acesso ao servidor..Por favor tente outra vez..caso persista entre em contacto com Resultados Operacionais I&M'
        });
      } else if (err.response.status === 500) {
        return this.setState({ loading: false, noSearchBtn: false, showMsg: true, validationMsg: `Erro de acesso ao servidor ----> ${err}` });
      } else if (err.response.status === 401) {
        return this.setState({ loading: false, noSearchBtn: false, showMsg: true, validationMsg: `Sem Permissões ----> ${err}` });
      } else if (err.response.status === 404) {
        return this.setState({ loading: false, noSearchBtn: false, showMsg: true, validationMsg: `Sem resultados entre os items pesquisados!!!` });
      }
    });
  }
  downloadFile (data, name) {
    let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('A');
    a.href = url;
    // a.target = '_blank';
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  handleStartDate (date) {
    this.setState({startDate: date});
  }

  handleEndDate (date) {
    this.setState({endDate: date});
  }

  handleTipoData = event => {
    this.setState({tipoDeData: event})
  }

  handleFiltroDatas = () => {
    const el = document.getElementById('data-filtro-title');
    this.state.filtroDataVisible ? el.style.color = '' : el.style.color = 'red'
    this.state.filtroDataVisible ? el.style.fontWeight = '' : el.style.fontWeight = 'bold'
    this.setState({filtroDataVisible: !this.state.filtroDataVisible})
  }
  render () {
    const campoPesquisa = this.state.fieldOpt.length > 0 && this.state.showSearch
      ? <div className='field-div'>
        <label>Pesquisa por campo</label>
        <Select
          onChange={this.handleCampo}
          options={this.state.fieldOpt}
          disabled={this.state.available}
        />
      </div>
      : null;

    const tabelas = this.state.imagem && this.state.showSearch
      ? <div className='table-div'>
        <label>Tabela a pesquisar</label>
        <Select
          style={{width: '25%'}}
          onChange={this.handleImagem}
          options={this.state.imagem}
          disabled={this.state.available}
        />
      </div>
      : null;

    const upload = this.state.uploadVisible && this.state.showSearch
      ? <div>
        <label >
        Insira a lista a pesquisar (.txt)
          <input
            className='btn btn-default btn-file'
            style={{margin: '0 auto'}}
            name='file'
            type='file'
            accept='.txt'
            onChange={this.handleUpload} />
        </label>
      </div>
      : null;

    const outputs = this.state.fieldOpt.length > 0 && this.state.showSearch
      ? <Outputs
        outputsLabel={this.state.outputslabel}
        toggleAll={this.toggleAllOutputs}
        toggleIsOn={this.state.outputToggleAll}
        values={this.state.outputs}
        action={this.selectOutput}
      />
      : null;

    const loading = this.state.loading
      ? <div style={{textAlign: 'center'}}>
        <i className='fa fa-spinner fa-spin' style={{fontSize: '50px', color: 'red'}} />
      </div>
      : null;

    const filtroDatas = this.state.filtroDataVisible 
      ? <div style={{marginBottom: '20px', display: 'inline-flex', width: '110%'}} className='dates-div'>
        <div style={{width: '300px'}} className='data-type'>
          <label>Tipo de Data</label>
          <Select
            options={this.state.filtrosDatas.map((e) => { return {label: e, value: e}; })}
            onChange={this.handleTipoData.bind(this)}
            value={this.state.tipoDeData}
          />
        </div>
        
        <BetweenDates
          noSearchBtn
          action={{startDateSelect: this.handleStartDate}}
          title='Data Inicio'
          startDate={this.state.startDate}
        />
        <BetweenDates
          noSearchBtn
          action={{startDateSelect: this.handleEndDate}}
          title='Data de fim'
          startDate={this.state.endDate}
        />
      </div>
      : null;

    return (
      <div className='listagens'>
        <NavBar />
        <h1><strong>{this.state.title}</strong></h1>
        <div className='input-div'>
          <label>Escolha a fonte</label>
          <Select
            onChange={this.handleFonte}
            options={this.state.options}
            disabled={this.state.available}
          />
          <strong><p style={{color: 'red', marginTop: '10px'}}>
            {!this.state.showSearch ? 'Fonte temporariamente indisponível'
              : null}
          </p>
          </strong>
          <div className='select-div'>
            {tabelas}
            {campoPesquisa}
          </div>
          <a style={{fontSize: '15px'}} id='data-filtro-title' onClick={this.handleFiltroDatas} >Filtro por data</a>
          <p
            style={{ marginTop: '2px', color: 'darkcyan', fontSize: '0.8em', fontStretch: 'semi-expanded'}}>
            Atenção as datas necessitam dos três campos (tipo, ínicio e fim) ou serão ignoradas
          </p>
          {filtroDatas}
          {upload}
          {loading}
        </div>
        {this.state.campoPesquisa !== ''
          ? <div>
            <p>Nº de Items {this.state.data}</p>
            <button className='btn btn-standard' disabled={this.state.buttonDisabled} onClick={this.handleSubmit.bind(this)} >Pesquisar</button>
            <br />
            <br />
            {this.state.showMsg ? <strong><p style={{color: 'red'}}>{this.state.validationMsg}</p></strong> : null}
          </div>
          : null
        }
        {outputs}
      </div>
    );
  }
}

export default PortalReporting;
