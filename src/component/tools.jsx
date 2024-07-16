import React from 'react';
import { Button, Flex} from 'antd';

// 工具栏
const Tools = () => (
    <>
        <Flex gap="small" wrap="wrap">
            <Button type="primary">打开文件</Button>
            <FileSelector />
        </Flex>
    </>
);
export default Tools;