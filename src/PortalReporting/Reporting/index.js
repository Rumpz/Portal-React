import React, { Component } from 'react';
import { getReport, fetchReports } from './API';

// Static components imports
import ReportsList from './js/ReportsList/ReportsList';

import NavBar from '../../components/NavBar/NavBar';

// CSS
import './css/Reporting.css';

class PortalReporting extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Centro de Conhecimento',
      tableData: [],
      err: ''
    };
  }

  componentWillMount () {
    fetchReports().then(Response => {
      this.setState({tableData: Response.data});
    }).catch(err => {
      return this.setState({err: `${err}`});
    });
  }

  render () {
    return (
      <div className='PortalReport'>
        <NavBar />
        <h1><strong>{this.state.title}</strong></h1>
        <div className='table-wrapper'>
          {this.state.tableData.length > 0
            ? <ReportsList
              data={this.state.tableData}
            />
            : null}
        </div>
      </div>
    );
  }
}

export default PortalReporting;
