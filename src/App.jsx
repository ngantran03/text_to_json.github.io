import { useState } from 'react'

import './App.css'
import InputToJson from './components/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Input to JSON file</h1>
      <InputToJson />
    </>
  )
}

export default App
