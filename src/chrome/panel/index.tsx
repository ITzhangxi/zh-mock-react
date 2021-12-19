import './utils/reload';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'antd/dist/antd.less';
import App from './App';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
