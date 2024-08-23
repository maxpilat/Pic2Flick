import { CounterActionTypes, CounterAction } from '../actions/counter.actions';

export const counterNode = 'counter';

export interface CounterState {
  count: number;
  updatedAt: number;
}

const initialState: CounterState = {
  count: 0,
  updatedAt: Date.now(),
};

export const counterReducer = (state = initialState, action: CounterAction) => {
  switch (action.type) {
    case CounterActionTypes.increase:
      return { ...state, count: state.count + 1 };
    case CounterActionTypes.decrease:
      return { ...state, count: state.count - 1 };
    case CounterActionTypes.clear:
      return { ...state, count: 0 };
    case CounterActionTypes.updatedAt:
      return { ...state, updatedAt: action.payload.updatedAt };
    default:
      return state;
  }
};
