import { secondsToTime } from '../../utils/seconds-to-time';
import './Pomodoro.css'

interface Props{
 mainTime: number;
}

export function Timer(props: Props): JSX.Element{
    return <>
  <div className="timer">{secondsToTime(props.mainTime)}</div>
    
    </>

}