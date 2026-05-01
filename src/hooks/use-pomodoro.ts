import { useState, useRef, useEffect, useCallback } from 'react'
import { useInterval } from './use-interval'

export interface PomodoroConfig {
  PomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export function usePomodoro(props: PomodoroConfig) {
  const [mainTime, setMainTime] = useState(props.PomodoroTime)
  const [timeCounting, setTimeCouting] = useState(false)
  const [resting, setResting] = useState(false)
  const [working, setWorking] = useState(false)
  const [cyclesQtdMenager, setCyclesManager] = useState(
    new Array(props.cycles - 1).fill(true)
  )
  const [customPomodoroTime, setCustomPomodoroTime] = useState(props.PomodoroTime)
  const [customShortRestTime, setCustomShortRestTime] = useState(props.shortRestTime)

  const [completetedCycles, setCompletedCycles] = useState(0)
  const [fullWorkingTime, setFullWorkingTime] = useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  const lastTick = useRef<number>(Date.now())

  useEffect(() => {
    if (timeCounting) {
      lastTick.current = Date.now()
    }
  }, [timeCounting])

  useInterval(
    () => {
      const now = Date.now()
      const elapsedSeconds = Math.floor((now - lastTick.current) / 1000)

      if (elapsedSeconds > 0) {
        if (mainTime > 0) {
          const actualElapsed = Math.min(elapsedSeconds, mainTime)
          setMainTime(prev => prev - actualElapsed)
          
          if (working) {
            setFullWorkingTime(prev => prev + actualElapsed)
          }
        }
        lastTick.current += elapsedSeconds * 1000
      }
    },
    timeCounting ? 1000 : null
  )

  const configureWork = useCallback(() => {
    setTimeCouting(true)
    setWorking(true)
    setResting(false)
    setMainTime(customPomodoroTime)
    lastTick.current = Date.now()
  }, [customPomodoroTime])

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCouting(true)
      setWorking(false)
      setResting(true)
      lastTick.current = Date.now()

      if (long) {
        setMainTime(props.longRestTime)
      } else {
        setMainTime(customShortRestTime)
      }
    },
    [props.longRestTime, customShortRestTime]
  )

  useEffect(() => {
    if (working) document.body.classList.add("working")
    else document.body.classList.remove("working")

    if (resting) document.body.classList.add("resting")
    else document.body.classList.remove("resting")

    if (mainTime > 0) return

    if (working && cyclesQtdMenager.length > 0) {
      configureRest(false)
      const newCycles = [...cyclesQtdMenager]
      newCycles.pop()
      setCyclesManager(newCycles)
    } else if (working && cyclesQtdMenager.length <= 0) {
      configureRest(true)
      setCyclesManager(new Array(props.cycles - 1).fill(true))
      setCompletedCycles(c => c + 1)
    }

    if (working) setNumberOfPomodoros(n => n + 1)
    if (resting) configureWork()
  }, [
    working,
    resting,
    mainTime,
    configureRest,
    cyclesQtdMenager,
    configureWork,
    numberOfPomodoros,
    props.cycles,
    completetedCycles
  ])

  return {
    mainTime,
    setMainTime,
    timeCounting,
    setTimeCouting,
    resting,
    working,
    completetedCycles,
    fullWorkingTime,
    configureWork,
    configureRest,
    customPomodoroTime,
    setCustomPomodoroTime,
    customShortRestTime,
    setCustomShortRestTime,
    lastTick
  }
}
