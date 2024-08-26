import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');

export const decrement = createAction('[Counter] Decrement');

export const clear = createAction('[Counter] Clear');

export const updatedAt = createAction('[Counter] Updated at', props<{ updatedAt: number }>());

export type CounterAction = typeof increment | typeof decrement | typeof clear | typeof updatedAt;

// export enum CounterActionTypes {
//   increase = '[COUNTER] increase',
//   decrease = '[COUNTER] decrease',
//   clear = '[COUNTER] clear',
//   updatedAt = '[COUNTER] updated at',
// }

// export class CounterIncreaseAction implements Action {
//   readonly type = CounterActionTypes.increase;
// }

// export class CounterDecreaseAction implements Action {
//   readonly type = CounterActionTypes.decrease;
// }

// export class CounterClearAction implements Action {
//   readonly type = CounterActionTypes.clear;
// }

// export class CounterUpdatedAtAction implements Action {
//   readonly type = CounterActionTypes.updatedAt;

//   constructor(public payload: { updatedAt: number }) {}
// }

// export type CounterAction = CounterIncreaseAction | CounterDecreaseAction | CounterClearAction | CounterUpdatedAtAction;
