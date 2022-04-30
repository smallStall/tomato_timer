import { createActionType } from './helper';

const PAUSE = () => createActionType('pause');
const SETTIME = () => createActionType('setTime');
const START = () => createActionType('start');
const RESTART = () => createActionType('restart');
const RESUME = () => createActionType('resume');
const ADVANCE = (seconds: number) => createActionType('advance', { seconds });
const RESTORE = () => createActionType('restore');
const SETMAXCOUNT = (maxCount: number) => createActionType('setMaxCount', {maxCount});
const STOP = () => createActionType('stop');




export type TimerActionsType = ReturnType<
  | typeof PAUSE
  | typeof SETTIME
  | typeof START
  | typeof RESTART
  | typeof RESUME
  | typeof ADVANCE
  | typeof RESTORE
  | typeof SETMAXCOUNT
  | typeof STOP
>;