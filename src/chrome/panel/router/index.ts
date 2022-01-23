import * as React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import Home from '../views/home';
import Mock from '../views/mock';
import MockConfig from '../views/mockConfig';
import App from '../App';

export interface IRouteMeta {
  hidden?: boolean; // 决定是否在菜单上显示，这里默认展示
  name?: string; // 路由的名称
  icon?: string; // 菜单图标
}
export interface IDefineRouteObject extends RouteObject {
  meta: IRouteMeta;
  children?: IDefineRouteObject[];
}

const routerConfig: IDefineRouteObject[] = [
  {
    path: '/',
    meta: {
      name: 'MOCK',
    },
    element: React.createElement(App),
    children: [
      {
        path: '/home',
        meta: {
          name: '主页',
        },
        element: React.createElement(Home),
      },
      {
        path: '/mock',
        meta: {
          name: 'Mock管理',
        },
        element: React.createElement(Mock),
      },
      {
        path: '/mock-config',
        meta: {
          name: 'Mock配置',
        },
        element: React.createElement(MockConfig),
      },
      {
        path: '/',
        meta: {
          hidden: true,
        },
        element: React.createElement(Navigate, { to: '/mock', replace: true }),
      },
    ],
  },
];

export default routerConfig;
