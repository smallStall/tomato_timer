export type Status = "STOPPED" | "RUNNING" | "PAUSED" | "RESUME";

export const StatusValues: { [key: string]: Status } = {
  stopped: "STOPPED",
  running: "RUNNING",
  paused: "PAUSED",
  resume: "RESUME",
} as const;

export type Activity = "None" | "Work" | "NextRest" | "Rest" | "NextWork";
// None -> Work -> NextRest(delayTime) -> Rest -> NextWork(delayTime) -> ...

export interface State {
  readonly status: Status;
  readonly elapsedTime: number;
  readonly initialTime: number;
  readonly pausedTime: number;
  readonly displayTime: number;
  readonly count: number;
  readonly activity: Activity;
  readonly workTime: number;
  readonly restTime: number;
  readonly delayTime:number;
}

export interface Timer {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  advance: (seconds: number) => void;
}

export type UseIntervalTimerReturn = {
  timer: Timer;
  displayTime: number;
  activity: Activity;
  count: number;
  status: Status;
  isRunning: boolean;
}

export type UseIntervalTimerProps = {
  workTime: number;
  restTime: number;
  interval: number;
  volume: number;
  delayTime: number;
  soundPath: string;
}