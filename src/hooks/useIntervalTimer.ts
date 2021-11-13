import { Timer, UseIntervalTimerReturn } from "../types/intervalTimer"
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import reducer from "./intervalTimerReducer/reducer";
import { Howl } from "howler";
export default Timer;


export const useIntervalTimer = (
  workTime: number,
  restTime: number,
  interval = 1,
  volume: number,
  maxCount: number,
  delayTime = 3,
  soundPath: string = "",
): UseIntervalTimerReturn => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    leftTime: 0,
    endTime: Date.now() / 1000,
    pausedTime: 0,
    count: 0,
    delayTime: delayTime,
    activity: "None",
    workTime: workTime,
    restTime: restTime,
    maxTime: 0,
    displayTime: 0,
  });
  const { status, leftTime, endTime } = state;
  const soundRef = useRef<Howl>();
  const start = useCallback(() => {
    dispatch({ type: 'start', payload: { maxCount } })
  }, [maxCount]);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
  }, []);
  const setTime = useCallback(() => {
    dispatch({ type: 'setTime' });
  }, []);
  

  const resume = useCallback(() => {
    dispatch({ type: 'resume' });
  }, []);
  const stop = useCallback(() => {
    dispatch({ type: 'stop' });
  }, []);
  const jump = useCallback(() => {
    dispatch({ type: 'jump' });
  }, []);
  const retry = useCallback(() => {
    dispatch({ type: 'retry' });
  }, []);
  const add = useCallback((seconds: number) => {
    dispatch({ type: 'add', payload: { seconds } });
  }, []);

  useEffect(() => {
    const sound = soundRef.current;
    if (status === 'RUNNING' && soundPath.length > 0) {
      soundRef.current = new Howl({
        src: [soundPath],
        volume: volume / 100,
        html5: true,
        preload: false,
        loop: true,
      });
      const sound = soundRef.current;
      sound.load();
      sound.once("load", () => {
        if (volume > 0) {
          sound.play();
        }
      });
    } else if (status === 'PAUSED') {
      sound?.pause();
    } else if (status === 'RESUME') {
      sound?.seek(sound.duration() - leftTime);
      sound?.play();
    } else if (status === 'STOPPED') {
      sound?.unload();
    }
    return () => { if (sound?.state() === "loaded") { sound.unload() } };
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status]);


  useEffect(() => {
    function timer(ms: number) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (status === "RUNNING" || status === "RESUME") {
            if (leftTime > 0.05) {
              setTime();
            } else {
              stop();
            }
          }    
          resolve(timer);
        }, ms)
      });
    }
    timer(interval < leftTime ? interval * 1000 : leftTime * 1000);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [leftTime, status]);
  return { timer: { start, stop, pause, resume, jump, retry, add }, displayTime: state.displayTime, state: state }
}
