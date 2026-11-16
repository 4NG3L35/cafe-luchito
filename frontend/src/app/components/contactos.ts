import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, Contacto } from '../services/api.service';

@Component({
  selector: 'app-contactos',
  imports: [FormsModule],
  template: `
    <section id="contactos" class="section">
      <h2>Contactos</h2>
      <p class="lead">Escríbenos y te respondemos a la brevedad</p>
      <form class="form" (ngSubmit)="enviar()" #f="ngForm">
        <input name="nombre" [(ngModel)]="form.nombre" placeholder="Nombre completo" required>
        <input name="email" type="email" [(ngModel)]="form.email" placeholder="Correo electrónico" required email>
        <input name="telefono" [(ngModel)]="form.telefono" placeholder="Teléfono">
        <textarea name="mensaje" [(ngModel)]="form.mensaje" placeholder="¿En qué podemos ayudarte?" rows="4" required></textarea>
        <button class="btn" [disabled]="f.invalid || enviando()">{{ enviando() ? 'Enviando...' : 'Enviar mensaje' }}</button>
        @if (estado()) { <p class="estado">{{ estado() }}</p> }
      </form>
    </section>
  `
})
export class ContactosComponent {
  private api = inject(ApiService);
  form: Contacto = { nombre: '', email: '', telefono: '', mensaje: '' };
  enviando = signal(false);
  estado = signal('');

  enviar() {
    this.enviando.set(true);
    this.api.enviarContacto(this.form).subscribe({
      next: r => { this.estado.set(r.mensaje); this.form = { nombre: '', email: '', telefono: '', mensaje: '' }; this.enviando.set(false); },
      error: e => { this.estado.set(e.error?.error || 'No se pudo enviar'); this.enviando.set(false); }
    });
  }
}
