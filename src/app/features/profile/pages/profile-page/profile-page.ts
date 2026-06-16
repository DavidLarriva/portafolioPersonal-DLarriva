import { Component, OnInit, inject, signal } from '@angular/core';
// importamos herramientas para el formulario
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../../../../core/services/portfolio';
import { ContactService } from '../../../../core/services/contact.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  // agregamos reactiveformsmodule para que el html entienda el formulario
  imports: [ReactiveFormsModule],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePage implements OnInit {
  
  private portfolioService = inject(PortfolioService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  programadores = signal<any[]>([]);
  // señal para mostrar un mensaje de exito cuando se envia el correo
  mensajeEnviado = signal<boolean>(false);

  // creamos el formulario de contacto con validaciones
  contactoForm = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required]
  });

  ngOnInit() {
    this.portfolioService.getProgramadores().subscribe((respuesta: any) => {
      this.programadores.set(respuesta.data);
    });
  }

  obtenerUrlImagen(prog: any): string {
    const rutaBase = 'http://localhost:1337';
    const rutaImagen = prog?.foto_perfil?.url || prog?.attributes?.foto_perfil?.data?.attributes?.url;
    if (rutaImagen) return rutaBase + rutaImagen;
    return '';
  }

  extraerTextoRichText(bloques: any): string {
    if (!bloques) return '';
    if (typeof bloques === 'string') return bloques;
    if (Array.isArray(bloques)) {
      return bloques.map((bloque: any) => {
        if (bloque.children && Array.isArray(bloque.children)) {
          return bloque.children.map((hijo: any) => hijo.text || '').join('');
        }
        return '';
      }).join('\n\n');
    }
    return '';
  }

  obtenerProyectos(prog: any): any[] {
    return prog?.proyectos || prog?.attributes?.proyectos?.data || [];
  }

  // funcion que se ejecuta al enviar el formulario
  enviarContacto() {
    if (this.contactoForm.invalid) return;

    this.contactService.enviarMensaje(this.contactoForm.value).subscribe({
      next: () => {
        // vaciamos el formulario y mostramos el mensaje de exito
        this.contactoForm.reset();
        this.mensajeEnviado.set(true);
        
        // ocultamos el mensaje despues de 3 segundos
        setTimeout(() => this.mensajeEnviado.set(false), 3000);
      },
      error: (err) => console.error('error al enviar', err)
    });
  }
}