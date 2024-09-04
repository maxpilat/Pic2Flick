import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isAuthorized: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.authService.isAuthorized$.subscribe((status) => (this.isAuthorized = status));
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.handleAuthCode(code);
      }
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
}
