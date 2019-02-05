import React, { Component } from 'react';
import Select from 'react-select';

import FormsTable from './components/FormsTable';
import Navbar from '../../components/NavBar/NavBar';
// API imports
import { getOptions, getformByID, getForm } from './API';
import './css/main.css';

class PortalForms extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Portal Forms',
      formOptions: [],
      availableForm: [],
      option: [],
      form: [],
      errMSG: false,
      formID: '',
      showTable: false,
      loading: false
    };
    this.loading = this.loading.bind(this);
  }
  
  componentWillMount () {
    this.loading();
    getOptions().then(Response => {
      this.setState({
        formOptions: Response.data,
        errMSG: false
      });
      this.loading();
    }).catch(err => {
      this.loading();
      if (err.response.status === 500) { 
        return this.setState({errMSG:  `Erro de acesso ao servidor ----> ${err}`});
      }
      if (err.response.status === 404) { 
        return this.setState({ errMSG: `Sem formulários disponiveis`}); 
      }
    });
  }

  handleOption = event => {
    const { value } = event;
    getformByID(value).then(Response => {
      this.setState({ 
        option: event,
        availableForm: Response.data,
        errMSG: false
      });
    }).catch(err => {
      return this.setState({errMSG: err.toString()});
    });
  }

  handleFormList = event => {
    this.loading();
    const { value } = event;
    getForm(value).then(Response => {
      this.setState({
        form: Response.data,
        errMSG: !Response.data[0].header.proc_antes.success 
          ? Response.data[0].header.proc_antes.mensagem
          : false,
        formID: value,
        showTable: Response.data[0].header.proc_antes.success
      });
      this.loading();
    }).catch(err => {
      this.loading();
      return this.setState({errMSG: err.toString()});
    });
  }

  loading () {
    this.setState({loading: !this.state.loading})
  }

  render () {
    const listForms = this.state.availableForm.length > 0
      ? <ListForms action={this.handleFormList} values={this.state.availableForm} />
      : null

    const formTable = this.state.showTable
      ? <FormsTable formID={this.state.formID} data={this.state.form[0]} />
      : null;

    const errMSG = this.state.errMSG
      ? <p style={{color: 'red'}}><strong>{this.state.errMSG}</strong></p>
      : null;

      const loading = this.state.loading
      ? <div style={{textAlign: 'center'}}>
          <i className="fa fa-spinner fa-spin" style={{fontSize: '50px', color: 'red'}}></i> 
        </div>
    : null;

    return (
      <div>
        <Navbar />
        <h1><strong>{this.state.title}</strong></h1>
        <div className='div-container'>
          <Select
            options={this.state.formOptions}
            onChange={this.handleOption}
            value={this.state.option}
          />
        </div>
        {listForms}
        {errMSG}
        {loading}
        {formTable}
      </div>
    );
  }
}

const ListForms = ({ values, action }) => {
  const list = values.map((el, index) => {
    return (
      <button 
        key={`button-${index}`} className='btn btn standard' 
        onClick={action.bind(null, el)}>
      {el.label}
      </button>
    );
  });
  return (
    <div className='ul-div'>
      <ul>{list}</ul>
    </div>
  );
}

export default PortalForms;
