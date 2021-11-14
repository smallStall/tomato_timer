import { TimerActionsType } from './actions';
import { State, Status } from "../../types/intervalTimer"

/*1 count is 
  workTime -> delayTime -> restTime -> delayTime
*/

function minusToZero(time: number) {
  return time < 0 ? 0 : time;
}

function calcActivity(st: State) {
  if (st.status === 'STOPPED' || st.leftTime < st.delayTime) {
    return "None";
  }
  const previousCountTime = (st.workTime + st.restTime + st.delayTime * 2) * st.count
  const elapsedTime = st.maxTime - st.leftTime - previousCountTime;
  if(elapsedTime < st.workTime){
    return 'Work';
  } else if (elapsedTime >= st.workTime &&
    elapsedTime < st.workTime + st.delayTime){ //if in delayTime
    return "NextRest"; 
  } else if (elapsedTime >= st.workTime + st.delayTime &&
    elapsedTime < st.workTime + st.restTime){
    return "Rest";
  } else { //if in delayTime
    return "NextWork";
  }
}

function calcCount(st: State) {
  return Math.floor((st.maxTime - st.leftTime + 0.1) / (st.workTime + st.restTime + st.delayTime * 2))
}

function calcDisplayTime(st: State) {
  if (st.leftTime < st.delayTime) {
    return 0;
  }
  const previousCountTime = (st.workTime + st.restTime + st.delayTime * 2) * st.count;
  const elapsedTime = st.maxTime - st.leftTime - previousCountTime;
  if (elapsedTime < st.workTime + st.delayTime) {
    return minusToZero(st.workTime - elapsedTime)
  } else {
    return minusToZero(st.restTime + st.workTime - elapsedTime + st.delayTime);
  }
}


function calcJumpLeftTime(st: State) {
  const previousElapsedTime = (st.workTime + st.restTime + st.delayTime * 2) * st.count;
  let nextElapsedTime;
  if(st.activity === 'Work' || st.activity === 'NextRest'){
      nextElapsedTime = st.workTime + st.delayTime;
  }else if(st.activity === 'Rest' || st.activity === 'NextWork'){
    nextElapsedTime = st.workTime + st.restTime + st.delayTime * 2;
  }else{
    nextElapsedTime = 0;
  }
  return st.maxTime - nextElapsedTime - previousElapsedTime;
}

function calcRetryLeftTime(st: State) {
  const previousElapsedTime = (st.workTime + st.restTime + st.delayTime * 2) * st.count;
  let nextElapsedTime;
  if(st.activity === 'Work' || st.activity === 'NextRest'){
    nextElapsedTime = 0;
  }else if(st.activity === 'Rest' || st.activity === 'NextWork'){
    nextElapsedTime = st.workTime + st.delayTime;
  }else{
    nextElapsedTime = 0;
  }
  return st.maxTime - nextElapsedTime - previousElapsedTime;
}



function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {

    case 'setTime': {
      const leftTime = state.status === 'RESUME' || state.status === 'RUNNING' ? 
        state.endTime - Date.now() / 1000 : state.leftTime;
      const count = calcCount({ ...state, leftTime: leftTime });
      return {
        ...state,
        count: count,
        activity: calcActivity({ ...state, leftTime: leftTime, count: count }),
        leftTime: leftTime,
        displayTime: calcDisplayTime({ ...state, leftTime: leftTime, count: count }),
      }
    }
    case 'pause': {
      document.documentElement.setAttribute('animation', 'paused')
      const leftTime = state.endTime - Date.now() / 1000;
      return {
        ...state,
        status: 'PAUSED',
        pausedTime: Date.now() / 1000,
        leftTime: leftTime,
        displayTime: calcDisplayTime({ ...state, leftTime: leftTime }),
      }
    }
    case 'resume': {
      document.documentElement.setAttribute('animation', 'running')
      const diff = state.pausedTime > 0 ? Date.now() / 1000 - state.pausedTime : 0;
      return {
        ...state,
        status: 'RESUME',
        endTime: state.endTime + diff,
        pausedTime: 0,
      }
    }
    case 'start': {
      document.documentElement.setAttribute('animation', 'running')
      const { maxCount } = action.payload;      
      const maxTime = (state.workTime + state.restTime + state.delayTime * 2) * maxCount;
      return {
        ...state,
        maxTime: maxTime,
        leftTime: maxTime,
        displayTime: state.workTime,
        endTime: maxTime + Date.now() / 1000,
        activity: 'Work',
        status: 'RUNNING',
      }
    }
    case 'stop': {
      document.documentElement.setAttribute('animation', 'paused')
      return {
        ...state,
        activity: 'None',
        displayTime: 0,
        leftTime: 0,
        count: 0,
        status: 'STOPPED',
      }
    }
    case 'jump': {
      const nowLeftTime = state.endTime - Date.now() / 1000;
      const nextLeftTime = calcJumpLeftTime(state);
      const endTime = state.endTime - (nowLeftTime - nextLeftTime);
      const count = calcCount({ ...state, leftTime: nextLeftTime });
      return {
        ...state,
        endTime: endTime,
        count: count,
        leftTime: nextLeftTime,
        activity: calcActivity({ ...state, leftTime: nextLeftTime, count: count }),
        displayTime: calcDisplayTime({ ...state, leftTime: nextLeftTime, count: count}),
      }
    }
    case 'retry': {
      const nowLeftTime = state.endTime - Date.now() / 1000;
      const nextLeftTime = calcRetryLeftTime({...state, leftTime: nowLeftTime});
      const endTime = state.endTime - (nowLeftTime - nextLeftTime);
      const count = calcCount({ ...state, leftTime: nextLeftTime });
      return {
        ...state,
        endTime: endTime,
        count: count,
        leftTime: nextLeftTime,
        activity: calcActivity({ ...state, leftTime: nextLeftTime, count: count }),
        displayTime: calcDisplayTime({ ...state, leftTime: nextLeftTime, count: count}),
      }
    }
    case 'add': {
      const nowLeftTime = state.endTime - Date.now() / 1000;
      const { seconds } = action.payload; 
      const nextLeftTime = nowLeftTime + seconds;
      const endTime = state.endTime + seconds;
      const count = calcCount({ ...state, leftTime: nextLeftTime });
      return {
        ...state,
        endTime: endTime,
        count: count,
        leftTime: nextLeftTime,
        activity: calcActivity({ ...state, leftTime: nextLeftTime, count: count }),
        displayTime: calcDisplayTime({ ...state, leftTime: nextLeftTime, count: count}),
      }      
    }


  }
}

export default reducer;