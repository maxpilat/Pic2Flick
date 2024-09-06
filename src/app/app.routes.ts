import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { PinGalleryComponent } from './components/pin-gallery/pin-gallery.component';
import { authGuard } from './auth/guards/auth.guard';
import { AuthComponent } from './auth/components/auth/auth.component';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent, canActivate: [authGuard] },
  { path: 'gallery', component: PinGalleryComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
];
