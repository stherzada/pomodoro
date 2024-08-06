import "./index.css"
import { PomodoroTimer } from "./components/Pomodoro/PomodoroTimer"

function App(): JSX.Element {
  return (
    <>
      <div className="flex flex-col text-center transition-all duration-500 ease-out">
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
