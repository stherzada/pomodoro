import "./App.css"
import { PomodoroTimer } from "./components/Pomodoro/PomodoroTimer"

function App(): JSX.Element {
  return (
    <>
      <div className="container">
        <h1>Pomodoro</h1>
        <PomodoroTimer
          PomodoroTime={1500}
          shortRestTime={300}
          longRestTime={900}
          cycles={4}
        />
      </div>
    </>
  )
}

export default App
