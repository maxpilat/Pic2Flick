import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, BgImage } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form: FormGroup;
  isLoading = false;
  bg: BgImage;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.bg = this.authService.getBg();
  }

  onSignup() {
    // if (this.form.invalid) {
    //   return this.form.markAllAsTouched();
    // }

    this.isLoading = true;

    const { email, username, password } = this.form.value;

    this.authService.signup(email, username, password).subscribe({
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
}
