import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../../../../core/services/portfolio';
import { ContactService } from '../../../../core/services/contact.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.css']
})
export class ContactPageComponent {

  private portfolioService = inject(PortfolioService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  // cargamos programadores con rxResoruce
  programadoresResource = rxResource({
    stream: () => this.portfolioService.getProgramadores().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  programadores = this.programadoresResource.value;

  mensajeEnviado = signal<boolean>(false);
  
  correoProgramador = 'programador@gmail.com';

  // creamos el formulario y bloqueamos el campo de correo por defecto
  contactoForm = this.fb.group({
    programadorId: ['', Validators.required],
    nombre: ['', Validators.required],
    correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    mensaje: ['', Validators.required]
  });

  constructor() {
    // usamos effect para vigilar cuando firebase cargue el correo
    effect(() => {
      const usuarioActual = this.authService.currentUser();
      if (usuarioActual?.email) {
        // autocompletamos el campo del formulario de forma automatica
        this.contactoForm.patchValue({ correo: usuarioActual.email });
      }
    });
  }

  // verificamos si es el administrador
  esProgramador(): boolean {
    const usuarioActual = this.authService.currentUser();
    return usuarioActual?.email === this.correoProgramador;
  }

  enviarContacto() {
    if (this.contactoForm.invalid) return;

    // extraemos datos con getRawValue
    const datos = this.contactoForm.getRawValue();

    this.contactService.enviarMensaje(datos).subscribe({
      next: () => {
        this.contactoForm.reset();
        
        // correo autocompletado
        const usuarioActual = this.authService.currentUser();
        this.contactoForm.patchValue({ 
          programadorId: '',
          correo: usuarioActual?.email 
        });
        
        this.mensajeEnviado.set(true);
        setTimeout(() => this.mensajeEnviado.set(false), 3000);
      },
      error: (err) => console.error('error al enviar', err)
    });
  }
}