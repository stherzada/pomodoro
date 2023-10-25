import React, { useEffect } from "react"
import { useInterval } from "../../hooks/use-interval"
import { Button } from "../Buttton/Button"
import { Timer } from "./Timer"
import { secondsToTime } from "../../utils/seconds-to-time"

interface Props {
  PomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.PomodoroTime);
  const [timeCounting, setTimeCouting] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [cyclesQtdMenager, setCyclesManager] = React.useState(new Array(props.cycles - 1).fill(true));

  const[completetedCycles, setCompletedCycles] =  React.useState(0);
  const[fullWorkingTime, setFullWorkingTime] =  React.useState(0);
  const[numberOfPomodoros, setNumberOfPomodoros] =  React.useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1)
    },
    timeCounting ? 1000 : null
  )

  const configureWork = () => {
    setTimeCouting(true)
    setWorking(true);
    setResting(true);
    setMainTime(props.PomodoroTime)}

  const configureRest = (long: boolean) => {
    setTimeCouting(true)
    setWorking(false);
    setResting(true);

    if(long){
      setMainTime(props.longRestTime)
    } else {
      setMainTime(props.shortRestTime)
    }
  }

  useEffect(()=>{
    if(working) document.body.classList.add('working')
    if(resting) document.body.classList.remove('working')

    if(mainTime > 0) return;

    if(working && cyclesQtdMenager.length > 0){
      configureRest(false);
      cyclesQtdMenager.pop();
    } else if(working && cyclesQtdMenager.length <= 0){
      configureRest(false);
      setCyclesManager(new Array(props.cycles -1).fill(true));
      setCompletedCycles(completetedCycles + 1);
    }

    if(working) setNumberOfPomodoros(numberOfPomodoros + 1)
    if(resting) configureWork()
  }, [working, resting, mainTime, configureRest, setCyclesManager, cyclesQtdMenager, configureWork, numberOfPomodoros, props.cycles, completetedCycles]);

  return (
    <>
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Start" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
        className={!working && !resting ? 'hidden' : '' }
          text={timeCounting ? "Pause" : "Play"}
          onClick={() => setTimeCouting(!timeCounting)}
        ></Button>
      </div>

      <div className="details">
        <p>Ciclos concluídos: {completetedCycles} </p>
        <p>Horas trablhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </>
  )
}
