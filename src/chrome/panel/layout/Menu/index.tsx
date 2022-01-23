import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { Menu as AMenu } from 'antd';
import routerConfig, { IDefineRouteObject } from 'src/chrome/panel/router';
import { NavigateFunction, useNavigate, useLocation, generatePath } from 'react-router-dom';

interface IMenuProps {
  className?: string;
}

function renderMenu(routers: IDefineRouteObject[]) {
  return (
    <>
      {routers.map((item: IDefineRouteObject) => {
        if (item.meta.hidden) return null;
        if (Array.isArray(item.children)) {
          return (
            <AMenu.SubMenu key={item.path} title={item.meta.name + ''}>
              {renderMenu(item.children)}
            </AMenu.SubMenu>
          );
        } else {
          return <AMenu.Item key={item.path}>{item.meta.name}</AMenu.Item>;
        }
      })}
    </>
  );
}

export interface MenuInfo {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

function Menu({ className }: IMenuProps) {
  const native: NavigateFunction = useNavigate();

  const handelMenuClick = useCallback(
    ({ key }: MenuInfo) => {
      native(key);
    },
    [native]
  );

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([location.pathname]);
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <div className={`${className}`}>
      <AMenu
        selectedKeys={selectedKeys}
        mode="inline"
        className={styles.menu}
        onClick={handelMenuClick}>
        {renderMenu(routerConfig[0].children)}
      </AMenu>
    </div>
  );
}
export default React.memo(Menu);
