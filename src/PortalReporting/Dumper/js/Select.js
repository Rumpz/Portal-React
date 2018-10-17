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
import Columns from './Columns';

import { InputInputs, SelectInputs, SelectOutputs } from './Test';

import { getOptions, columnsByID, exportXLS } from '../API';
import json2xlsx from 'json2xlsx-export';
import XLSX from 'xlsx';

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
      colunasInput: [],
      colunasOutput: [],
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
      loading: false,
      searchTable: [],
      imagem: []
    };

    this.selectInput = this.selectInput.bind(this);
    this.setSelectedInputsValue = this.setSelectedInputsValue.bind(this);
    this.selectOutput = this.selectOutput.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
  }

  componentDidMount() {
    getOptions().then(Response => {
      this.setState({
        options: Response.data,
        fonteAvailable: Response.data.available,
        selectedDisplay: '',
        table: Response.data.table
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
          inputs[e.label] = e.value.map(e => e.value);
        } else inputs[e.label] = e.value;
      }
    });
    const index = imagem ? imagem.indexOf(table) : null;
    const dataToSend = {
      dbConnection: dbConnection,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      searchDateType: searchDateType,
      searchTable: searchTable.length > 1 ? searchTable[index] : searchTable,
      selectedOutputs: outputs,
      selectedInputs: inputs
    };
    exportXLS(dataToSend).then(Response => {
      let exportName =
      `Extração_${dataToSend.searchTable}_${moment(dataToSend.startDate).format('YYYY-MM-DD')}_a_${dataToSend.endDate}.xlsx`;
      /* const keys = Object.keys(Response.data[0]);
      const data = Response.data.map((e) => {
        const toSend = keys.map((key) => {
          return {
            value: e[key],
            type: typeof e[key]
          }
        });
        return toSend;
      });
      const config = {
        filename: 'DumperFile',
        sheets: [
          {
            name: 'SearchSheet',
            data: data
          }
        ]
      };
      json2xlsx(config); */
      this.downloadFile(Response.data, exportName);
      this.setState({ loading: false });
    }).catch(err => {
      if (err.response.status === 500) { this.setState({ loading: false }); return alert(`Erro de acesso ao servidor ----> ${err}`); }
      if (err.response.status === 401) { this.setState({ loading: false }); return alert(`Sem Permissões`); }
      if (err.response.status === 404) { this.setState({ loading: false }); return alert(`Sem resultados entre datas`); }
    });
  }
  
  /* updateSheetRange (ws) {
    var range = {s:{r:20000000, c:20000000},e:{r:0,c:0}};
    Object.keys(ws).filter(function(x) { return x.charAt(0) != "!"; }).map(XLSX.utils.decode_cell).forEach(function(x) {
      range.s.c = Math.min(range.s.c, x.c); range.s.r = Math.min(range.s.r, x.r);
      range.e.c = Math.max(range.e.c, x.c); range.e.r = Math.max(range.e.r, x.r);
    });
    ws['!ref'] = XLSX.utils.encode_range(range);
  } */

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
        colunasInput: Response.data.colunasInput,
        colunasOutput: Response.data.colunasOutput,
        fonteAvailable: Response.data.available,
        filtrosDatas: Response.data.filtrosDatas,
        searchDateType: Response.data.filtrosDatas[0],
        searchTable: Response.data.searchTables
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
    let { colunasInput } = this.state;
    let index = colunasInput.indexOf(input);
    for (let i in colunasInput) {
      if (colunasInput[i] === input.label) index = i;
    }
    colunasInput[index].isOpen = !colunasInput[index].isOpen;
    if (colunasInput[index].isOpen && input.type === 'select') {
      const dataToFind = colunasInput.filter((e) => e.label === input.name);
      colunasInput[index].options = dataToFind;
      this.setState({ selectedInputs: dataToFind });
    } else {
      this.setState({selectedInputs: colunasInput, inputOutputModified: true});
    }
  }

  setSelectedInputsValue (input, e) {
    let { selectedInputs } = this.state;
    console.log('eeeeeeeeeeeeeee', e);
    console.log('selectedInputs', selectedInputs);

    const getSelected = selectedInputs.filter(e => e.isOpen);
    let index = 0;
   
    for (let i in getSelected) {
      if (getSelected[i].label === input.label) index = i;
    }
    
    getSelected[index].value = input.type === 'select' ? e : e.value;

    this.setState({ selectedInputs: getSelected, inputOutputModified: true });
  }

  selectOutput (input) {
    let selectedOutputs = this.state.selectedOutputs;
    selectedOutputs[input] = !selectedOutputs[input];
    this.setState({ selectedOutputs: selectedOutputs, inputOutputModified: true });
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
      colunasOutput, imagem, table,
      selectedDisplay
    } = this.state;
  
    const dateSelector = !this.state.filtrosDatas
      ?
      null
      : <div className='table-select'>
          <label>Tipo de Data</label>
          <DateSelector style={{height: '32px', borderRadius: '3px', textColor: 'red'}} action={this.handleFilters} options={!filtrosDatas ? [] : filtrosDatas}/>
        </div>;

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

    /* 
    const columns = !colunasInput && !colunasOutput
      ? null
      : <Columns 
          inputs={colunasInput} 
          outputs={colunasOutput}
          previousState={this.state}
      />
    */
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
      <div className='container-fluid'>
        <ul className='flex-list'>
          <li><a onClick={this.changeDisplay.bind(this, 'selectInputs')}>Inputs</a></li>
          <li><a onClick={this.changeDisplay.bind(this, 'selectOutputs')}>Outputs</a></li>
        </ul>
        <div className='kewlPanel' >
          <InputInputs 
            action={this.setSelectedInputsValue} 
            inputs={this.state.colunasInput}

          /> 
        </div>
        <div className='kewlPanel' >
          <div style={{display: selectedDisplay === 'selectInputs' ? 'block' : 'none'}}>
            <SelectInputs 
              action={this.selectInput}
              values={this.state.colunasInput}
            />
          </div>
          <div style={{display: selectedDisplay === 'selectOutputs' ? 'block' : 'none'}}>
            <SelectOutputs 
              action={this.selectOutput}
              values={this.state.colunasOutput}
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
