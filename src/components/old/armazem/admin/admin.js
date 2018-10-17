import React, { Component } from 'react';
import './Admin.css';
import axios from 'axios';
import Saidas from './Saidas';
import Consumos from './Consumos';
const getUserRoute = 'http://wdt19167:8080/user/find/5';

function Tab (props) {
  let tabs = ['Saidas', 'Consumos'];
  return (
    <ul className='tabs'>
      {tabs.map((tab) => {
        return (
          <li
            style={tab === props.selectedTab ? { color: '#d0021b' } : null}
            onClick={props.updateTab.bind(null, tab)}
            key={tab}>
            {tab}
          </li>
        );
      })}
    </ul>
  );
}

function TabBody (props) {
  let body = {
    saidas: <Saidas />,
    consumos: <Consumos />
  };
  return body[props.selectedTab];
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'saidas'
    };
    this.updateTab = this.updateTab.bind(this);
  }

  updateTab (tab) {
    this.setState(() => {
      return {
        selectedTab: tab
      };
    });
  }

  componentDidMount () {
    this.updateTab(this.state.selectedTab);
  }

  render () {
    return (
      <div className='container-fluid'>
        <h1>Armazem Admin</h1>
        <div>
          <Tab
            selectedTab={this.state.selectedTab}
            onSelect={this.updateTab}
          />
          <TabBody
            selectedTab={this.state.selectedTab}
          />
        </div>
      </div>
    );
  }
}

export default App;
