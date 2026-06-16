import { Component, OnInit, inject, signal } from '@angular/core';
// importamos forms para que el programador pueda escribir respuestas
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
export class DashboardPageComponent implements OnInit {
  
  authService = inject(AuthService);
  private contactService = inject(ContactService);

  // señal para guardar las solicitudes que llegan de firebase
  solicitudes = signal<any[]>([]);
  
  // definimos tu correo oficial
  correoProgramador = 'dalarrivac@gmail.com';

  ngOnInit() {
    this.cargarSolicitudes();
  }

  // evaluamos si la persona conectada es el programador
  esProgramador(): boolean {
    const usuarioActual = this.authService.currentUser();
    return usuarioActual?.email === this.correoProgramador;
  }

  cargarSolicitudes() {
    const usuarioActual = this.authService.currentUser();
    if (!usuarioActual?.email) return;

    if (this.esProgramador()) {
      // si eres tu cargamos todos los mensajes
      this.contactService.obtenerTodasLasSolicitudes().subscribe(data => {
        this.solicitudes.set(data);
      });
    } else {
      // si es el cliente solo cargamos los suyos
      this.contactService.obtenerMisSolicitudesEnviadas(usuarioActual.email).subscribe(data => {
        this.solicitudes.set(data);
      });
    }
  }

  // funcion para que tu respondas y cambies el estado
  guardarRespuesta(solicitud: any) {
    // por defecto si no le cambias el estado lo pasamos a respondida
    const nuevoEstado = solicitud.estadoTemporal || 'Respondida';
    const respuesta = solicitud.respuestaTemporal || '';

    this.contactService.actualizarEstadoSolicitud(solicitud.id, nuevoEstado, respuesta).subscribe({
      next: () => {
        alert('solicitud actualizada en la base de datos');
      },
      error: (err) => console.error('error al actualizar', err)
    });
  }
}