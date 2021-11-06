import { createActionType } from "./helper"

const PAUSE = () => createActionType('pause');
const SETTIME = () => createActionType('setTime');
const START = (maxCount:number) => createActionType('start', {maxCount});
const STOP = () => createActionType('stop');
const RESUME = () => createActionType('resume');
const RETRY = () => createActionType('retry');
const JUMP = () => createActionType('jump');
const ADD = (seconds: number) => createActionType('add', { seconds });
/*const SETMAXTIME =(maxCount:number) => createActionType('setMaxTime', {maxCount});

const ADD = (addTime: number) => createActionType('add', { addTime });
const REDUCE = (reduceTime: number) => createActionType('reduce', { reduceTime });
*/

export type TimerActionsType = ReturnType<
  | typeof PAUSE
  | typeof SETTIME
  | typeof START
  | typeof STOP
  | typeof RESUME
  | typeof RETRY
  | typeof JUMP
  | typeof ADD
>;