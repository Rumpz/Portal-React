import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { byCategory, getReport, getByfilter } from './API';

// Static components imports
import ReportsList from './js/ReportsList/ReportsList';

// Dynamic components imports
import Modal from './js/Modal/Modal';
import NavBar from '../../components/NavBar/NavBar';

// React-Select lib
import Select from 'react-select';

// CSS
import './css/Reporting.css';

class PortalReporting extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Portal Reporting',
      searchOptions: [
        {label: 'Operação', value: 'Operação'},
        {label: 'Gestão', value: 'Gestão'}
      ],
      reportFK: '',
      reportUrl: '',
      subCats: [],
      data: [],
      showReports: false,
      showModal: false,
      errMsg: ''
    };
    this.handleRow = this.handleRow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleReportDownload = this.handleReportDownload.bind(this);
    this.handleSubCatFilter = this.handleSubCatFilter.bind(this);
    /* this.handleNavbarAction = this.handleNavbarAction.bind(this); */
  }

  componentDidMount () {

  }

  checkState () {
    this.setState({
      showReports: true,
      showModal: true
    });
  }

  handleRow (e) {
    this.setState({
      showModal: true,
      reportFK: e.id
    });
    this.handleReportDownload(e.id);
  }

  handleModalClose (e) {
    this.setState({ showModal: false });
  }

  handleTableButton () {
  }

  handleReportDownload (id) {
    getReport(id).then(Response => {
      this.setState({reportUrl: Response.data});
    }).catch(err => {
      alert(`${err}`);
    });
  }

  handleSubCatFilter (e) {
    if (!e.length) {
      this.setState({ errMsg: 'Por favor selecione o filtro antes da pesquisa!!!' });
      return;
    }
    getByfilter(e).then(Response => {
      if (Response.data === 'Not Found') {
        this.setState({ errMsg: 'Não foram encontrados resultados' });
        return;
      }
      this.setState({
        errMsg: '',
        showReports: true,
        data: Response.data });
    }).catch(err => {
      return alert(`${err}`);
    });
  }

  handleSearchOptions = event => {
    this.setState({selectedOption: event});
    byCategory(event.value).then(Response => {
      this.setState({
        showReports: true,
        data: Response.data
      });
    }).catch(err => {
      alert(`${err}`);
    })
  }
  render () {
    const modalData = {headers: ['a', 'b', 'c'], values: [[1, 2, 3], [4, 5, 6]]};
    const { data, showReports, showModal, reportUrl, errMsg, searchOptions } = this.state;
    const reportsList = showReports
      ? <ReportsList
        header={data.header}
        values={data.body}
        subCat={data.subCat}
        errMsg={errMsg}
        actions={{
          row: this.handleRow,
          button: this.handleTableButton,
          checkSubCat: this.handleSubCatFilter
        }}
      />
      : null;

    return (
      <div className='PortalReport'>
        <NavBar />
        <h1>Pesquisa de Relatórios</h1>
        <label>Selecione uma opção</label>
        <Select
          className='react-select'
          options={searchOptions}
          onChange={this.handleSearchOptions}
          value={this.state.selectedOption}
        />
        <div>{this.state.categories ? this.state.categories : null}</div>
        <Modal
          reportUrl={reportUrl}
          downloadReport={this.handleReportDownload}
          body={document.documentElement}
          isOpen={showModal}
          closeModal={this.handleModalClose}
          title={'Resumo do relatório'}
          modalHeader={modalData.headers}
          modalBody={modalData}
        />
        {reportsList}
      </div>
    );
  }
}

export default PortalReporting;
