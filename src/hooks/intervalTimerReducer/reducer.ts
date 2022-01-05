import { TimerActionsType } from './actions';
import { State, StatusValues } from "../../types/intervalTimer";
import { minusToZero } from "../../libs/accesories"
/*1 count is 
  workTime -> delayTime -> restTime -> delayTime
*/

const getPrevCountTime = (st: State) => (st.workTime + st.restTime + st.delayTime * 2) * st.count 

function calcActivity(st: State) {
  if (st.status === StatusValues.stopped || st.elapsedTime < st.delayTime) {
    return "None";
  }
  const previousCountTime = getPrevCountTime(st);
  const thisElapsedTime = st.elapsedTime - previousCountTime;
  if(thisElapsedTime < st.workTime){
    return 'Work';
  } else if (st.elapsedTime >= st.workTime &&
    thisElapsedTime < st.workTime + st.delayTime){ //if in delayTime
    return "NextRest"; 
  } else if (thisElapsedTime >= st.workTime + st.delayTime &&
    thisElapsedTime < st.workTime + st.restTime){
    return "Rest";
  } else { //if in delayTime
    return "NextWork";
  }
}

function calcCount(st: State) {
  return Math.floor((st.elapsedTime + 0.1) / (st.workTime + st.restTime + st.delayTime * 2))
}

function calcDisplayTime(st: State) {

  const previousCountTime = getPrevCountTime(st);
  const thisElapsedTime = st.elapsedTime - previousCountTime;
  if (thisElapsedTime < st.workTime + st.delayTime) {
    return minusToZero(st.workTime - thisElapsedTime)
  } else {
    return minusToZero(st.restTime + st.workTime - thisElapsedTime + st.delayTime);
  }
}


export function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {

    case 'setTime': {
      const thisElapsedTime = state.status === StatusValues.resume || state.status === StatusValues.running ? 
        Date.now() / 1000  - state.initialTime: state.elapsedTime;

      const count = calcCount({ ...state, elapsedTime: thisElapsedTime });
      return {
        ...state,
        count: count,
        activity: calcActivity({ ...state, elapsedTime: thisElapsedTime, count: count }),
        elapsedTime: thisElapsedTime,
        displayTime: calcDisplayTime({ ...state, elapsedTime: thisElapsedTime, count: count }),
      }
    }
    case 'pause': {
      document.documentElement.setAttribute('animation', 'paused')
      return {
        ...state,
        status: StatusValues.paused,
        pausedTime: Date.now() / 1000,
        elapsedTime: state.elapsedTime,
        displayTime: state.displayTime,
      }
    }
    case 'resume': {
      document.documentElement.setAttribute('animation', 'running');
      if(state.pausedTime < 0){
        return state;
      }
      const diff = state.pausedTime > 0 ? Date.now() / 1000 - state.pausedTime : 0;
      return {
        ...state,
        status: StatusValues.resume,
        initialTime: state.initialTime + diff,
        pausedTime: -1,
      }
    }
    case 'start': {
      document.documentElement.setAttribute('animation', 'running')
      return {
        ...state,
        elapsedTime: 0,
        displayTime: state.workTime,
        initialTime: Date.now() / 1000,
        activity: 'Work',
        status: StatusValues.running,
      }
    }
    case 'restart': {
      document.documentElement.setAttribute('animation', 'running');
      return {
        ...state,
        prevInitialTime: state.initialTime,
        initialTime: Date.now() / 1000,
        status: StatusValues.running,
      }
    }
    case 'advance': {
      const { seconds } = action.payload; 
      const initialTime = state.initialTime + seconds;
      const elapsedTime = Date.now() / 1000 - initialTime;
      const count = calcCount({ ...state, elapsedTime: elapsedTime });
      return {
        ...state,
        initialTime: initialTime,
        count: count,
        elapsedTime: elapsedTime,
        activity: calcActivity({ ...state, elapsedTime: elapsedTime, count: count }),
        displayTime: calcDisplayTime({ ...state, elapsedTime: elapsedTime, count: count}),
      }      
    }
    case 'restore': {
      document.documentElement.setAttribute('animation', 'running');
      if(state.prevInitialTime < 0){
        return state;
      }
      return {
        ...state,
        status: StatusValues.resume,
        initialTime: state.prevInitialTime,
        prevInitialTime: -1,
        pausedTime: -1,
      }
    }
  }
}