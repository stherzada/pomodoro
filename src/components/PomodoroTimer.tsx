import React from 'react';
import { useInterval } from '../hooks/use-interval';

interface Props{
    defaultPomodoroTime: number;
}

export function PomodoroTimer(props: Props): JSX.Element{
    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);
    console.log(props.defaultPomodoroTime)
  
    useInterval(() => {
        setMainTime(mainTime + 1)
    }, 1000)

    console.log(mainTime)
    return <>
    <div>
        <h1>
            {"GODDDD :("}{mainTime}
        </h1>
    </div>
    
    </>
}
