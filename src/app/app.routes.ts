import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { PinGalleryComponent } from './components/pin-gallery/pin-gallery.component';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'gallery', component: PinGalleryComponent },
];
