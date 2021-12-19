import './utils/reload';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, useRoutes } from 'react-router-dom';
import routerConfig from './router';
import 'antd/dist/antd.less';

function Index() {
  const element = useRoutes(routerConfig);
  return element;
}

ReactDOM.render(
  <HashRouter>
    <Index />
  </HashRouter>,
  document.getElementById('root')
);
