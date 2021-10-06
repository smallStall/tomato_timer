import { Status, Timer } from "./types"
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import reducer from "./reducer";
import { Howl } from "howler";
import Sound from "../../public/zihou30.ogg";
const SOUND_TIME = 3.5;

export default Timer;

export const useCountdown = (
  maxTime: number,
  interval = 1000,
  initialTime: number,
  volume: number,
): [Timer, number, Status] => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    time: initialTime,
    endTime: Date.now() / 1000,
  });

  const { status, time, endTime } = state;
  const soundRef = useRef(new Howl({
    src: Sound,
    volume: volume / 100,
    html5: true,
    preload: false,
  }));
  const sound = soundRef.current;
  useEffect(() => {
    if (status === 'RUNNING') {
      if (sound.duration() > (maxTime + SOUND_TIME)) {
        sound.seek(sound.duration() - maxTime - SOUND_TIME);
        sound.play();
      }
    } else if (status === 'PAUSED') {
      sound.seek(sound.duration())
    } else if (status === 'RESUME') {
      sound.seek(sound.duration() - maxTime - SOUND_TIME + time);
      sound.play();
    } else if (status === 'STOPPED') {
      sound.stop();
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status])

  const start = useCallback(() => {
    dispatch({ type: 'start', payload: { initialTime: maxTime } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTime]);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: 'resume' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stop = useCallback(() => {
    dispatch({ type: 'stop' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (status === "PAUSED") {
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
