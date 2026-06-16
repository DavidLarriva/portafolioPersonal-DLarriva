import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ContactService } from '../../../../core/services/contact.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css']
})
export class DashboardPageComponent {
  
  authService = inject(AuthService);
  private contactService = inject(ContactService);

  solicitudes = signal<any[]>([]);
  
  // creamos una señal para nuestro mensaje elegante
  notificacion = signal<string>('');
  
  correoProgramador = 'programador@gmail.com';

  constructor() {
    // effect vigila la señal currentUser y reacciona cuando firebase entrega el correo
    effect(() => {
      const usuarioActual = this.authService.currentUser();
      if (usuarioActual?.email) {
        this.cargarSolicitudes(usuarioActual.email);
      }
    });
  }

  esProgramador(): boolean {
    const usuarioActual = this.authService.currentUser();
    return usuarioActual?.email === this.correoProgramador;
  }

  cargarSolicitudes(correoActual: string) {
    if (this.esProgramador()) {
      this.contactService.obtenerTodasLasSolicitudes().subscribe(data => {
        this.solicitudes.set(data);
      });
    } else {
      this.contactService.obtenerMisSolicitudesEnviadas(correoActual).subscribe(data => {
        this.solicitudes.set(data);
      });
    }
  }

  guardarRespuesta(solicitud: any) {
    const nuevoEstado = solicitud.estadoTemporal || 'Respondida';
    const respuesta = solicitud.respuestaTemporal || solicitud.respuestaProgramador || '';

    this.contactService.actualizarEstadoSolicitud(solicitud.id, nuevoEstado, respuesta).subscribe({
      next: () => {
        // cambiamos el alert por nuestra notificacion en pantalla
        this.notificacion.set('respuesta guardada correctamente');
        
        // limpiamos los campos temporales
        solicitud.respuestaTemporal = '';
        solicitud.estadoTemporal = '';

        // desaparecemos la notificacion despues de 3 segundos
        setTimeout(() => this.notificacion.set(''), 3000);
      },
      error: (err) => console.error('error al actualizar', err)
    });
  }
}