
export type Status = "STOPPED" | "RUNNING" | "PAUSED" | "RESUME";
export type TimerActionsType<T extends string, P extends unknown> = {type: T; payload: P}

export interface State {
  status: Status;
  time: number;
}

export interface Timer {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  add: (seconds: number) => void;
  reduce: (seconds: number) => void;
}

