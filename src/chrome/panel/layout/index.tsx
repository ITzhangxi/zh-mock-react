import React from 'react';
import Header from './Header';
import { IProps } from 'src/chrome/panel/types/Component';

const Layout: React.FC = ({ children }: IProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
