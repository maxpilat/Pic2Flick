import { Routes } from '@angular/router';
import { PinGalleryComponent } from './components/pin-gallery/pin-gallery.component';
import { authGuard } from './auth/guards/auth.guard';
import { AuthComponent } from './auth/components/auth/auth.component';
import { MovieCollectionComponent } from './components/movie-collection/movie-collection.component';

export const routes: Routes = [
  { path: 'gallery', component: PinGalleryComponent },
  { path: 'movie-collection', component: MovieCollectionComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
];
