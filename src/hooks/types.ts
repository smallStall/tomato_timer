export type Status = "STOPPED" | "RUNNING" | "PAUSED" | "RESUME" | "FINISHED";

export type Activity = "None" | "Work" | "NextRest" | "Rest" | "NextWork";
// None -> Work -> NextRest(delayTime) -> Rest -> NextWork(delayTime) -> ...

export interface State {
  readonly status: Status;
  readonly leftTime: number;
  readonly endTime: number;
  readonly pausedTime: number;
  readonly displayTime: number;
  readonly count: number;
  readonly activity: Activity;
  readonly workTime: number;
  readonly restTime: number;
  readonly maxTime:number;
  readonly delayTime:number;
}

export interface Timer {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  retry: () => void;
  jump: () => void;
  add: (seconds: number) => void;
  /*
  add: (seconds: number) => void;
  reduce: (seconds: number) => void;
  */
}

export type UseIntervalTimerReturn = {
  timer: Timer;
  displayTime: number;
  state: State;
}

export type UseIntervalTimerProps = {
  workTime: number;
  restTime: number;
  interval: number;
  volume: number;
  maxCount: number;
  delayTime: number;
  soundPath: string;
}