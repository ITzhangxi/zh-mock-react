import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import routerConfig, { RouterConfig } from './router';
import Home from './views/home';
import styles from './index.less';

function App() {
  return (
    <>
      <div className={styles.app}>
        <Routes>
          {routerConfig.map(({ path, Element }: RouterConfig) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          <Route path="*" element={<Navigate to="/mock" />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
