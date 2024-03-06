import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navi from './component/navicate'
import Tools from './component/tools'
import ShowData from './component/datashow'
import MyComponent from './component/test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tools />
      <Navi />
      <ShowData />
      <MyComponent />
    </>
  )
}

export default App
