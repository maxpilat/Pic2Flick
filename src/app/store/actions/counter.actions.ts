import { createAction, props } from '@ngrx/store';

export enum CounterActionsTypes {
  increment = '[Counter] Increment',
  decrement = '[Counter] Decrement',
  clear = '[Counter] Clear',
  updatedAt = '[Counter] Updated At',
}

export const increment = createAction(CounterActionsTypes.increment);

export const decrement = createAction(CounterActionsTypes.decrement);

export const clear = createAction(CounterActionsTypes.clear);

export const updatedAt = createAction(CounterActionsTypes.updatedAt, props<{ updatedAt: number }>());
