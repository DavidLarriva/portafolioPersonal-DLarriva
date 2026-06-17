import { Component, inject, signal } from '@angular/core';
// herramientas de angular para formularios seguros
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

  // controlamos si el usuario quiere entrar o registrarse
  esModoLogin = signal<boolean>(true);
  
  // guardamos los errores devueltos por firebase
  mensajeError = signal<string>('');

  // creamos el formulario con reglas estrictas
  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // funcion para cambiar entre la vista de login y la de registro
  cambiarModo() {
    this.esModoLogin.update(valor => !valor);
    this.mensajeError.set('');
    this.authForm.reset();
  }

  // funcion que se ejecuta al presionar el boton principal
  enviarFormulario() {
    if (this.authForm.invalid) return;

    // limpiamos cualquier error anterior antes de un nuevo intento
    this.mensajeError.set('');

    const { email, password } = this.authForm.value;

    if (this.esModoLogin()) {
      // intentamos iniciar sesion
      this.authService.login(email!, password!).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.mensajeError.set(this.traducirError(err?.code))
      });
    } else {
      // intentamos registrar un usuario nuevo
      this.authService.registro(email!, password!).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.mensajeError.set(this.traducirError(err?.code))
      });
    }
  }

  // convertimos el codigo tecnico de firebase en un mensaje claro en español
  private traducirError(codigo: string): string {
    switch (codigo) {
      // firebase moderno devuelve invalid-credential cuando el correo no existe
      // o cuando la contraseña es incorrecta (lo unifica por seguridad)
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