import { Status, Timer } from "./types"
import React, {
  useState,
  useEffect,
  useRef,
  useReducer
} from "react";
import reducer from "./reducer";


const usePauseTime = (
  status: Status,
  secondsLeft: number,
  endTime: Date,
) => {
  useEffect(() => {
    const prev = status === "PAUSED" ? new Date() : null; 
    if (status === "RESUME" && prev !== null) {
      const now = new Date();
      endTime.setTime(endTime.getTime() + now.getTime() - prev.getTime());
    }
  }, [endTime, secondsLeft, status]);
};



const useIntervalTimeLeft = (
  endTime: Date,
  status: Status,
  interval: number,
  secondsLeft: number,
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>,
) => {
  useEffect(() => {
    if(status === "STOPPED"){
      setSecondsLeft(0);
    }
    const timer = setTimeout(() => {　
      if (status === "RUNNING" || status === "RESUME") {
        const now = new Date();
        const seconds = (endTime.getTime() - now.getTime()) / 1000;
        if (seconds > 0.05) {
          setSecondsLeft(seconds);
        } else {
          setSecondsLeft(0);
        }
      } 
    }, interval < secondsLeft / 1000 ? secondsLeft / 1000 : interval);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, status]);
};


export const useCountdown = (
  maxTime: number,
  interval = 1000,
) :[Timer, number, Status] => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const endTime = useRef(new Date());
  const [status, setStatus] = useState<Status>("STOPPED");

  const start = () => {
    setStatus("RUNNING");
    const now = new Date();
    now.setMinutes(now.getMinutes() + Math.floor(maxTime / 60));
    now.setSeconds(now.getSeconds() + (maxTime - Math.floor(maxTime / 60)));
    endTime.current = now;
    setSecondsLeft(maxTime);
  };

  const pause = () => setStatus("PAUSED");
  const resume = () => setStatus("RESUME");
  const stop = () => {
    setStatus("STOPPED");
  }
  const add = (seconds: number) => {
    setSecondsLeft(secondsLeft + seconds);
    endTime.current.setDate(endTime.current.getDate() + seconds * 1000);
  }
  const reduce = (seconds: number) => {
    const secondsPadding = secondsLeft < seconds ? secondsLeft : (secondsLeft - seconds);
    setSecondsLeft(secondsPadding);
    endTime.current.setDate(endTime.current.getDate() - secondsPadding * 1000);
  }

  useIntervalTimeLeft(
    endTime.current,
    status,
    interval,
    secondsLeft,
    setSecondsLeft,
  );
  usePauseTime(status, secondsLeft, endTime.current);
  return [{start, stop, pause, resume, add, reduce}, secondsLeft, status]
}
