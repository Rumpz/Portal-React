import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

// IMPORT CSS
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// API
import { getReport } from '../../API';

// Custom Modal
import Modal from '../Modal/Modal';
class ReportsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      table: props.data,
      id: '',
      url: '',
      isOpen: false
    };
  }

  componentDidMount () {
  }

  handleClose () {
    this.setState({isOpen: !this.state.isOpen});
  }

  render () {
    const { table, url, isOpen } = this.state;
    const keys = Object.keys(table[0]);
    const columns = () => {
      const tableHeader = keys.map((e, index) => {
        return {
          dataField: e,
          hidden: e === 'id',
          text: e,
          filter: textFilter(),
          sort: true
        };
      });
      return tableHeader;
    };

    // Get Rows detail for FormRendering
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        getReport(row.id).then(Response => {
          this.setState({
            url: Response.data,
            isOpen: true
          });
        }).catch(err => {
          this.setState({err: `${err}`});
        });
      }
    };

    return (
      <div>
        <BootstrapTable
          keyField='id'
          data={table}
          columns={columns()}
          rowEvents={rowEvents}
          filter={filterFactory()}
        />
        <Modal
          isOpen={isOpen}
          reportUrl={url}
          closeModal={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

export default ReportsList;
