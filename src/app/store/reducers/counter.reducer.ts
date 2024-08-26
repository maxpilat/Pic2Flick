import { createReducer, on } from '@ngrx/store';
import { increment, decrement, clear, updatedAt } from '../actions/counter.actions';

export const counterNode = 'counter';

export interface CounterState {
  count: number;
  updatedAt: number;
}

const initialState: CounterState = {
  count: 0,
  updatedAt: Date.now(),
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state) => ({ ...state, count: state.count - 1 })),
  on(clear, (state) => ({ ...state, count: 0 })),
  on(updatedAt, (state, { updatedAt }) => ({ ...state, updatedAt }))
);

// export const counterReducer = (state = initialState, action: CounterAction) => {
//   switch (action.type) {
//     case CounterActionTypes.increase:
//       return { ...state, count: state.count + 1 };
//     case CounterActionTypes.decrease:
//       return { ...state, count: state.count - 1 };
//     case CounterActionTypes.clear:
//       return { ...state, count: 0 };
//     case CounterActionTypes.updatedAt:
//       return { ...state, updatedAt: action.payload.updatedAt };
//     default:
//       return state;
//   }
// };
