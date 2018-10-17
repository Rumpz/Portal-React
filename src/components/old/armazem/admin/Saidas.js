import React, { Component } from 'react';
import './Admin.css';

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
  return body[props];
}

function Options (props) {
  return (
    <div>
      <ArmazemSelect/>
      <OutrosSelect/>
      <Submit/>
    </div>
  );
}

class ArmazemSelect extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedArmazem
    }
  }
}

class Saidas extends Component {
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
        <h5>Saida de Items</h5>
        <Options />
        <Table />
      </div>
    );
  }
}

export default App;
