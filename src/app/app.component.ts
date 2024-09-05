import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Token } from './auth/models/auth.model';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  token!: Token | null;
  isDropdownOpen = false;

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef<HTMLDivElement>;

  constructor(private authService: AuthService) {
    this.authService.token$.subscribe((token) => (this.token = token));
  }

  signIn() {
    this.authService.authorize(environment.originUrl);
  }

  signOut() {
    this.authService.unauthorize();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as Node;
    const dropdown = this.dropdownMenu?.nativeElement;

    if (this.isDropdownOpen && dropdown && !dropdown.contains(target)) {
      this.isDropdownOpen = false;
    }
  }
}
