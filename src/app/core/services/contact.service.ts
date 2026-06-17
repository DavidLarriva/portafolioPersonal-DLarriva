import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, doc, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  enviarMensaje(datosContacto: any) {
    const mensajesRef = collection(this.firestore, 'mensajes');
    const usuarioActual = this.auth.currentUser;
    
    const solicitudFinal = {
      ...datosContacto,
      fecha: new Date(),
      estado: 'Pendiente',
      usuarioUid: usuarioActual?.uid,
      usuarioCorreo: usuarioActual?.email
    };

    return from(addDoc(mensajesRef, solicitudFinal));
  }

  
  obtenerMisSolicitudesEnviadas(correo: string): Observable<any[]> {
    const mensajesRef = collection(this.firestore, 'mensajes');
    const q = query(mensajesRef, where('usuarioCorreo', '==', correo));
    return collectionData(q, { idField: 'id' });
  }

  // funcion corregida para que el administrador vea todo
  obtenerTodasLasSolicitudes(): Observable<any[]> {
    const mensajesRef = collection(this.firestore, 'mensajes');
    return collectionData(mensajesRef, { idField: 'id' });
  }

  actualizarEstadoSolicitud(mensajeId: string, nuevoEstado: string, respuesta: string) {
    const mensajeRef = doc(this.firestore, 'mensajes', mensajeId);
    return from(updateDoc(mensajeRef, {
      estado: nuevoEstado,
      respuestaProgramador: respuesta
    }));
  }
}