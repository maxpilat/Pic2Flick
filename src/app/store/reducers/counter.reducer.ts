import { createReducer, on } from '@ngrx/store';
import { increment, decrement, clear, updatedAt } from '../actions/counter.actions';
import type { Counter } from '../models/counter.model';

export const counterNode = 'counter';

export type CounterState = Counter;

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
