import React, { Component } from 'react';
import { getTableOptions, getInsertOptions, importXLSX } from './API';

// Custom Navbar import
import NavBar from '../../components/NavBar/NavBar';
import ExcelRender from '../../components/ExcelRender/ExcelRender';

import Select from 'react-select';

// CSS
import './css/carregamentos.css';

class Carregamentos extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Carregamentos',
      tableOptions: [],
      msg: false,
      procMessage: '',
      procStatus: '',
      msgColor: 'red',
      uploadVisible: false,
      selectedFile: '',
      insertOptions: [],
      loading: false,
      columns: []
    };
    this.handleTableOpt = this.handleTableOpt.bind(this);
  }

  componentDidMount () {
    getTableOptions().then(Response => {
      this.setState({ tableOptions: Response.data, msg: false});
    }).catch(err => {
      this.setState({ msg: err.toString() });
    });
  }

  handleTableOpt = event => {
    getInsertOptions(event.value).then(Response => {
      this.setState({
        uploadVisible: true, 
        msg: false,
        insertOptions: Response.data,
        columns: Response.data[0]['colunas'].split('|')
      })
    }).catch(err => {
      this.setState({loading:false, msgColor:'red', msg: err.toString()})
    })
    
  }

  handleFile (e) {
    this.setState({msg: '', selectedFile: e.target.files[0]});
  }

  submitFile () {
    
    const insertOptions = this.state.insertOptions[0];
    const file = new FormData();
    file.append('file', this.state.selectedFile);
    if (!this.state.selectedFile) { return this.setState({msgColor: 'red', msg: 'Por favor selecione um ficheiro a inserir'})}
    this.setState({loading: true})
    importXLSX(insertOptions, file).then(Response => {
      this.setState({
        loading: false, 
        msgColor: 'green',
        procMessage: Response.data.message,
        procStatus: Response.data.success,
        msg: `${Response.data.insertedRows.affectedRows} linhas inseridas com sucesso`})
    }).catch(err => {
      this.setState({loading: false, msgColor:'red', msg: err.toString()})
    });
  }

  render () {
    const loading = this.state.loading
      ? <div style={{textAlign: 'center'}}>
          <i className="fa fa-spinner fa-spin" style={{fontSize: '50px', color: 'red'}}></i> 
        </div>
      : null;

    const upload = this.state.uploadVisible
    ? <div>
      <label >
      Escolha o ficheiro a inserir (.xlsx)
        <input
          id='input'
          className='btn btn-primary btn-file'
          style={{margin: '0 auto'}}
          name='file'
          type='file'
          accept='.xlsx, .xlsb, .xls, .xlsm'
          onChange={this.handleFile.bind(this)}
        />
      </label>
    </div>
    : null;
    const columns = this.state.uploadVisible 
    ? <div className='columns-div'>
        <h3 style={{fontSize: '15px'}} >Colunas a inserir</h3>
        <ul className='columns-ul'>
        {
          this.state.columns.map((e, index) => {
            return (
              <li key={`columns-li-${index}`} style={{margin:'10px 20px 10px 20px'}}>{e}</li>
            );
          })
        }
        </ul>
      </div>
    : null;

    const { tableOptions } = this.state;
    return (
      <div className='carregamentos-div'>
        <NavBar />
        <h1><strong>{this.state.title}</strong></h1>
        <Select
          className='select-opt'
          onChange={this.handleTableOpt}
          options={tableOptions}
        />
        {columns}
        {upload}
        {loading}
        {
          this.state.uploadVisible 
          ? <button className='btn btn-primary' onClick={this.submitFile.bind(this)}>Carregar ficheiro</button> 
          : null
        }
          <p 
            style={{
              margin: '5px 0px 10px 0px', 
              fontSize: '15px', 
              color: this.state.msgColor
            }}>
            {this.state.msg ? this.state.msg : null}
          </p>
          <p className='proc-msg' style={{color: this.state.procStatus ? 'green' : 'red'}}>
            <strong>{this.state.procMessage}</strong>
          </p>
          <div className='file-viewer'>
            <ExcelRender />
          </div>
      </div>
    );
  }
}

export default Carregamentos;
