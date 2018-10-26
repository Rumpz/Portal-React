// Default imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//material UI imports
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loading from '../../../components/old/Loading/Loading';

// Custom imports
import BetweenDates from '../../../components/old/Dates/BetweenDates';
import DateSelector from './DateSelector';

import InputInputs from './selects/InputInputs';
import SelectInputs from './selects/SelectInputs';
import SelectOutputs from './selects/SelectOutputs';

import { getOptions, columnsByID, exportXLS } from '../API';
import fileSaver from 'file-saver';
import '../css/select.css';

const styles = theme => ({
  root: {
    width: '50%',
    margin: '0px auto',
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    maxWidth: 'auto'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  datePickers: {
    display: 'flex',
    marginTop: '10px'
  },
  dateSelect: {
    padding: '200px',
    color: 'black',
    height: '32px',
    borderRadius: '4px'
  }
});

class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dbConnection: '',
      inputs: [],
      outputs: [],
      filtrosDatas: [],
      options: [],
      searchOpt: '',
      fonteAvailable: 0,
      searchDateType: '',
      table: '',
      startDate: moment(),
      endDate: moment(),
      selectedDisplay: '',
      selectedInputs: [],
      selectedOutputs: [],
      inputOutputModified: false,
      outputsLabel: {},
      loading: false,
      searchTable: [],
      imagem: [],
      outputToggleAll: false,
      multiVals: [],
      validationMsg: ''
    };

    this.selectInput = this.selectInput.bind(this);
    this.setSelectedInputsValue = this.setSelectedInputsValue.bind(this);
    this.selectOutput = this.selectOutput.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.toggleAllOutputs = this.toggleAllOutputs.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
