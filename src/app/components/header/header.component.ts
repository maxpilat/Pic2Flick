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
  user: User | null;
  isDropdownActive = false; // Состояние дропдауна

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
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
