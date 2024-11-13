import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  registerErrorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    // Logic to check authentication state can be added here if needed
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true; // Set loading state
    this.errorMessage = null; // Reset error message

    const { email, password } = this.loginForm.value; // Get form values

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.router.navigate(['/gallery']);
      },
      error: (error) => {
        this.errorMessage = 'Login error. Please check your credentials.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return; // Exit if form is invalid
    }

    this.loading = true; // Set loading state
    this.registerErrorMessage = null; // Reset error message

    const { email, password } = this.registerForm.value; // Get form values

    // Call registration method from AuthService
    // this.authService.register(email, password).subscribe({
    //   next: (response) => {
    //     // Successful registration, redirect or show success message
    //     this.router.navigate(['/login']); // Redirect to login page after registration
    //   },
    //   error: (error) => {
    //     // Handle error
    //     this.registerErrorMessage = 'Registration error. Please try again.';
    //     this.loading = false; // Reset loading state
    //   },
    //   complete: () => {
    //     this.loading = false; // Reset loading state after completion
    //   },
    // });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onLogout(): void {
    this.authService.logout(); // Logout
    this.router.navigate(['/login']); // Redirect to login page
  }
}
