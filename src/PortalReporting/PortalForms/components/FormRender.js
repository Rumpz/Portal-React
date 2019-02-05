import React, { Component } from 'react';
import Select from 'react-select';

// Import Custom Details Modal
import DetailsModal from './DetailsModal';

//API imports
import { updateForm } from '../API';

class FormRender extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: props.data,
      validations: props.validations,
      header: props.header,
      errMSG: '',
      disableButton: false,
      msgColor: '',
      showDetailModal: false,
      appEl: document.getElementsByTagName('body')[0]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormField = this.handleFormField.bind(this);
  }

  componentDidMount () {
    this.sortChildrenDivsById('formRender-div');
  }

 componentDidUpdate () {
   var main = document.getElementById('details-div');
 }
  // Order Div components by ascendant order number
  sortChildrenDivsById (parentId) {
    var main = document.getElementById(parentId);
    Array.prototype.map.call(main.children, Object).sort(function (a, b) {
      return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function (elem) {
      main.appendChild(elem);
    });
  }

  handleSubmit () {
    const { data, validations, header } = this.state;
    const id = data.id;
    const keys = Object.keys(data).filter(e => e !== 'id');
    let updatedValues = {
      header: {
        id: id,
        dbConnection: header.maquina,
        tabela: header.tabela_dados,
        proc_depois: header.proc_depois
      }
    };

    keys.map((e, index) => {
      updatedValues[e] !== 'null'
        ? updatedValues[e] = this.state[e]
        : null;
    });

    Object.keys(updatedValues).forEach(key => !updatedValues[key] && delete updatedValues[key])
    updateForm(updatedValues).then(Response => {
      Response.data.message
        ? this.setState({ msgColor: 'green', disableButton: true, errMSG: 'Inserido com sucesso' })
        : this.setState({ 
            msgColor: Response.data[0][0].success === 1 ? 'green' : 'red',
            disableButton: true, 
            errMSG: `${Response.data[0][0].mensagem}`
          });
      }).catch(err => {
        this.setState({msgColor: 'red', errMSG: err.toString()})
      });
  }

  handleFormField = event => {
    this.setState({errMSG: ''})
    Object.keys(event).length > 2
      ? this.setState({ [event.target.name]: event.target.value ? event.target.value : '' })
      : this.setState({ [Object.keys(event.value)]: event.value[Object.keys(event.value)] })
  }

  handleDetailModal = event => {
    this.setState({showDetailModal: !this.state.showDetailModal})
  }

  render () {
    const { data, validations } = this.state;
    const detailsMod = this.state.showDetailModal
      ? <DetailsModal
          el={this.state.appEl}
          isOpen={this.state.showDetailModal}
          action={{close: this.handleDetailModal}}
          data={data}
          validations={validations}
        />
      : null;
    const keys = validations.map(e => Object.keys(e));
    const vals = keys.map((key, index) => {
      return (
        <div id={validations[index][key]['modalOrder']} key={`div-${index}`} className='row'>
          {validations[index][key]['modal'] ? <label key={`label-${index}`}>{validations[index][key]['label']}</label> : null}
            {validations[index][key]['modal']
              ? validations[index][key]['tipo'] === 'text'
                ? <input
                    key={`input-${index}`}
                    id='text'
                    name={key}
                    placeholder={validations[index][key]['placeholder']}
                    defaultValue={data[key]}
                    disabled={validations[index][key]['editable'] ? 0 : 1}
                    type='text'
                    onChange={this.handleFormField}
                  />
                : validations[index][key]['tipo'] === 'select'
                  ? <Select 
                      key={`select-${index}`}
                      name={key}
                      placeholder={validations[index][key]['placeholder']}
                      value={this.state[data[key]]}
                      defaultValue={{ label: data[key], value: data[key] }}
                      options={validations[index][key]['selectOPT'].split('|').map(e => {return {label: e, value: {[key]: e}}})}
                      isDisabled={validations[index][key]['editable'] ? 0 : 1}
                      onChange={this.handleFormField} 
                    />
                : validations[index][key]['tipo'] === 'comment'
                  ? <textarea 
                    key={`textArea-${index}`}
                    name={key}
                    placeholder={validations[index][key]['placeholder']}
                    defaultValue={data[key]}
                    disabled={validations[index][key]['editable'] ? 0 : 1}
                    onChange={this.handleFormField}
                  /> 
                  : <div dangerouslySetInnerHTML={{ __html: data[key] }} />
              : null 
            }
        </div>
      );
    });
    return (
      <div>
        <h4><strong>Formulário</strong></h4>
        <div id='formRender-div' className='col-md-auto' style={{textAlign: 'center'}}>
          {vals}
        </div>
        <p style={{paddingTop: '5px', color: this.state.msgColor}}><strong>{this.state.errMSG}</strong></p>
        {detailsMod}
        <a onClick={this.handleDetailModal}>Detalhes</a>
        <br />
        <button 
          style={{marginTop: '10px'}} 
          disabled={this.state.disableButton} 
          className='btn btn-success' 
          onClick={this.handleSubmit}>
          Guardar
        </button>
      </div>
    );
  }
}

export default FormRender;

