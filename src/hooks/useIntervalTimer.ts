import { Timer, UseIntervalTimerReturn } from "../types/intervalTimer"
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import {reducer, getPrevCountTime} from "./intervalTimerReducer/reducer";
import { Howl } from "howler";
export default Timer;


export const useIntervalTimer = (
  workTime: number,
  restTime: number,
  interval = 1,
  volume: number,
  delayTime = 3,
  soundPath: string = "",
): UseIntervalTimerReturn => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    elapsedTime: 0,
    initialTime: Date.now() / 1000,
    pausedTime: 0,
    count: 0,
    delayTime: delayTime,
    activity: "None",
    workTime: workTime,
    restTime: restTime,
    displayTime: 0
  });
  const { status, elapsedTime, initialTime } = state;
  const soundRef = useRef<Howl>();
  const start = useCallback(() => {
    dispatch({ type: 'start' })
  }, []);

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
  const advance = useCallback((seconds: number) => {
    dispatch({ type: 'advance', payload: { seconds } });
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
      sound?.play();
      const previousCountTime = (state.workTime + state.restTime + state.delayTime * 2) * state.count
      sound?.seek(state.elapsedTime - getPrevCountTime(state));
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
            setTime();
          }
          resolve(timer);
        }, ms)
      });
    }
    timer(interval * 1000);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [elapsedTime, status]);
  return { timer: { start, stop, pause, resume, advance }, displayTime: state.displayTime, activity: state.activity, count: state.count, status: state.status, isRunning: status === "RUNNING" || status === "RESUME" }
}
