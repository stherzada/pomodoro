import { useState } from 'react'
import './App.css'
import { PomodoroTimer } from './components/PomodoroTimer'

function App(): JSX.Element {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>DEIXA EU CODARRRRRRRRRRRRRRRRR</h1>
        <PomodoroTimer  defaultPomodoroTime={1500} />
      </div>
      
    </>
  )
}

export default App
