import React, {Component} from 'react';
import moment from 'moment';
import './DatePicker.css';
import { PreviousBtn, NextBtn } from '../Buttons/Buttons.js';
// import Err from '../components/Err';
import months from './months.json';

export default class DatePicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      year: props.date.year(),
      month: props.date.month(),
      action: props.action
    };
  }

  componentWillReceiveProps (props) {
    this.setState({
      year: props.date.year(),
      month: props.date.month(),
      action: props.action
    });
  }

  newYear (value) {
    let {month, action} = this.state;
    let currentDate = moment().year(value).month(month).date(1);
    action(currentDate);
  }

  newMonth (value) {
    let {year, action} = this.state;
    let currentDate = moment().year(year).month(value).date(1);
    action(currentDate);
  }

  prevMonth () {
    let {year, month, action} = this.state;
    action(
      month === 0
      ? moment().year(year - 1).month(11).date(1)
      : moment().year(year).month(month - 1).date(1)
    );
  }

  nextMonth () {
    let {year, month, action} = this.state;
    action(
      month === 11
      ? moment().year(year + 1).month(0).date(1)
      : moment().year(year).month(month + 1).date(1)
    );
  }

  render () {
    let {year, month} = this.state;

    return (
      <div>
        <ul className='flex-list'>
          <li>
            <Year
              action={this.newYear.bind(this)}
              value={year}
            />
          </li>
        </ul>
        <ul className='flex-list'>
          <li>
            <PreviousBtn action={this.prevMonth.bind(this)} />
          </li>
          <li>
            <Month
              action={this.newMonth.bind(this)}
              value={month}
              style={{weigth: '100%'}}
            />
          </li>
          <li>
            <NextBtn action={this.nextMonth.bind(this)} />
          </li>
        </ul>
      </div>
    );
  }
}

class Year extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value,
      action: props.action,
      err: false
    };
  }

  componentWillReceiveProps (props) {
    this.setState({
      value: props.value
    });
  }

  changeValue (e) {
    let { err } = this.state;
    let value = e.target.value;

    value < 2017 || value > 2200
    ? err = 'O ano inserido têm de estar entre 2017 e 2200'
    : err = false;

    this.setState({value: value, err: err});

    if (!err) this.state.action(value);
  }

  render () {
    let {value, err} = this.state;
    return (
      <div>
        <Err msg={err} />
        <input
          className='form-control'
          type='number'
          onChange={this.changeValue.bind(this)}
          value={value}
        />
      </div>
    );
  }
}

class Month extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: +props.value,
      action: props.action
    };
  }
  changeMonth (e) {
    this.setState({value: e.target.value});
    this.state.action(e.target.value);
  }

  componentWillReceiveProps (props) {
    this.setState({
      value: +props.value
    });
  }

  render () {
    let options = months.map((month, i) => {
      return <option value={i} key={month + i}>{month}</option>;
    });

    return (
      <select
        className='form-control'
        value={this.state.value}
        onChange={this.changeMonth.bind(this)}
      >
        {options}
      </select>
    );
  }
}

const Err = props => {
  let style = {textAlignment: 'center', display: 'block', color: '#e3e3f3'};
  return props.msg ? <label style={style} >{props.msg}</label> : null;
};
