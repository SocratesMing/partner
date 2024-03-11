import { invoke } from '@tauri-apps/api'
import { Button } from 'antd'
import { useState } from 'react'
// 调用命令
// 在应用窗口中右键，打开开发者工具
// 你会看到控制台上输出了 "Hello, World!"！


function showHello() {
    console.log("ddddd")
    let hello = invoke('greet', { name: 'World' })
        // `invoke` 返回的是一个 Promise
        .then((response) => console.log(response))
    // console.log(hello)


    return (
        <>
            <p>xxxxxxxxxxxxx</p>
        </>
    )
}


function test() {
    console.log("ddddddd")
}

export default function IneractiveRust() {
    const [showParagraph, setShowParagraph] = useState("false");

    const handleButtonClick = () => {
        let hello = invoke('greet', { name: 'World' })
            // `invoke` 返回的是一个 Promise
            .then((response) => { 
                console.log(response);
                setShowParagraph(response)
            return response; })
        console.log("dddd",hello)
        // setShowParagraph(hello);

    };

    return (
        <>
            <p>dddddddddddddd</p>
            <Button type="primary" onClick={handleButtonClick}>点击按钮调用rust</Button>
            <p>{showParagraph}</p>

        </>
    )
}
