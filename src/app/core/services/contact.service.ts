import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  // inyectamos la herramienta de base de datos
  private firestore = inject(Firestore);

  enviarMensaje(datosContacto: any) {
    // creamos una referencia a una coleccion llamada mensajes
    const mensajesRef = collection(this.firestore, 'mensajes');
    
    // guardamos los datos agregando la fecha exacta del envio
    return from(addDoc(mensajesRef, { ...datosContacto, fecha: new Date() }));
  }
}