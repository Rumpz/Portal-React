import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class AddItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      list: false
    };
    this.submitItem = this.submitItem.bind(this);
  }
  submitItem (data) {
    let url = `https://seat-mobile.herokuapp.com/test/numAndSerial`;
    axios.post(url, data).then((res) => {
      console.log('added');
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount () {
    let url = `https://seat-mobile.herokuapp.com/test/list`;
    axios.get(url).then((res) => {
      console.log(res.data);
      this.setState({list: res.data});
    }).catch((err) => {
      console.log(err);
    });
  }

  addUser (values) {
    let url = `https://seat-mobile.herokuapp.com/API/user`;
    axios.post(url, values).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  render () {
    return (

      <div className='container'>
        <h1>Adicionar Items</h1>
        <User click={this.addUser} />
        {this.state.list
          ? <Listings list={this.state.list} />
          : <div />
        }
        <Input
          click={this.submitItem}
        />
      </div>
    );
  }
}
export default AddItem;

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ot: '',
      serials: '',
      nums: '',
      click: props.click
    };

    this.OT = this.OT.bind(this);
    this.serials = this.serials.bind(this);
    this.nums = this.nums.bind(this);
    this.submit = this.submit.bind(this);
  }

  OT (e) {
    this.setState({ot: e.target.value});
  }

  serials (e) {
    this.setState({serials: e.target.value});
  }

  nums (e) {
    this.setState({nums: e.target.value});
  }

  submit () {
    let values = {
      ot: this.state.ot,
      serials: this.state.serials.split('\n'),
      nums: this.state.nums.split('\n')
    };
    this.state.click(values);
  }

  render () {
    return (
      <div className='toAdd'>
        <ul>
          <li>
            <label>OT</label>
            <input
              className='form-control'
              onChange={this.OT}
            />
          </li>
          <li>
            <label>Serials</label>
            <textarea
              className='form-control'
              rows='4'
              onChange={this.serials}
            />
          </li>
          <li>
            <label>Num</label>
            <textarea
              className='form-control'
              rows='6'
              onChange={this.nums}
            />
          </li>
        </ul>
        <a
          className='addMac-btns'
          onClick={this.submit}>
          Adicionar
        </a>
      </div>
    );
  }
}

function Listings (props) {
  return (
    <div className='listings'>
      <ul>
        {props.list.map((item) => {
          return (
            <li key={'list' + item._id}>
              <label>{item.OT}</label>
              <label>{item.item}</label>
              <label>{item.num}</label>
              <label>{item.serial}</label>
              <label>{item.mac}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      provider: '',
      phone: '',
      group: '',
      click: props.click
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.providerChange = this.providerChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.groupChange = this.groupChange.bind(this);
  }

  usernameChange (e) {
    this.setState({username: e.target.value});
  }

  firstNameChange (e) {
    this.setState({firstName: e.target.value});
  }

  lastNameChange (e) {
    this.setState({lastName: e.target.value});
  }

  providerChange (e) {
    this.setState({provider: e.target.value});
  }

  phoneChange (e) {
    this.setState({phone: e.target.value});
  }

  groupChange (e) {
    this.setState({group: e.target.value});
  }

  render () {
    return (
      <div className='userInsert'>
        <ul>
          <li>
            <label>Username</label>
            <input type='text' onChange={this.usernameChange} />
          </li>
          <li>
            <label>Nome</label>
            <input type='text' onChange={this.firstNameChange} />
          </li>
          <li>
            <label>Apelido</label>
            <input type='text' onChange={this.lastNameChange} />
          </li>
          <li>
            <label>Prestador</label>
            <input type='text' onChange={this.providerChange} />
          </li>
          <li>
            <label>Telemovel</label>
            <input type='text' onChange={this.phoneChange} />
          </li>
          <li>
            <label>Groupo</label>
            <input type='text' onChange={this.groupChange} />
          </li>
        </ul>
        <a onClick={this.state.click.bind(null, this.state)}>Submeter</a>
      </div>
    );
  }
}
