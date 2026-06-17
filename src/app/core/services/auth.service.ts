import { Injectable, inject } from '@angular/core';
// traemos las funciones de firebase, incluyendo la de crear cuentas
import { Auth, authState, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private auth = inject(Auth);

  // observable crudo del estado de sesion de firebase.
  // su PRIMERA emision ya refleja la sesion restaurada del almacenamiento,
  // por eso los guards lo usan para esperar antes de decidir si hay sesion o no.
  estadoSesion = authState(this.auth);

  // version signal del mismo estado, comoda para usar en componentes y plantillas
  currentUser = toSignal(this.estadoSesion);

  login(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  // agregamos la funcion para crear usuarios nuevos en firebase
  registro(email: string, pass: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  logout() {
    return from(signOut(this.auth));
  }
}