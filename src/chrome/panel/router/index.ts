import * as React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import Home from '../views/home';
import Mock from '../views/mock';
import MockConfig from '../views/mockConfig';
import App from '../App';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(App),
    children: [
      {
        path: '/home',
        element: React.createElement(Home),
      },
      {
        path: '/mock',
        element: React.createElement(Mock),
      },
      {
        path: '/mock-config',
        element: React.createElement(MockConfig),
      },
      {
        path: '/',
        element: React.createElement(Navigate, { to: '/mock', replace: true }),
      },
    ],
  },
  {
    path: '*',
    element: React.createElement(Navigate, { to: '/mock', replace: true }),
  },
];

export default routerConfig;
