import { useEffect, useRef} from "react";

export function useInterval< C extends CallableFunction> (callback: C, delay: number | null): void{
    const savedCallback = useRef<C>();

    useEffect(()=>{
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=>{
        function tick()  {
        if(savedCallback.current) savedCallback.current();
        }
        if (delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id)
        }
    },[delay])
}