import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';

// Testing App main page
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
