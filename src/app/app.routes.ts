import { Routes } from '@angular/router';
import { PinGalleryComponent } from './components/pin-gallery/pin-gallery.component';
import { authGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { MovieCollectionComponent } from './components/movie-collection/movie-collection.component';
import { SignupComponent } from './auth/components/signup/signup.component';

export const routes: Routes = [
  { path: 'gallery', component: PinGalleryComponent, canActivate: [authGuard] },
  { path: 'movie-collection', component: MovieCollectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
];
