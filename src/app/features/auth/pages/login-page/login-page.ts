import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // true = login, false = registro
  esModoLogin = signal<boolean>(true);
  mensajeError = signal<string>('');

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  cambiarModo() {
    this.esModoLogin.update(valor => !valor);
    this.mensajeError.set('');
    this.authForm.reset();
  }

  enviarFormulario() {
    if (this.authForm.invalid) return;
    this.mensajeError.set('');

    const { email, password } = this.authForm.value;

    if (this.esModoLogin()) {
      this.authService.login(email!, password!).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.mensajeError.set(this.traducirError(err?.code))
      });
    } else {
      this.authService.registro(email!, password!).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.mensajeError.set(this.traducirError(err?.code))
      });
    }
  }

  // traduce el codigo de firebase a un mensaje claro en español
  private traducirError(codigo: string): string {
    switch (codigo) {
      // firebase unifica "correo inexistente" y "clave incorrecta"
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'No existe una cuenta con esos datos o la contraseña es incorrecta.';
      case 'auth/invalid-email':
        return 'El correo no tiene un formato válido.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Espera un momento e inténtalo de nuevo.';
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con ese correo. Inicia sesión.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil (mínimo 6 caracteres).';
      default:
        return this.esModoLogin()
          ? 'No se pudo iniciar sesión. Inténtalo de nuevo.'
          : 'No se pudo crear la cuenta. Inténtalo de nuevo.';
    }
  }
}
