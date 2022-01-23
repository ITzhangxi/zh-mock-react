import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Layout from './layout';
import styles from './index.less';

function App() {
  return (
    <div className={styles.app}>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
export default App;
