import "./index.css"
import { PomodoroTimer } from "./components/Pomodoro/PomodoroTimer"

function App() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center pt-12 pb-10 px-4">
      <PomodoroTimer
        PomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </main>
  )
}
export default App
