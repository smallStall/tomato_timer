
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
    case 'add': {
      return{
        ...state,
        time: action.payload.addTime,
      }
    }
    case 'reduce': {
      return{
        ...state,
        time: action.payload.reduceTime,
      }
    }
    case 'start': {
      return {
        ...state,
        status: 'RUNNING',
      }
    }
    case 'stop': {
      return {
        ...state,
        status: 'STOPPED',
      }
    }

  }
}

export default reducer;