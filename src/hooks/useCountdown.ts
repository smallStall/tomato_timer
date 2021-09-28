import { Status, Timer } from "./types"
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import reducer from "./reducer";


export const useCountdown = (
  maxTime: number,
  interval = 1000,
  initialTime = 0,
): [Timer, number, Status] => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    time: initialTime,
    endTime: Date.now() / 1000,
  });

  const { status, time, endTime } = state;
  /*
  const now = new Date();
  now.setMinutes(now.getMinutes() + Math.floor(maxTime / 60));
  now.setSeconds(now.getSeconds() + (maxTime - Math.floor(maxTime / 60)));
  */


  const start = useCallback(() => {
    dispatch({ type: 'start', payload: { initialTime: maxTime } })
  }, [maxTime]);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
  }, []);
  const resume = useCallback(() => {
    dispatch({ type: 'resume' });
  }, []);
  const stop = useCallback(() => {
    dispatch({ type: 'stop' });
  }, []);
  const add = useCallback((addTime) => {
    dispatch({ type: 'add', payload: { addTime } });
  }, [])
  const reduce = useCallback((reduceTime: number) => {
    dispatch({ type: 'reduce', payload: { reduceTime } });
    endTime - reduceTime;
  }, [endTime])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "RUNNING" || status === "RESUME") {
        const now = new Date();
        const left = endTime - now.getTime() / 1000;
        if (left > 0.05) {
          dispatch({ type: 'setTime', payload: { newTime: left } });
        } else {
          dispatch({ type: 'finish' });
        }
      }
    }, interval < time / 1000 ? time / 1000 : interval);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, status, endTime]);

  const usePause = () => {
    const ref = useRef(new Date());
    useEffect(() => {
      if(status === "PAUSED"){
        ref.current = new Date();
      }
      if (status === "RESUME") {
        const newTime = endTime + Date.now() / 1000 - ref.current.getTime() / 1000;
        dispatch({ type: 'setEnd', payload: { newTime: newTime } })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);  
  }
  usePause();

  return [{ start, stop, pause, resume, add, reduce }, time, status]
}
