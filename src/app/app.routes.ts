import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { PinGalleryComponent } from './components/pin-gallery/pin-gallery.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent, canActivate: [authGuard] },
  { path: 'gallery', component: PinGalleryComponent },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
];
