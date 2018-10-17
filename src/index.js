import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import App from './PortalReporting/Reporting/Reporting';
import App from './PortalReporting/Dumper/index';
// import App from './PortalReporting/Dumpster/index';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
