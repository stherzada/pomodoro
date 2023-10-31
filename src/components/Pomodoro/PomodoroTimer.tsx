import React, { useEffect, useCallback } from "react"
import { useInterval } from "../../hooks/use-interval"
import { Button } from "../Buttton/Button"
import { Timer } from "./Timer"
import { secondsToTime } from "../../utils/seconds-to-time"
import "./Pomodoro.css"
import "../../index.css"

interface Props {
  PomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.PomodoroTime)
  const [timeCounting, setTimeCouting] = React.useState(false)
  const [resting, setResting] = React.useState(false)
  const [working, setWorking] = React.useState(false)
  const [cyclesQtdMenager, setCyclesManager] = React.useState(
    new Array(props.cycles - 1).fill(true)
  )
  const [userInputTime, setUserInputTime] = React.useState<number | null>(null)
  const [customPomodoroTime, setCustomPomodoroTime] = React.useState(
    props.PomodoroTime
  )

  const [completetedCycles, setCompletedCycles] = React.useState(0)
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0)

  useInterval(
    () => {
      if (mainTime > 0) {
        setMainTime(mainTime - 1)
      }
      if (working && mainTime > 0) {
        setFullWorkingTime(fullWorkingTime + 1)
      }
    },
    timeCounting ? 1000 : null
  )

  const configureWork = useCallback(() => {
    setTimeCouting(true)
    setWorking(true)
    setResting(false)
    setMainTime(customPomodoroTime)
  }, [setTimeCouting, setWorking, setResting, setMainTime, customPomodoroTime])

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCouting(true)
      setWorking(false)
      setResting(true)

      if (long) {
        setMainTime(props.longRestTime)
      } else {
        setMainTime(props.shortRestTime)
      }
    },
    [
      setTimeCouting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime
    ]
  )

  useEffect(() => {
    if (working) document.body.classList.add("working")
    if (resting) document.body.classList.remove("working")

    if (mainTime > 0) return

    if (working && cyclesQtdMenager.length > 0) {
      configureRest(false)
      cyclesQtdMenager.pop()
    } else if (working && cyclesQtdMenager.length <= 0) {
      configureRest(true)
      setCyclesManager(new Array(props.cycles - 1).fill(true))
      setCompletedCycles(completetedCycles + 1)
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
    if (resting) configureWork()
  }, [
    working,
    resting,
    mainTime,
    configureRest,
    setCyclesManager,
    cyclesQtdMenager,
    configureWork,
    numberOfPomodoros,
    props.cycles,
    completetedCycles
  ])

  return (
    <>
      <h2>You are:</h2>
      <h2 id="status">{working ? "Working" : "Resting"}</h2>

      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Start" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? "hidden" : ""}
          text={timeCounting ? "Pause" : "Play"}
          onClick={() => setTimeCouting(!timeCounting)}
        ></Button>

        <input
          className="custom-input"
          type="number"
          min={0}
          max={3600}
          placeholder="Time in Seconds"
          onChange={(e) => {
            const inputValue = parseInt(e.target.value, 10)
            if (inputValue > 3600) {
              setUserInputTime(3600)
            } else {
              setUserInputTime(Number(e.target.value))
            }
          }}
        />

        <Button
          text="Set Custom Time"
          onClick={() => {
            setMainTime(userInputTime || props.PomodoroTime)
            setCustomPomodoroTime(userInputTime || props.PomodoroTime)
          }}
        />
      </div>

      <div className="details">
        <p>
          Completed cycles: <strong>{completetedCycles}</strong>
        </p>
        <p>
          Worked hours: <strong>{secondsToTime(fullWorkingTime)}</strong>
        </p>
        <p>
          Completed Pomodoros:<strong>{numberOfPomodoros}</strong>
        </p>
      </div>
    </>
  )
}
