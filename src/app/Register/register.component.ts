import { Component, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  AbstractControl, // Importar AbstractControl
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  ValidationErrors, // Importar ValidationErrors
} from "@angular/forms";

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: "app-register",
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="register()">
      <input
        name="email"
        formControlName="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        formControlName="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        name="confirmPassword"
        formControlName="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />
      <button type="submit" [disabled]="registerForm.invalid">Register</button>
      @if (errorMessage) {
        <div>{{ errorMessage }}</div>
      }
      @if (
        registerForm.errors?.["passwordMismatch"] &&
        (registerForm.get("confirmPassword")?.dirty ||
          registerForm.get("confirmPassword")?.touched)
      ) {
        <div>Passwords do not match</div>
      }
    </form>
  `,
})
export class RegisterComponent {
  errorMessage: string | null = null;

  authService = inject(AuthService);
  fb = inject(NonNullableFormBuilder);

  registerForm: FormGroup<RegisterForm> = this.fb.group(
    {
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: this.fb.control("", [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.getRawValue();
      this.authService.register(email, password).subscribe({
        next: () => {
          window.location.href = "/login";
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Registration failed";
        },
      });
    }
  }
}
