import { Timer, UseIntervalTimerReturn } from "../types/intervalTimer"
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { reducer, getPrevCountTime } from "./intervalTimerReducer/reducer";
import { Howl } from "howler";
import { StatusValues } from "../types/intervalTimer";
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
    status: StatusValues.stopped,
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
  const { status, elapsedTime } = state;
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


    if (status === StatusValues.running && soundPath.length > 0 && soundRef.current == null) {
      soundRef.current = new Howl({
        src: [soundPath],
        html5: true,
        preload: false,
      });
      //onplayerror: () => alert('error'),
      //onloaderror: () => alert('load error'),
      soundRef.current.load();
      soundRef.current.once("load", () => {
        if (soundRef.current != null) {
          soundRef.current.play();
          soundRef.current.volume(volume / 100);
        }
      });
    }
    if (soundRef.current == null) {
      return;
    }
    const sound: Howl = soundRef.current;
    if (status === StatusValues.pause) {
      sound.pause();
    } else if (status === StatusValues.resume) {
      sound.play();
      sound.seek(state.elapsedTime - getPrevCountTime(state));
    } else if (status === StatusValues.stopped) {
      sound.unload();
    }
    return () => { if (sound.state() === "loaded") { sound.unload() } };
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status]);


  useEffect(() => {
    function timer(ms: number) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (status === StatusValues.running || status === StatusValues.resume) {
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
