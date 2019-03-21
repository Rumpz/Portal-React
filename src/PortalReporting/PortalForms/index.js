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
      loading: false,
      hasArgs: false,
      argsInputs: []
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
    let collumns;
    let values;
    getForm({id: value}).then(Response => {
      if (Response.data[0].header.procedure_cols) {
        collumns = Object.keys(Response.data[0].header.procedure_cols[0]);
        values = collumns.map((e) => { return { [e]: null } });
      } else {
        values = [];
      }
      this.setState({
        hasArgs: Response.data[0].header.procedureArgs,
        argsInputs: values,
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
  
  // ARGS METHODS
  /**********************************************************************************/
  handleInputArg(e) {
    const { form } = this.state;
    let collumns = Object.keys(form[0].header.procedure_cols[0]); // get columns for index
    let values = this.state.argsInputs;
    values[collumns.indexOf(e.target.name)] = {[e.target.name]: e.target.value === '' ? null : e.target.value};
    this.setState({ argsInputs: values }) 
  }

  handleSelectArgs(e) {
    const { form } = this.state;
    let collumns = Object.keys(form[0].header.procedure_cols[0]); // get columns for index
    let values = this.state.argsInputs; // values are the same as default ones
    values[collumns.indexOf(e.name)] = {[e.name]: e.value}; // set value on key position
    this.setState({ argsInputs: values }) //setState with new values
  }

  submitArgs () {
    this.loading();
    const { argsInputs, formID } = this.state;
    getForm({id: formID, filters: argsInputs}).then(Response => {
      this.setState({
        hasArgs: Response.data[0].header.procedureArgs,
        form: Response.data,
        errMSG: !Response.data[0].header.proc_antes.success 
          ? Response.data[0].header.proc_antes.mensagem
          : false,
        formID: formID,
        showTable: Response.data[0].header.proc_antes.success
      });
      this.loading();
    }).catch(err => {
      this.loading();
      return this.setState({errMSG: err.toString()});
    });
  }
  /**********************************************************************************/
  componentWillReceiveProps (props) {
    /* if (this.state.formID !== props.formID) {
      console.log('aqui')
      this.setState({ formID: props.formID, tableData: props.data });
    } */
    console.log('aaaaaaaaa', props)
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

    const argsSelector = this.state.hasArgs
      ? <ArgsSelector 
          columns={this.state.form[0].header.procedure_cols[0]}
          action={{
            handleInputArg: this.handleInputArg.bind(this),
            handleSelectArgs: this.handleSelectArgs.bind(this),
            submitArgs: this.submitArgs.bind(this)
          }}
        /> 
      : null

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
        {argsSelector}
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
        style={{marginRight: '5px', marginBottom: '5px'}}
        key={`button-${index}`} 
        className='btn btn standard' 
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


const ArgsSelector = ({value, columns, action }) => {
  const keys = Object.keys(columns); // = header.procedure_cols[0]
  const options = keys.map((key, index) => {
    return columns[key]['options'].length > 0
      ? <div key={`argsSelect-${index}`}>
          <label>{keys[keys.indexOf(key)]}</label>
          <Select
            className='args-select'
            onChange={action.handleSelectArgs} 
            options={columns[key]['options'][0].split('|').map((e) => { 
              return {name:keys[keys.indexOf(key)], label: e, value: e}; }
            )} 
          />
      </div> 
      : <div key={`argsInput-${index}`}>
          <label>{keys[keys.indexOf(key)]}</label>
          <input className='args-input' name={keys[keys.indexOf(key)]} onChange={action.handleInputArg} />
      </div>;
  });
  return (
    <div className='args-title'>
      <h4>Pesquisar por filtro</h4>
      <div className='args-div'>
        {options}
      </div>
        <button className='btn btn-primary' style={{marginTop: '10px'}} onClick={action.submitArgs}>Adicionar inputs</button>
    </div>
  );
};

export default PortalForms;
