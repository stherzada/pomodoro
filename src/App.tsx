import "./App.css"
import { PomodoroTimer } from "./components/Pomodoro/PomodoroTimer"

function App(): JSX.Element {
  return (
    <>
      <div className="container">
        <h1>Pomodoro</h1>
        <PomodoroTimer
          PomodoroTime={3}
          shortRestTime={2}
          longRestTime={500}
          cycles={4}
        />
      </div>
    </>
  )
}

export default App
