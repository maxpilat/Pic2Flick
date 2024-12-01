import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Token } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  token!: Token | null;
  isDropdownOpen = false;

  @ViewChild('header') private header!: ElementRef<HTMLDivElement>;
  @ViewChild('dropdownMenu') private dropdownMenu!: ElementRef<HTMLDivElement>;

  constructor(private authService: AuthService, private router: Router) {}

  signIn() {
    this.router.navigate(['auth'], { queryParams: { redirectUrl: this.router.url } });
  }

  signOut() {
    this.router.navigate(['auth']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as Node;
    const dropdown = this.dropdownMenu?.nativeElement;

    if (this.isDropdownOpen && dropdown && !dropdown.contains(target)) {
      this.toggleDropdown();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const opacityLimits = {
      min: 0.5,
      max: 0.93,
    };
    const maxScroll = 150;
    const opacity = Math.max(
      opacityLimits.min,
      opacityLimits.max - (scrollPosition / maxScroll) * (opacityLimits.max - opacityLimits.min)
    );

    this.header.nativeElement.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }
}
