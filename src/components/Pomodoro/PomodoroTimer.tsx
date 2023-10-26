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

  const [completetedCycles, setCompletedCycles] = React.useState(0)
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0)

  useInterval(
    () => {
      setMainTime(mainTime - 1)
      if (working) setFullWorkingTime(fullWorkingTime + 1)
    },
    timeCounting ? 1000 : null
  )

  const configureWork = useCallback(() => {
    setTimeCouting(true)
    setWorking(true)
    setResting(false)
    setMainTime(props.PomodoroTime)
  }, [setTimeCouting, setWorking, setResting, setMainTime, props.PomodoroTime])

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
      </div>

      <div className="details">
        <p>
          Ciclos concluídos: <strong>{completetedCycles}</strong>
        </p>
        <p>
          Horas trabalhadas: <strong>{secondsToTime(fullWorkingTime)}</strong>
        </p>
        <p>
          Pomodoros concluídos: <strong>{numberOfPomodoros}</strong>
        </p>
      </div>
    </>
  )
}
