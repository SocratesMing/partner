import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Flex, Menu } from 'antd';
import ShowData from './datashow';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('CSV文件', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
  ]),
  getItem('Parquet文件', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const Navi = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Flex horizontal>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
          }}
          items={items}
        />
        <ShowData />
      </Flex>

    </>

  );
};
export default Navi;