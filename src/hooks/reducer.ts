
import { TimerActionsType } from "./actions";
import { State } from "./types"


function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {
    case 'pause': {
      return{
        ...state,
        status: 'PAUSED'
      }
    }
    case 'setTime': {
      const { newTime } = action.payload
      return{
        ...state,
        time: newTime
      }
    }
    case 'setEnd': {
      const { newTime } = action.payload
      return{
        ...state,
        endTime: newTime
      }
    }
    case 'resume': {
      return{
        ...state,
        status: 'RESUME'
      }
    }
    case 'add': {
      const { addTime } = action.payload;
      return{
        ...state,
        time: state.time + addTime,
        endTime: state.endTime + addTime,
      };
    }
    case 'reduce': {
      const { reduceTime } = action.payload;
      return{
        ...state,
        time: (state.time - reduceTime) < 0 ? 0 : state.time - reduceTime,
      }
    }
    case 'start': {
      const { initialTime } = action.payload;
      return {
        ...state,
        time: initialTime,
        endTime: initialTime + Date.now() / 1000,
        status: 'RUNNING',
      }
    }
    case 'stop': {
      return {
        ...state,
        time: 0,
        status: 'STOPPED',
      }
    }
    case 'finish': {
      return {
        ...state,
        time: 0,
        status: 'FINISHED'
      }      
    }

  }
}

export default reducer;