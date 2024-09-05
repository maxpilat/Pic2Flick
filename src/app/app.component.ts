import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Token } from './auth/models/auth.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  token: Token;
  isDropdownOpen: boolean;

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.authService.token$.subscribe((token) => (this.token = token));
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      code && this.handleAuthCode(code);
    });
  }

  private handleAuthCode(code: string) {
    this.authService.authorize(code).subscribe(() => {
      this.router.navigate([], {
        queryParams: { code: null },
        queryParamsHandling: 'merge',
      });
    });
  }

  signIn() {
    window.location.href = this.authService.getAuthUrl(window.location.origin);
  }

  signOut() {
    this.authService.unauthorize();
    window.location.reload();
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
