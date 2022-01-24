import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { Table, Space } from 'antd';
import Search from './search';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_text, record) => <Space size="middle">{record.name}</Space>,
  },
];

const data = new Array(20).fill(1).map((_item, index) => {
  return {
    key: index,
    name: `John Brown ${index}`,
    age: index,
    address: 'New York No. 1 Lake Park',
  };
});

const Mock = () => {
  const [tableY, setTableY] = useState(0);
  const tableWrapper = useRef(null);
  const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    if (entries.length) {
      const entry: ResizeObserverEntry = entries[0];
      const cr = entry.contentRect;
      setTableY(cr.height - 103);
    }
  });

  useEffect(() => {
    if (tableWrapper.current) {
      ro.unobserve(tableWrapper.current);
      ro.observe(tableWrapper.current);
    }
  }, [ro]);
  return (
    <>
      <Search />
      <div ref={tableWrapper} className={`box-wrapper ${styles.tableWrapper}`}>
        <Table columns={columns} dataSource={data} scroll={{ y: tableY }} />
      </div>
    </>
  );
};
export default Mock;
