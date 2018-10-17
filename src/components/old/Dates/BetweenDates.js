import React from 'react';
import './Dates.css';
import { SearchBtn } from '../Buttons/Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BetweenDates = ({startDate, endDate, action, maxDate, orientation, noSearchBtn, title}) => {
  let btn = noSearchBtn
    ? null
    : (<div>
      <br />
      <SearchBtn action={action.search} />
    </div>);
  return (
    <div className={orientation ? '' : 'betweenDates'}>
      <div className={orientation ? '' : 'betweenDates-beginDate'}>
        <label>{title}</label>
        <DatePicker
          className='form-control'
          dateFormat='YYYY-MM-DD'
          selected={startDate}
          selectsStart
          endDate={endDate}
          onChange={action.startDateSelect}
          maxDate={maxDate}
        />
      </div>
      {btn}
    </div>
  );
};

export default BetweenDates;
