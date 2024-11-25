import { Component } from '@angular/core';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  registrationForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onRegister(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { username, email, password } = this.registrationForm.value;

    this.authService.signup(username, email, password).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);

        console.log(response);
      },
      error: (error) => {
        this.errorMessage = 'Registration error. Please try again.';
        this.isLoading = false;

        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }
}
