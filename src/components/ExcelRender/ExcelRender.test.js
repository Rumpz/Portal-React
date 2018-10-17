import React from 'react';
import ReactDOM from 'react-dom';
import ExcelReader from '../../containers/ExcelRender/ExcelRender';

// Testing App main page
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExcelReader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
