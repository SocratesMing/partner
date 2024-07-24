import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Flex, Menu, Button } from 'antd';
import ShowData from './datashow';
import { open } from '@tauri-apps/api/dialog';

let initialNavi = [{
  label: 'csv file',
  key: 'mail',
  children: [
    {
      key: 12,
      label: 'Option 13',
    },
  ]
},
{
  label: 'parquet file',
  key: 'app',
  children: []
},]


const initialTabs = [
  // {
  //   label: 'Tab 1',
  //   children: <ShowTables />,
  //   key: '1',
  // },
];
const Navi = () => {

  const [current, setCurrent] = useState(initialNavi);
  const [tabs, setTabs] = useState(initialTabs);
  const [key, setKey] = useState(1);
  const [used, setUsed] = useState([]);

  // 打开文件读取对话框
  async function selectFile() {
    try {
      // 弹出文件选择对话框
      const selected = await open({
        multiple: false, // 不允许多选
        filters: [
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      // 检查用户是否选择了文件
      if (selected) {
        console.log(`Selected file: ${selected}`);
        let file_name = selected.split('\\').pop()
        let file = file_name.split(".")[0]
        console.log(`file name: ${file_name}`);
        console.log(`file: ${file}`);


        setCurrent(current.map((e, i) => {
          if (e.label.includes("csv") && file_name.endsWith("csv")) {
            setKey(i + 1)

            if (used.includes(file)) {
              console.log("已经选择了文件", selected)
            } else {
              setUsed([...used, file])
              e["children"] = [...e["children"], {
                key: key,
                label: file,
              },]
            }

          } else if (e.label.includes("parquet") && file_name.endsWith("parquet")) {
            setKey(i + 1)

            if (used.includes(file)) {
              console.log("已经选择了文件", selected)
            } else {
              setUsed([...used, file])
              e["children"] = [...e["children"], {
                key: key,
                label: file,
              },]
            }
          }
          return e;
        }))


      } else {
        console.log('No file selected');
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  }




  return (
    <>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={selectFile}>选择文件</Button>
      </Flex>

      <Flex horizontal>
        <Menu
          mode="inline"
          // openKeys={openKeys}
          // onOpenChange={onOpenChange}
          style={{
            width: 156,
          }}
          items={current}
        />
      </Flex>

    </>

  );
};

export default Navi;