import { createActionType } from "./helper"

const PAUSE = () => createActionType('pause');

const ADD = (addTime: number) => createActionType('add', { addTime });
const REDUCE = (reduceTime: number) => createActionType('reduce', { reduceTime });

const START = (initialTime: number) =>
  createActionType('start', { initialTime });

const STOP = () => createActionType('stop');

export type TimerActionsType = ReturnType<
  | typeof PAUSE
  | typeof ADD
  | typeof REDUCE
  | typeof START
  | typeof STOP
>;