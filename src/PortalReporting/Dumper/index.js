import React, { Component } from 'react';
import Select from './js/Select';
import Navbar from '../../components/NavBar/NavBar';

export default class Dumper extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <div>
        <Navbar />
        <Select />
      </div>
    );
  }
}
