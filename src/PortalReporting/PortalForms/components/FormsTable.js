import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

// Import custom Form / Modal
import FormRender from './FormRender';
import FormModal from './FormModal';

// IMPORT CSS
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// API import
import { getForm, refreshTable } from '../API';

class FormsTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
      formID: props.formID,
      showTable: false,
      showModal: false,
      tableColumns: '',
      tableData: props.data,
      formData: [],
      appEl: document.getElementsByTagName('body')[0]
    };
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillReceiveProps (props) {
    const { maquina, tabela_dados } = this.state.tableData.header;
    if (this.state.formID !== props.formID) {
      this.setState({ formID: props.formID, tableData: props.data });
    }
    refreshTable({database: maquina, table: tabela_dados}).then(Response => {
      this.setState({
        tableData: {
          header: this.state.tableData.header,
          fields: this.state.tableData.fields,
          table: Response.data
        }
      });
    }).catch(err => {
      alert(`${err}`);
    });
  }

  handleModalClose () {
    const { maquina, tabela_dados } = this.state.tableData.header;
    refreshTable({database: maquina, table: tabela_dados}).then(Response => {
      this.setState({
        tableData: {
          header: this.state.tableData.header,
          fields: this.state.tableData.fields,
          table: Response.data
        },
        showModal: !this.state.showModal
      });
    }).catch(err => {
      alert(`${err}`);
    });
  }

  render () {
    const { header, table, fields } = this.state.tableData;
    // const keys = Object.keys(table[0]);
    // const noID = keys.filter(e => e !== 'id');
    const tableElements = fields.map((e, index) => {
      return {[Object.keys(e)]: e[Object.keys(e)]['table']};
    }); // filter columns to hide
    // get Collumns data and filters
    const columns = () => {
      const tableHeader = tableElements.map((e, index) => {
        return {
          dataField: Object.keys(e).toString(),
          hidden: Object.values(e)[0] === 0 ? Object.keys(e).toString() : null,
          text: Object.keys(e).toString(),
          filter: textFilter(),
          sort: true
        };
      });
      return tableHeader;
    };

    // Get Rows detail for FormRendering
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({ id: row.id, formData: row, showModal: true });
      }
    };

    // render modal
    const formModal = <FormModal
      el={this.state.appEl}
      isOpen={this.state.showModal}
      action={{close: this.handleModalClose}}
      children={
        <FormRender
          data={this.state.formData}
          validations={this.state.tableData.fields}
          header={header} />
      }
    />;
    return (
      <div className='table-div'>
        <h4>{header.nome_form}</h4>
        <p><strong>{header.mensagem}</strong></p>
        {header.proc_antes.mensagem // render message from proc if it exists
          ? <p style={{color: header.proc_antes.success ? 'green' : 'red'}}>
            <strong>{header.proc_antes.mensagem || null}</strong>
          </p>
          : null
        }
        {formModal}
        <BootstrapTable
          keyField='id'
          data={table}
          columns={columns()}
          rowEvents={rowEvents}
          filter={filterFactory()}
        />
      </div>
    );
  }
}

export default FormsTable;
