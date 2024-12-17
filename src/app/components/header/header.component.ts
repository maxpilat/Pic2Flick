import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: string;
  isDropdownActive = false; // Состояние дропдауна

  constructor(private authService: AuthService, private router: Router) {
    this.username = this.authService.getAuthData()?.name || '';
  }

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive; // Переключаем состояние дропдауна
  }

  signOut() {
    this.authService.signout();
    this.router.navigate(['/login']);
    this.isDropdownActive = false; // Закрываем дропдаун при выходе
  }
}
