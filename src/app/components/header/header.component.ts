import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }

  signOut() {
    this.authService.signout();
    this.router.navigate(['auth']);
  }

}
