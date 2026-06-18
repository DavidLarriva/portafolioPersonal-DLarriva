import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  // stream de sesion los guards esperan su primera emision al recargar
  estadoSesion = authState(this.auth);
  currentUser = toSignal(this.estadoSesion);

  login(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  registro(email: string, pass: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  logout() {
    return from(signOut(this.auth));
  }
}
