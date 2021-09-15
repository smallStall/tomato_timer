
export type Status = "STOPPED" | "RUNNING" | "PAUSED" | "RESUME" | "FINISHED";

export interface State {
  status: Status;
  time: number;
  endTime: number;
}

export interface Timer {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  add: (seconds: number) => void;
  reduce: (seconds: number) => void;
}

