import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // inyectamos la herramienta central de autenticacion
  private auth = inject(Auth);

  // creamos un signal que siempre sabra si hay alguien conectado
  currentUser = toSignal(authState(this.auth));

  // metodo para pedirle a firebase que inicie sesion
  login(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  // metodo para pedirle a firebase que cierre la sesion
  logout() {
    return from(signOut(this.auth));
  }
}