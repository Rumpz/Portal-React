import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.submit = this.submit.bind(this);
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
  }

  userChange (event) {
    this.setState({username: event.target.value});
  }

  passChange (event) {
    this.setState({password: event.target.value});
  }

  submit () {
    let url = '/login';
    let data = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(url, data).then((res) => {
      window.location = 'https://seat-mobile.herokuapp.com/test';
    }).catch((err) => {
      console.log(err);
    });
  }

  render () {
    return (
      <div className='container'>
        <h2 className='title'>Login</h2>
        <ul>
          <li>
            <label>Username</label>
            <input
              type='text'
              className='form-control'
              onChange={this.userChange}
            />
          </li>
          <li>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              onChange={this.passChange}
            />
          </li>
        </ul>
        <a
          className='btn btn-login'
          onClick={this.submit}>
          Entrar
        </a>
      </div>
    );
  }
}

export default App;
