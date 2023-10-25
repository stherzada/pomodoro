import React from "react"
import { useInterval } from "../../hooks/use-interval"
import { Button } from "../Buttton/Button"
import { Timer } from "./Timer"

interface Props {
  PomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.PomodoroTime)
  const [timeCounting, setTimeCouting] = React.useState(false)
  // const [working, setWorking] = React.useState(false);

  // //useEffect(()=>{
  // if(working) document.body.classList.add('working')
  // }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1)
    },
    timeCounting ? 1000 : null
  )

  const configureWork = () => {
    setTimeCouting(true)
    // setWorking(true);
  }

  return (
    <>
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Start" onClick={() => configureWork()}></Button>
        <Button text="Reset" onClick={() => console.log("testando")}></Button>
        <Button
          text={timeCounting ? "Pause" : "Play"}
          onClick={() => setTimeCouting(!timeCounting)}
        ></Button>
      </div>

      <div className="details">
        <p>Vivamus congue nisl vel enim volutpat, quis maximus sem cursus. </p>
        <p>Vivamus congue nisl vel enim volutpat, quis maximus sem cursus.</p>
        <p>Vivamus congue nisl vel enim volutpat, quis maximus sem cursus.</p>
      </div>
    </>
  )
}
