import React from 'react';
import Header from './Header';
import { IProps } from 'src/chrome/panel/types/Component';
import Menu from './Menu';
import styles from './index.less';

const Layout: React.FC = ({ children }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <Menu className={styles.menu} />
        <div className={styles.views}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
