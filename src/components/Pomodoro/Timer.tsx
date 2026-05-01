import { secondsToMinutes } from "../../utils/seconds-to-minutes"
import "./Pomodoro.css"

interface Props {
  mainTime: number
}

export function Timer(props: Props) {
  return (
    <>
      <div className="timer">{secondsToMinutes(props.mainTime)}</div>
    </>
  )
}
