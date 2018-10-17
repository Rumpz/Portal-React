import React, { Component } from 'react';
import './App.css';
import List from './List';
import AddItem from './AddItem';

const TabComponent = {
  'Lista': <List />,
  'AddItem': <AddItem />
};
const tabs = ['Lista', 'AddItem'];

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'Lista'
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab (tab) {
    this.setState({selectedTab: tab});
  }

  render () {
    return (
      <div className='container'>
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

export default App;
