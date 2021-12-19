import * as React from 'react';
import Home from '../views/home';
import Mock from '../views/mock';
import MockConfig from '../views/mockConfig';

export interface RouterConfig {
  path: string;
  Element: React.FC;
  children?: Array<RouterConfig>;
}
const routerConfig: Array<RouterConfig> = [
  {
    path: '/',
    Element: Home,
  },
  {
    path: '/mock',
    Element: Mock,
  },
  {
    path: '/mock-config',
    Element: MockConfig,
  },
];

export default routerConfig;
