import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  increase = '[COUNTER] increase',
  decrease = '[COUNTER] decrease',
  clear = '[COUNTER] clear',
  updatedAt = '[COUNTER] updated at',
}

export class CounterIncreaseAction implements Action {
  readonly type = CounterActionTypes.increase;
}

export class CounterDecreaseAction implements Action {
  readonly type = CounterActionTypes.decrease;
}

export class CounterClearAction implements Action {
  readonly type = CounterActionTypes.clear;
}

export class CounterUpdatedAtAction implements Action {
  readonly type = CounterActionTypes.updatedAt;

  constructor(public payload: { updatedAt: number }) {}
}

export type CounterAction = CounterIncreaseAction | CounterDecreaseAction | CounterClearAction | CounterUpdatedAtAction;
