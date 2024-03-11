import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navi from './component/navicate'
import Tools from './component/tools'
import ShowData from './component/datashow'
import IneractiveRust from './component/rust'
import GetListFromRust from './component/rust_list'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tools />
      <Navi />
      <IneractiveRust />
      <GetListFromRust />
      
    </>
  )
}

export default App
