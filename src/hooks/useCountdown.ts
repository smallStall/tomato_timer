import { Status, Timer } from "./types"
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import reducer from "./reducer";
import { Howl } from "howler";
import Sound2 from "../../public/test.mp3";//"../../public/zihou35.mp3";
const SOUND_TIME = 2.5;
const SOUND_DIFF = 0;

export default Timer;

export const useCountdown = (
  maxTime: number,
  interval = 1000,
  volume: number,
): [Timer, number, Status] => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    time: 0,
    endTime: Date.now() / 1000,
  });
  const ref = useRef(new Date());
  const { status, time, endTime } = state;
  console.log(volume / 100);
  const soundRef = useRef(new Howl({
    src: [Sound2],
    volume: volume / 100,
    html5: true,
    preload: false,
    loop: true,
  }));


  useEffect(() => {
    const sound = soundRef.current;
    if (status === 'RUNNING') {
      sound.load();
      sound.once("load", () => {
        if (sound.duration() > (time + SOUND_TIME)) {
          sound.seek(sound.duration() - time - SOUND_TIME + SOUND_DIFF);
          if (volume > 0) {
            sound.play();
            sound.volume(volume / 100);
          }
        }
      });
    } else if (status === 'PAUSED') {
      sound.seek(sound.duration());
      ref.current = new Date();
    } else if (status === 'RESUME') {
      sound.seek(sound.duration() - time - SOUND_TIME + SOUND_DIFF);
      sound.play();
      const newTime = endTime + Date.now() / 1000 - ref.current.getTime() / 1000;
      dispatch({ type: 'setEnd', payload: { newTime: newTime } })
    } else if (status === 'STOPPED') {
      sound.stop();
    }
    return () => { if (sound.state() === "loaded") { sound.unload() } };
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status]);
  const timeCallback = useCallback(() => {
    if (status === "RUNNING" || status === "RESUME") {
      const now = new Date();
      const left = endTime - now.getTime() / 1000;
      if (left > 0.05) {
        dispatch({ type: 'setTime', payload: { newTime: left } });
      } else {
        dispatch({ type: 'finish' });
      }
    }
  }, [endTime, status]);
  useEffect(() => {
    const timer = setTimeout(timeCallback, interval < time / 1000 ? time / 1000 : interval);
    return () => clearTimeout(timer);
  }
    , [interval, time, timeCallback])
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

  return [{ start, stop, pause, resume, add, reduce }, time, status]
}
