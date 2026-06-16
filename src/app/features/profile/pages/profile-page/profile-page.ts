import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// importamos routerlink para poder crear enlaces html
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio';
import { ContactService } from '../../../../core/services/contact.service';
// traemos la autenticacion para saber si hay alguien conectado
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  // agregamos routerlink aqui
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePage implements OnInit {
  
  private portfolioService = inject(PortfolioService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);
  
  // guardamos el servicio de auth de forma publica para usarlo en el html
  authService = inject(AuthService);

  programadores = signal<any[]>([]);
  mensajeEnviado = signal<boolean>(false);

  // agregamos programadorid al formulario segun tu rubrica
  contactoForm = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required],
    programadorId: ['', Validators.required]
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

  enviarContacto() {
    if (this.contactoForm.invalid) return;

    this.contactService.enviarMensaje(this.contactoForm.value).subscribe({
      next: () => {
        this.contactoForm.reset();
        // restablecemos el selector del programador a su valor por defecto
        this.contactoForm.patchValue({ programadorId: '' });
        
        this.mensajeEnviado.set(true);
        setTimeout(() => this.mensajeEnviado.set(false), 3000);
      },
      error: (err) => console.error('error al enviar', err)
    });
  }
}