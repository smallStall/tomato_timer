import { Timer, UseIntervalTimerReturn } from "../types/intervalTimer"
import {
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { reducer } from "./intervalTimerReducer/reducer";
import { StatusValues } from "../types/intervalTimer";
import { useSound } from "./useSound";

export default Timer;


export const useIntervalTimer = (
  workTime: number,
  restTime: number,
  interval = 1,
  volume = 1,
  delayTime = 3,
  soundPath: string = "",
): UseIntervalTimerReturn => {
  const { playSound, pauseSound, resumeSound, adjustSound, stopSound } = useSound(soundPath, volume);
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
  const stop = useCallback(() => {
    dispatch({ type: 'stop' });
    stopSound();
  }, [stopSound]);
  const advance = useCallback((seconds: number) => {
    dispatch({ type: 'advance', payload: { seconds } });
  }, []);



  useEffect(() => {
    function timer(ms: number) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (status === StatusValues.running || status === StatusValues.resume) {
            setTime();
            const sec = state.displayTime % 60
            if (sec > 9.2 && sec < 10.8) { //60秒ごとに音の時間を再設定する
              adjustSound(elapsedTime - state.count * (workTime + restTime + 2 * delayTime));
            }
          }
          resolve(timer);
        }, ms)
      });
    }
    timer(elapsedTime === 0 ? interval * 900 : interval * 990);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [elapsedTime, status]);
  return { timer: { start, stop, pause, resume, advance }, displayTime: state.displayTime, activity: state.activity, count: state.count, status: state.status, isRunning: status === "RUNNING" || status === "RESUME" }
}
