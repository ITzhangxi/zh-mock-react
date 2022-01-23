import React from 'react';
import styles from './index.less';
import logo from 'src/img/logo.png';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className={styles.content}>
      <img src={logo} className={styles.log} />
      <div className={styles.title}>欢迎使用 ZH-Mock 数据管理平台</div>
    </div>
  );
};
export default Header;
