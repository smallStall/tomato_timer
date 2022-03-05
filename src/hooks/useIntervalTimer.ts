import { Timer, UseIntervalTimerReturn } from "../types/intervalTimer"
import {
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { reducer } from "./intervalTimerReducer/reducer";
import { StatusValues } from "../types/intervalTimer";
import { useSound } from "./useSound";
import { useHistory } from "./useHistory";
import * as workerTimers from 'worker-timers';

export default Timer;


export const useIntervalTimer = (
  workTime: number,
  restTime: number,
  interval = 1,
  volume = 1,
  delayTime = 3,
): UseIntervalTimerReturn => {
  const { playSound, pauseSound, resumeSound, adjustSound } = useSound(volume);
  const [state, dispatch] = useReducer(reducer, {
    status: StatusValues.stopped,
    elapsedTime: 0,
    initialTime: Date.now() / 1000,
    prevInitialTime: -1,
    pausedTime: -1,
    count: 0,
    delayTime: delayTime,
    activity: "None",
    workTime: workTime,
    restTime: restTime,
    displayTime: 0,
    prevCountTime: 0
  });
  const { addHistory, restoreHistory } = useHistory();
  const { status, elapsedTime, count } = state;
  const start = useCallback(() => {
    dispatch({ type: 'start' })
    playSound();
  }, [playSound]);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
    pauseSound();
  }, [pauseSound]);
  const setTime = useCallback(() => {
    dispatch({ type: 'setTime' });
  }, []);
  const resume = useCallback(() => {
    dispatch({ type: 'resume' });
    resumeSound();
  }, [resumeSound]);
  const restart = useCallback(() => {
    dispatch({ type: 'restart' });
    addHistory('RESET');
    playSound();
  }, [addHistory, playSound]);
  const advance = useCallback((seconds: number) => {
    dispatch({ type: 'advance', payload: { seconds } });
  }, []);
  const restore = useCallback(() => {
    dispatch({ type: 'restore' });
    resumeSound();
    restoreHistory();

  }, [restoreHistory, resumeSound]);


  useEffect(() => {
    if (state.activity === 'NextRest') {
      addHistory(count);
    }
  }, [addHistory, count, state.activity])
  useEffect(() => {
    const intervalId = workerTimers.setInterval(() => {
      if (status === StatusValues.running || status === StatusValues.resume) {
        setTime();
        const sec = state.displayTime % 60
        if (sec > 58.2 && sec < 59.8) { //60秒ごとに音の時間を再設定する
          adjustSound(elapsedTime - state.count * (workTime + restTime + 2 * delayTime));
        }
      }
    }, elapsedTime === 0 ? interval * 900 : interval * 990)
    /*
    let unmounted = false; //メモリリークが発生しないようにするための処理
    function timer(ms: number) {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          if (status === StatusValues.running || status === StatusValues.resume) {
            if (!unmounted) {
              setTime();
              const sec = state.displayTime % 60
              if (sec > 58.2 && sec < 59.8) { //60秒ごとに音の時間を再設定する
                adjustSound(elapsedTime - state.count * (workTime + restTime + 2 * delayTime));
              }
            }
          }
          resolve(timer);
        }, ms)
      });
    }
    timer(elapsedTime === 0 ? interval * 900 : interval * 990);
    return () => { unmounted = true }
    */
    return () => { workerTimers.clearInterval(intervalId) };
  }
    , [adjustSound, delayTime, elapsedTime, interval, restTime, setTime, state.count, state.displayTime, status, workTime]);

  return { timer: { start, restart, pause, resume, advance, restore }, displayTime: state.displayTime, activity: state.activity, count: state.count, status: state.status, isRunning: status === "RUNNING" || status === "RESUME" }
}
