import { invoke } from '@tauri-apps/api'
import { Button } from 'antd'
import { useState } from 'react'
import ShowTables from './showtables';
export default function GetListFromRust() {
    const [showParagraph, setShowParagraph] = useState([]);
    const [data, setData] = useState('');

    const parentToChild = () => {
        setData("This is data from Parent Component to the Child Component.");
    }
    
    const handleButtonClick = () => {
        let hello = invoke('students')
            // `invoke` 返回的是一个 Promise
            .then((response) => {
                console.log(response);
                let ddd = JSON.parse(response)
                setShowParagraph(ddd);
                console.log("返回了数据");
                console.log(ddd);
                return <ShowTables data={response} />;
            })

        // setShowParagraph(hello);

    };

    return (
        <>
            <Button type="primary" onClick={handleButtonClick}>点击按钮调用rust</Button>
            <ShowTables data={showParagraph}/>

        </>
    )
}