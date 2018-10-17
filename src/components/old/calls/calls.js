import React, { Component } from 'react';
import './Calls.css';
import axios from 'axios'
import Search from './Search';

class OtInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (event) {
    let value = event.target.value;

    this.setState( () => {
      return { ot: value }      
    });
  }

  handleSubmit (event) {
    event.preventDefault();

    this.props.onSubmit(this.state.ot, this.props.id);
  }
  render () {
    return (
      <form className='colum' onSubmit= { this.handleSubmit}>
        <label className='header' 
      </form>
    );
  }
}
class Calls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ot: '',
      nClient: ''
    };
    this.getOT = this.getOT.bind(this);
  }

  getOT (ot) {
    let ot = this.ot;
    let nClient = this.nClient;
    axios
  }
  getNclient ()  {

  }
  render () {
    return (
      <div className="container-fluid main">
        <br>
        <h5 class="text-center">Registo de chamadas</h5>
        <br>   
        <SearchOT onClick={getOT} />
        <SearchNclient onClick={getNclient} />
      </div>
    )
  }r
}

export default App;
