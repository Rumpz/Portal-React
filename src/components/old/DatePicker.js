import React, { Component } from 'react';
// import './DatePicker.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/pt';

class DatePicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openDatePicker = this.openDatePicker.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
  }

  openDatePicker () {
    this.setState(() => {
      return {
        isOpen: !this.state.isOpen
      };
    });
  }

  selectedDate (date) {
    this.openDatePicker();
    this.props.selectedDate(date);
  }

  render () {
    if (this.state.isOpen) {
      return (
        <DayPicker
          localeUtils={LocaleUtils}
          locale='pt'
          onDayClick={this.selectedDate}
        />
      );
    } else {
      return (
        <input
          className='form-control'
          name={this.props.name}
          defaultValue={this.props.value}
          onClick={this.openDatePicker}
        />
      );
    }
  }
}

export default DatePicker;
