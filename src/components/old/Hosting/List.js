import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      items: [],
      serials: [],
      nums: [],
      ot: '',
      loaded: false
    };
    this.otSearch = this.otSearch.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit (values) {
    let url = `/list`;
    axios.post(url, values).then((res) => {
      this.otSearch();
    }).catch((err) => {
      console.log(err);
    });
  }

  otSearch () {
    let url = `/allOt/${this.state.ot}`;
    axios.get(url).then((res) => {
      this.setState({
        nums: res.data.nums,
        ot: res.data.ot,
        serials: res.data.serials,
        items: res.data.items,
        loaded: true
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  saveInput (event) {
    this.setState({ot: event.target.value});
  }

  render () {
    return !this.state.loaded
    ? (
      <div className='container'>
        <h1>Lista</h1>
        <label>Procurar por OT</label>
        <div className='searchOT'>
          <input onChange={this.saveInput} className='form-control search' />
          <a onClick={this.otSearch} className='addMac-btns search'>x</a>
        </div>
      </div>
    )
    : (
      <div className='container'>
        <h1>Lista</h1>
        <label>Procurar por OT</label>
        <div className='searchOT'>
          <input onChange={this.saveInput} className='form-control search' />
          <a onClick={this.otSearch} className='addMac-btns search'>x</a>
        </div>
        {this.state.nums.map((num) => {
          return (
            <AddMac
              key={num.Num}
              ot={num.OT}
              num={num.Num}
              serials={this.state.serials}
              items={this.state.items}
              action={this.submit}
            />
          );
        })}
      </div>
    );
  }
}

export default List;

class AddMac extends Component {
  constructor (props) {
    super(props);
    console.log('here', props);
    this.state = {
      ot: props.ot,
      num: props.num,
      serial: '',
      mac: '',
      item: '',
      serialList: props.serials,
      itemList: props.items,
      submit: props.action
    };
    this.itemSelected = this.itemSelected.bind(this);
    this.serialSelected = this.serialSelected.bind(this);
    this.macSelected = this.macSelected.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps (props) {
    this.setState({
      ot: props.ot,
      num: props.num,
      serial: '',
      mac: '',
      item: '',
      serialList: props.serials,
      itemList: props.items,
      submit: props.action
    });
  }

  itemSelected (event) {
    this.setState({item: event.target.value});
  }

  serialSelected (event) {
    this.setState({serial: event.target.value});
  }

  macSelected (event) {
    this.setState({mac: event.target.value});
  }

  submit () {
    let values = {
      ot: this.state.ot,
      num: this.state.num,
      serial: this.state.serial,
      mac: this.state.mac,
      item: this.state.item
    };

    this.state.submit(values);
  }
  render () {
    return (
      <div className='addMac'>
        <ul>
          <li>
            <label>Equipamento</label>
            <select className='form-control' onChange={this.itemSelected}>
              <option />
              {this.state.itemList.map((item) => {
                return <option key={this.state.num + '_' + item.item}>{item.item}</option>;
              })}
            </select>
          </li>
          <li>
            <label>Numeração</label>
            <p className='form-control'>{this.state.num}</p>
          </li>
          <li>
            <label>Serials</label>
            <select className='form-control' onChange={this.serialSelected}>
              <option />
              {this.state.serialList.map((serial) => {
                return <option key={this.state.num + '_' + serial.serial}>{serial.serial}</option>;
              })}
            </select>
          </li>
          <li>
            <label>Mac Address</label>
            <input onChange={this.macSelected} className='form-control' />
          </li>
        </ul>
        <a onClick={this.submit} className='addMac-btns'>Cenas</a>
      </div>
    );
  }
}
