import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { byCategory, getReport, getByfilter } from './API';

// Static components imports
import ReportsList from './js/ReportsList/ReportsList';

// Dynamic components imports
import ExcelRender from '../../components/ExcelRender/ExcelRender';
import Modal from '../../components/Modal/Modal';

import NavBar from '../../components/NavBar/NavBar';
// CSS
import './css/Reporting.css';

class PortalReporting extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Portal Reporting',
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
    this.handleNavbarAction = this.handleNavbarAction.bind(this);
    this.handleReportDownload = this.handleReportDownload.bind(this);
    this.handleSubCatFilter = this.handleSubCatFilter.bind(this);
  }

  componentDidMount () {
  }

  checkState () {
    this.setState({
      showReports: true,
      showModal: true
    });
    console.log(this.state);
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

  handleNavbarAction (e) {
    const vals = e.target.innerText;
    return vals === 'Operação' || vals === 'Gestão'
      ? byCategory(vals).then(Response => {
        this.setState({
          showReports: true,
          data: Response.data
        });
      }).catch(err => {
        alert(`${err}`);
      })
      : alert(`Oops Under DeV! ->Check Operação and Gestão features <-`);
  }

  handleTableButton () {
    console.log('click');
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

  render () {
    const modalData = {headers: ['a', 'b', 'c'], values: [[1, 2, 3], [4, 5, 6]]};
    const { data, showReports, showModal, reportUrl, errMsg } = this.state;
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
        <NavBar actions={this.handleNavbarAction} />
        <div>{this.state.categories ? this.state.categories : null}</div>
        {reportsList}
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
        <ExcelRender />
        <Button onClick={this.checkState.bind(this)}>Check DB Connection</Button>
      </div>
    );
  }
}

export default PortalReporting;
