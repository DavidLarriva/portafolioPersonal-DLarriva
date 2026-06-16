import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';
// importamos auth para saber los datos de la sesion actual
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  enviarMensaje(datosContacto: any) {
    const mensajesRef = collection(this.firestore, 'mensajes');
    
    // extraemos la cuenta de la persona que esta logueada
    const usuarioActual = this.auth.currentUser;
    
    // armamos el documento exactamente como lo pide tu rubrica
    const solicitudFinal = {
      ...datosContacto,
      fecha: new Date(),
      estado: 'Pendiente',
      usuarioUid: usuarioActual?.uid,
      usuarioCorreo: usuarioActual?.email
    };

    return from(addDoc(mensajesRef, solicitudFinal));
  }
}