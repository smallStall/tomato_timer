import { createActionType } from "./helper"

const PAUSE = () => createActionType('pause');

const ADD = (addTime: number) => createActionType('add', { addTime });
const REDUCE = (reduceTime: number) => createActionType('reduce', { reduceTime });
const SETTIME = (newTime: number) => createActionType('setTime', { newTime });
const SETEND = (newTime: number) => createActionType('setEnd', { newTime });

const START = (initialTime: number) =>
  createActionType('start', { initialTime });

const STOP = () => createActionType('stop');
const RESUME = () => createActionType('resume');
const FINISH = () => createActionType('finish');

export type TimerActionsType = ReturnType<
  | typeof PAUSE
  | typeof SETTIME
  | typeof SETEND
  | typeof ADD
  | typeof REDUCE
  | typeof START
  | typeof STOP
  | typeof RESUME
  | typeof FINISH
>;