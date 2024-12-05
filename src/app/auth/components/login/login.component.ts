import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, BgImage } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;
  bg: BgImage;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.bg = this.authService.getBg();
  }

  onLogin(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.isLoading = true;

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.router.navigate(['/gallery']);
      },
      error: (error) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onLogout(): void {
    this.authService.signout();
    this.router.navigate(['/login']);
  }
}