/*     this.handleMulti = this.handleMulti.bind(this); 
    this.handleText = this.handleText.bind(this); */
  }

  componentDidMount() {
    getOptions().then(Response => {
      this.setState({
        options: Response.data,
        fonteAvailable: Response.data.available,
        selectedDisplay: '',
        table: Response.data.table,
        validationMsg: ''
      });
    }).catch(err => {
      return alert(`${err}`)
    });
  }
  
  startDateSelect (e) {
    this.setState({startDate: e});
  }

  endDateSelect (e) {
    this.setState({endDate: e});
  }

  handleSearch (e) {
    this.setState({ loading: true });
    // TODO method to querie database
    let { 
      startDate, 
      endDate, 
      searchDateType, 
      imagem,
      options,
      table,
      selectedInputs, 
      selectedOutputs,
      searchTable,
      dbConnection
    } = this.state;
    
    let outputs = Object.keys(selectedOutputs).map(key => {
      if (selectedOutputs[key]) return key;
    });
    outputs = outputs.filter(e => e);

  
    let inputs = {};
    selectedInputs.map(e => {
      if (e.isOpen) {
        if (typeof e.value !== 'string') {
          if (e.value === null) { 
            return this.setState({validationMsg: 'Atenção os campos em brancos serão ignorados'})
           }
          inputs[e.name] = e.value.map(e => e.value)
        } else {
          if (e.value === '') { return this.setState({validationMsg: 'Atenção os campos em brancos serão ignorados'}) }
          inputs[e.name] = e.value;           
        }
      }
    });
    
    const index = imagem ? imagem.indexOf(table) : null;
    const dataToSend = {
      dbConnection: dbConnection,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      searchDateType: searchDateType,
      searchTable: searchTable[index] || searchTable[2] || searchTable,
      selectedOutputs: outputs,
      selectedInputs: inputs
    };
    // if (!dataToSend.selectedInputs) return alert(`Campos de multipla escolha em branco, por favor insira valores ou elimine o campo`)
    exportXLS(dataToSend).then(Response => {
      let exportName =
      `Extração_${dataToSend.searchTable}_${moment(dataToSend.startDate).format('YYYY-MM-DD')}_a_${dataToSend.endDate}.xlsx`;
      return console.log('Resp', Response.data)
      /* let file = new File(Response.data, exportName)
      fileSaver.saveAs(file); */
      this.downloadFile(Response.data, exportName)
      this.setState({ loading: false });
    }).catch(err => {
      return console.log(err)
      if (err.response.status === 500) { this.setState({ loading: false ,validationMsg: `Erro de acesso ao servidor ----> ${err}` }); return }
      if (err.response.status === 401) { this.setState({ loading: false }); return alert(`Sem Permissões`); }
      if (err.response.status === 404) { this.setState({ loading: false ,validationMsg: `Sem resultados entre datas!!!`}); return }
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

  handleChange = event => {
    columnsByID(event.target.value).then(Response => {
      this.setState({
        [event.target.name]: event.target.value,
        dbConnection: Response.data.dbConnection,
        searchOpt: event.target.value,
        imagem: Response.data.imagem,
        selectedInputs: Response.data.colunasInput,
        selectedOutputs: Response.data.colunasOutput,
        outputsLabel: Response.data.outputsLabel,
        fonteAvailable: Response.data.available,
        filtrosDatas: Response.data.filtrosDatas,
        searchDateType: Response.data.filtrosDatas[0],
        searchTable: Response.data.searchTables,
        validationMsg: ''
      });
    }).catch(err => {
      return alert(`${err}`)
    })
  }

  handleOptionSelect = event => {
    this.setState({ table: event.target.value});
  }

  handleFilters = event => {
    this.setState({ searchDateType: event.target.value })
  }

  /*****************************************************************************************************
  ******************************************************************************************************
  ****************************************INPUTS / OUPUTS **********************************************
  ******************************************************************************************************
  *****************************************************************************************************/

  selectInput (input) {
    let {selectedInputs} = this.state;
    let index = 0;
    for (let i in selectedInputs) {
      if (selectedInputs[i].name === input.name) index = i;
    }
    selectedInputs[index].isOpen = !selectedInputs[index].isOpen;
    if (selectedInputs[index].isOpen && input.type === 'select') {
      const dataToFind = selectedInputs.filter((e) => e.name === input.name).map(e => e.combinations);
      selectedInputs[index].options = dataToFind[0];
      this.setState({selectedInputs: selectedInputs, validationMsg: ''});
    } else {
      this.setState({selectedInputs: selectedInputs, validationMsg: '', inputOutputModified: true});
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

  toggleAllOutputs (e) {
    let value = e.target.checked;
    let { selectedOutputs } = this.state;
    for (let i in selectedOutputs) {
      selectedOutputs[i] = value;
    }
    this.setState({selectedOutputs: selectedOutputs, outputToggleAll: value});
  }

 /*****************************************************************************************************/
 /*****************************************************************************************************/
 /*****************************************************************************************************/
 /*****************************************************************************************************/

  changeDisplay (value) {
    this.setState({selectedDisplay: value});
  }

   render() {
    const { classes } = this.props;
    const { 
      startDate, endDate, options, 
      fonteAvailable, filtrosDatas, colunasInput,
      colunasOutput, outputsLabel, imagem, 
      table, selectedDisplay, selectedInputs,
      outputToggleAll, selectedOutputs
    } = this.state;

    const dateSelector = !this.state.filtrosDatas
      ?
      null
      : <div className='table-select'>
          <label>Tipo de Data</label>
          <DateSelector style={{height: '32px', borderRadius: '3px', textColor: 'red'}} action={this.handleFilters} options={!filtrosDatas ? [] : filtrosDatas}/>
        </div>;
    const selectedStyle = {color: 'red', fontWeight: 'bold'};
    const tableSelect = this.state.searchOpt
      ? <TableSelect
        	renderValue={table ? table : null}
          action={{tableSelect: this.handleOptionSelect}}
          values={imagem} />
      : null;
    
    const loading = this.state.loading
      ? <div style={{textAlign: 'center'}}>
          <i className="fa fa-spinner fa-spin" style={{fontSize: '50px', color: 'red'}}></i> 
        </div>
    : null;

    return (  
      <div>
        <form className={classes.root} autoComplete="off">
          <h1>Extrator de Dados</h1>
          <FormControl className={classes.formControl}>
          <InputLabel style={{color: 'black'}} htmlFor="name">Fonte</InputLabel>
          <Select
            value={this.state.name}
            onChange={this.handleChange}
            inputProps={{
              name: 'name',
              id: 'name',
            }}
          >
          {options.map((el, index) => <MenuItem key={el + index} value={el.value}>{el.name}</MenuItem>)}
          </Select>
          {fonteAvailable > 0 ? <Available /> : fonteAvailable <= 0 ? <Unavailable /> : null}
          {tableSelect}
          <div className={classes.datePickers}>
          {dateSelector}
          <BetweenDates
            noSearchBtn
            title='Data de inicio'
            selected={startDate}
            startDate={startDate}
            action={{
              startDateSelect: this.startDateSelect.bind(this),
            }}
          />
          <BetweenDates
            title='Data de fim'
            selected={endDate}
            startDate={endDate}
            action={{
              startDateSelect: this.endDateSelect.bind(this),
              search: this.handleSearch.bind(this)
            }}
          />
        </div>
        </FormControl>
      </form>
      {loading}
      <div >
        <ul className='container-fluid'>
          <li><a onClick={this.changeDisplay.bind(null, 'selectInputs')} style={selectedDisplay === 'selectInputs' ? selectedStyle : null}>Inputs</a></li>
          <li><a onClick={this.changeDisplay.bind(null, 'selectOutputs')} style={selectedDisplay === 'selectOutputs' ? selectedStyle : null}>Outputs</a></li>
        </ul>
        <div className='kewlPanel'>
          <InputInputs
            inputs={selectedInputs}
            action={this.setSelectedInputsValue}
            validationMsg={this.state.validationMsg}
          />
        </div>
        <div className='kewlPanel'>
          <div style={{display: selectedDisplay === 'selectInputs' ? 'block' : 'none'}}>
            <SelectInputs
              action={this.selectInput.bind(this)}
              values={selectedInputs}
            />
          </div>
          <div style={{display: selectedDisplay === 'selectOutputs' ? 'inline-block' : 'none'}}>
            <SelectOutputs
              outputsLabel={outputsLabel}
              action={this.selectOutput.bind(this)}
              toggleAll={this.toggleAllOutputs.bind(this)}
              toggleIsOn={outputToggleAll}
              values={selectedOutputs}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Unavailable = () => {
  return (
    <div>
      <FormHelperText style={{color: 'red', fontSize: '1.2rem'}}>⚠️ Fonte temporariamente indisponivel - Por Favor tente mais tarde ⚠️</FormHelperText>
    </div>
  );
}

const Available = () => {
  return (
    <div>
      <FormHelperText style={{color: 'green'}}>Disponivel</FormHelperText>
    </div>
  );
  
}

const TableSelect = ({values, action, renderValue}) => {
  const vals = values ? 
    (
      <div>
        <p><strong> Aplicar filtro </strong></p>
        <Select
          onChange={action.tableSelect}
          value={renderValue}
          inputProps={{
            name: 'name',
            id: 'name',
          }}
        >
        {values.map((el, index) => <MenuItem key={el + index} value={el}>{el}</MenuItem>)}
        </Select>
      </div>
    )
  : null
  return (
    <ul style={{display: 'flex', listStyle: 'none', margin: '0px auto', paddingLeft: '2px'}}>{vals}</ul>
  );
}
export default withStyles(styles)(SimpleSelect);
