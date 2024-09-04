import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../environments/environment.development';
import { API } from './auth/constants/api.constant';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authUrl = `${environment.unsplashUrl}${API.authUrl}?client_id=${environment.accessKey}&redirect_uri=${window.location.origin}&response_type=code`;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.handleAuthCode(code);
      }
    });
  }

  private handleAuthCode(code: string) {
    this.authService.getToken(code).subscribe((token) => {
      localStorage.setItem('token', JSON.stringify(token));
      this.router.navigate([], {
        queryParams: { code: null },
        queryParamsHandling: 'merge',
      });
    });
  }

  signIn() {
    window.location.href = this.authUrl;
  }
}
