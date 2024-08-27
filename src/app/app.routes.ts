import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { CatListComponent } from './components/cat-list/cat-list.component';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'cats', component: CatListComponent },
];
