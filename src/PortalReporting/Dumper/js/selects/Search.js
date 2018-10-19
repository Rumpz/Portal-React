// modules
import React, { Component } from 'react';
import moment from 'moment';
import '../css/main.css';
// main components
import SelectInputs from './SelectInputs.js';
import SelectOutputs from './SelectOutputs.js';
import InputInputs from './InputInputs.js';
// aux components
import BetweenDates from '../../../components/Dates/BetweenDates.js';
import Template from '../../../components/Template/index.js';
import {Input, Select} from '../../../components/Inputs/Inputs.js';
import Loading from '../../../components/Loading/Loading.js';
import {DefaultBtn} from '../../../components/Buttons/Buttons.js';

import {findFieldOptions, findFieldOptionsAsync, findXls} from '../API.js';

import outputs from './outputs.json';
import inputs from './inputs.json';

export default class Escala extends Component {
  constructor (props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      selectedInputs: inputs,
      selectedOutputs: outputs,
      selectedDisplay: '',
      selectedDateType: 'DATA_INICIO_OT',
      loading: false,
      templateName: false,
      templateSaveMode: true,
      search: false,
      templateSave: false,
      inputOutputModified: false,
      newTemplate: true
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  componentDidMount () {
  }

  selectStartDate (date) {
    this.setState({startDate: date});
  }

  selectEndDate (date) {
    this.setState({endDate: date});
  }

  selectInput (input) {
    let {selectedInputs} = this.state;
    let index = 0;
    for (let i in selectedInputs) {
      if (selectedInputs[i].name === input.name) index = i;
    }
    selectedInputs[index].isOpen = !selectedInputs[index].isOpen;

    if (selectedInputs[index].isOpen && input.type === 'select') {
      let dataTofind = {name: input.name};
      findFieldOptions(dataTofind).then(res => {
        selectedInputs[index].options = res.data;
        this.setState({selectedInputs: selectedInputs});
      }).catch(err => alert(err));
    } else {
      this.setState({selectedInputs: selectedInputs, inputOutputModified: true});
    }
  }

  setSelectedInputsValue (input, e) {
    let {selectedInputs} = this.state;
    let index = 0;
    for (let i in selectedInputs) {
      if (selectedInputs[i].name === input.name) index = i;
    }
    selectedInputs[index].value = input.type === 'select' ? e : e.target.value;
    this.setState({selectedInputs: selectedInputs, inputOutputModified: true});
  }

  selectOutput (input) {
    let selectedOutputs = this.state.selectedOutputs;
    selectedOutputs[input] = !selectedOutputs[input];
    this.setState({selectedOutputs: selectedOutputs, inputOutputModified: true});
  }

  changeDisplay (value) {
    this.setState({selectedDisplay: value});
  }

  selectDateSearch (e) {
    this.setState({selectedDateType: e.target.value});
  }

  setTemplateInputs (obj) {
    let {selectedInputs} = this.state;
    let tempSelectedInputs = selectedInputs;
    for (let i in selectedInputs) {
      let name = selectedInputs[i].name;
      if (obj[name]) {
        tempSelectedInputs[i].value = obj[name];
        tempSelectedInputs[i].isOpen = true;

        let dataTofind = {name: name};
        findFieldOptions(dataTofind)
          .then(res => {
            tempSelectedInputs[i].options = res.data;
          })
        .catch(err => console.log(err));
      } else {
        tempSelectedInputs[i].isOpen = false;
      }
    }
    this.setState({selectedInputs: tempSelectedInputs});
  }

  getAsyncOptions (input, value) {
    let dataTofind = {
      value: value,
      name: input.name
    };
    return findFieldOptionsAsync(dataTofind)
      .then((response) => { return { options: response.data }; });
  }

  getXlsTableData () {
    let {startDate, endDate, selectedInputs, selectedOutputs, selectedDateType} = this.state;
    let outputs = Object.keys(selectedOutputs).map(key => {
      if (selectedOutputs[key]) return key;
    });
    outputs = outputs.filter(e => e);

    let inputs = {};
    selectedInputs.map(e => {
      if (e.isOpen) {
        if (typeof e.value !== 'string') {
          inputs[e.name] = e.value.map(e => e.value);
        } else {
          inputs[e.condition] = e.condition;
          inputs[e.name] = e.value;
        }
      }
    });
    let data = {
      outputs: outputs,
      inputs: inputs,
      startDate: startDate.clone().format('YYYY-MM-DD'),
      endDate: endDate.clone().add('d', 1).format('YYYY-MM-DD'),
      dateType: selectedDateType
    };

    this.setState({loading: true, search: true});

    findXls(data)
      .then((res) => {
        let name = `Report_${data.startDate}_a_${data.endDate}_as_${moment()}.xlsx`;
        this.setState({loading: false}, this.downloadFile(res.data, name));
      })
      .catch((err) => {
        if (!err.response) return this.setState({loading: false}, alert('Sem connexão ao servidor'));
        var arr = new Uint8Array(err.response.data);
        var str = String.fromCharCode.apply(String, arr);
        this.setState({loading: false}, alert(str));
      });
  }

  downloadFile (data, name) {
    let blob = new Blob([data], {type: 'application/octet-stream'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('A');
    a.href = url;
    a.target = '_blank';
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  toggleAllOutputs (e) {
    let value = e.target.checked;
    let {selectedOutputs} = this.state;
    for (let i in selectedOutputs) {
      selectedOutputs[i] = value;
    }
    this.setState({selectedOutputs: selectedOutputs, outputToggleAll: value});
  }

  onTemplateSelectChange (data, name) {
    if (data == -1) {
      this.setTemplateInputs({});
      this.toggleAllOutputs({target: {checked: false}});
      this.setState({newTemplate: true, inputOutputModified: false});
    } else {
      let templateData = JSON.parse(data);
      let dataToJSON = JSON.parse(templateData.template);
      console.log('data', dataToJSON);
      this.setTemplateInputs(dataToJSON.inputs);
      this.toggleAllOutputs({target: {checked: false}});
      dataToJSON.outputs.map(e => this.selectOutput(e));
      this.setState({templateName: templateData.name, inputOutputModified: false, search: false, newTemplate: false});
    }
  }

  resetInputsOutputs () {
    this.setState({selectedInputs: inputs, selectedOutputs: outputs});
  }

  onTemplateSaveChanges (callback) {
    let {selectedInputs, selectedOutputs, templateName, templateSaveMode, newTemplate} = this.state;
    let selectedInputsAdjusted = {};
    selectedInputs.map(e => { if (e.isOpen) selectedInputsAdjusted[e.name] = e.value; });
    let selectedOutputsAjusted = [];
    Object.keys(selectedOutputs).map(key => { if (selectedOutputs[key]) selectedOutputsAjusted.push(key); });
    let templateSting = JSON.stringify({inputs: selectedInputsAdjusted, outputs: selectedOutputsAjusted});
    let templateToSave = {
      name: templateName,
      template: templateSting,
      insert: newTemplate || !templateSaveMode
    };
    callback(null, templateToSave);
  }

  changeTemplateName (e) {
    this.setState({templateName: e.target.value});
  }

  toggleTemplateSaveMode () {
    this.setState({templateSaveMode: !this.state.templateSaveMode});
  }

  render () {
    let {startDate, endDate, selectedInputs,
      selectedDisplay, selectedDateType, loading,
      outputToggleAll, selectedOutputs, templateSaveMode,
      templateName, search, inputOutputModified, newTemplate} = this.state;
    let selectedStyle = {color: 'red', fontWeight: 'bold'};
    let style = {
      width: '95%',
      margin: '2.5%',
      backgroundColor: '#2e2f3b',
      borderRadius: '5px',
      backgroundImage: 'linear-gradient(transparent, transparent, transparent, transparent,rgba(24, 24, 30, 0.3) ,rgba(24, 24, 30, 0.5))'
    };
    return (
      <div className='container-fluid'>
        <Header
          startDate={startDate}
          endDate={endDate}
          searchDate={selectedDateType}
          templatePage='Reporting_kpi'
          className='kewlPanel'
          actions={{
            startDateSelect: this.selectStartDate.bind(this),
            endDateSelect: this.selectEndDate.bind(this),
            selectDateSearch: this.selectDateSearch.bind(this)
          }}
        />
        <br />
        <br />
        <ul>
          {
            search && inputOutputModified
            ? (<li>
              <div>
                <label>Template Modificado</label>
                {!newTemplate
                  ? (<ul className='flex-list'>
                    <li>
                      <label style={{textAlign: 'left'}}>
                        <input type='checkBox' onClick={this.toggleTemplateSaveMode.bind(this)} checked={!templateSaveMode} />
                         Novo</label>
                    </li>
                    <li>
                      <label style={{textAlign: 'left'}}>
                        <input type='checkBox' onClick={this.toggleTemplateSaveMode.bind(this)} checked={templateSaveMode} />
                         Update</label>
                    </li>
                  </ul>)
                : null}
              </div>
            </li>)
            : null
          }
          <li>
            <ul className='flex-list'>
              {search && inputOutputModified
                ? <li>
                  <div style={{padding: '5px 0'}}>
                    <Input
                      label='Modificar Nome'
                      action={this.changeTemplateName.bind(this)}
                      value={templateName}
                    />
                  </div>
                </li>
                : null
              }
              <li>
                <Template
                  templatePage='Reporting_kpi'
                  className='kewlPanel'
                  actions={{
                    onSelectChange: this.onTemplateSelectChange.bind(this),
                    onSaveChanges: this.onTemplateSaveChanges.bind(this)
                  }}
                  saveIsActive={search && inputOutputModified}
                />
              </li>
              <li>
                <br />
                <div style={{width: '100px', position: 'absolute'}}>
                  {loading
                    ? (<div><br />
                      <Loading
                        className='spinner-small'
                      /></div>)
                    : <DefaultBtn
                      size={2}
                      tooltip='Pesquisar'
                      style={{color: 'green'}}
                      icon='fa-search'
                      name='search'
                      action={this.getXlsTableData.bind(this)}
                    />
                  }
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <ul className='flex-list'>
          <li><a onClick={this.changeDisplay.bind(null, 'selectInputs')} style={selectedDisplay === 'selectInputs' ? selectedStyle : null} >Inputs</a></li>
          <li><a onClick={this.changeDisplay.bind(null, 'selectOutputs')} style={selectedDisplay === 'selectOutputs' ? selectedStyle : null}>Outputs</a></li>
        </ul>
        <div className='kewlPanel' style={style}>
          <InputInputs
            inputs={selectedInputs}
            action={this.setSelectedInputsValue.bind(this)}
            getAsyncOptions={this.getAsyncOptions.bind(this)}
          />
        </div>
        <div className='kewlPanel' style={style}>
          <div style={{display: selectedDisplay === 'selectInputs' ? 'block' : 'none'}}>
            <SelectInputs
              action={this.selectInput.bind(this)}
              values={selectedInputs}
            />
          </div>
          <div style={{display: selectedDisplay === 'selectOutputs' ? 'block' : 'none'}}>
            <SelectOutputs
              action={this.selectOutput.bind(this)}
              toggleAll={this.toggleAllOutputs.bind(this)}
              toggleIsOn={outputToggleAll}
              values={selectedOutputs}
            />
          </div>
        </div>
      </div>
    );
  }
}

let Header = ({startDate, endDate, actions, searchDate}) => {
  return (
    <ul>
      <li>
        <ul className='flex-list'>
          <li>
            <Select
              label='Tipo de Data'
              value={searchDate}
              className='kewlPanel'
              action={actions.selectDateSearch}
              options={[{name: 'Data Inicio OT', value: 'DATA_INICIO_OT'}, {name: 'Data Abertura OT', value: 'DATA_ABERTURA_OT'}, {name: 'Data Criação OT', value: 'DATA_CRIACAO_OT'}]}
              active
              />
          </li>
          <li>
            <BetweenDates
              startDate={startDate}
              endDate={endDate}
              action={actions}
              noSearchBtn
            />
          </li>
        </ul>
      </li>
    </ul>
  );
};
