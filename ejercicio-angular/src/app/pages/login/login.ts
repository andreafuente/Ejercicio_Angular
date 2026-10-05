import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Authentication } from '../../services/authentication';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule,],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
}

)
export class Login {
  private authentication = inject(Authentication);
  private router = inject(Router);
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  usernameError (): string {
        
            return (this.loginForm.controls.username.hasError('required') && this.loginForm.controls.username.touched) ? 'El usuario es obligatorio.' : 
                   (this.loginForm.controls.username.hasError('email') && this.loginForm.controls.username.touched) ? 'El usuario debe ser un correo electrónico válido.' : '';
  }
  passwordError (): string {
        
            return (this.loginForm.controls.password.hasError('required') && this.loginForm.controls.password.touched) ? 'La contraseña es obligatoria.' : 
                   (this.loginForm.controls.password.hasError('minlength') && this.loginForm.controls.password.touched) ? 'La contraseña debe tener al menos 8 caracteres.' : '';
  }
loginError = '';


 onSubmit(): void {
  if (this.loginForm.valid) {
    const username = this.loginForm.controls.username.value!;
    const password = this.loginForm.controls.password.value!;

    this.authentication.login({ username, password });
    this.router.navigate(['/dashboard']);
  } else {
    this.loginForm.markAllAsTouched();
  }
} 
}