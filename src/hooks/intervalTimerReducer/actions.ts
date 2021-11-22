import { createActionType } from './helper';

const PAUSE = () => createActionType('pause');
const SETTIME = () => createActionType('setTime');
const START = () => createActionType('start');
const STOP = () => createActionType('stop');
const RESUME = () => createActionType('resume');
const ADVANCE = (seconds: number) => createActionType('advance', { seconds });



export type TimerActionsType = ReturnType<
  | typeof PAUSE
  | typeof SETTIME
  | typeof START
  | typeof STOP
  | typeof RESUME
  | typeof ADVANCE
>;