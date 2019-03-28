import React from 'react';
import ReactDOM from 'react-dom';
import Carregamentos from './index';

// Testing App main page
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Carregamentos />, div);
  ReactDOM.unmountComponentAtNode(div);
});
