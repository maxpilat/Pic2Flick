import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { PinListComponent } from './components/pin-list/pin-list.component';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'cats', component: PinListComponent },
];
