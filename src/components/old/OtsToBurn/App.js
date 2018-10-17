import React, { Component } from 'react';
import './App.css';
import Active from './Active';
import Cleaned from './Cleaned';
import History from './History';
import Navbar from '../Navbar/Navbar.js';

const TabComponent = {
  'Activas': <Active />,
  'Limpas': <Cleaned />,
  'Histórico': <History />
};
const tabs = ['Activas', 'Limpas', 'Histórico'];

class OtsToBurn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'Activas'
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab (tab) {
    this.setState({selectedTab: tab});
  }

  render () {
    return (
      <div className='container-fluid'>
        <Navbar />
        <Tabs
          selectedTab={this.state.selectedTab}
          clickAction={this.selectTab}
        />
        {TabComponent[this.state.selectedTab]}
      </div>
    );
  }
}

function Tabs (props) {
  return (
    <ul className='tabs'>
      {tabs.map((tab) => {
        return (
          <li
            onClick={props.clickAction.bind(null, tab)}
            style={tab === props.selectedTab ? {color: '#d0021b'} : null}
            key={tab}>
            {tab}
          </li>
        );
      })}
    </ul>
  );
}

export default OtsToBurn;
