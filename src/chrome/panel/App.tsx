import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './index.less';

function App() {
  return (
    <div className={styles.app}>
      <Link to="/home">home---</Link> --|--
      <Link to="/mock">mock</Link> --|-- <Link to="/mock-config">mock-config</Link>
      <Outlet />
    </div>
  );
}
export default App;
