import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment.development';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code: string = params['code'];
      const redirectUrl: string = params['redirectUrl'];

      if (code) {
        this.authService.token$.pipe(filter((token) => token !== null)).subscribe((token) => {
          this.router.navigateByUrl(this.authService.getRedirectUrl() || environment.originUrl);
          this.authService.setRedirectUrl(null);
        });
        this.authService.authorize(code);
      } else if (redirectUrl) {
        this.authService.setRedirectUrl(redirectUrl);
        this.authService.authenticate();
      } else {
        this.authService.unauthorize();
      }
    });
  }
}
