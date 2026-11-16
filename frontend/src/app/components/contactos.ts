import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, Contacto } from '../services/api.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-contactos',
  imports: [FormsModule, RevealDirective],
  template: `
    <section id="contactos" class="section">
      <div class="section-head" reveal>
        <span class="eyebrow">Hablemos</span>
        <h2>Contacto</h2>
        <p class="lead">Reservas, eventos o sugerencias: te respondemos a la brevedad</p>
      </div>
      <div class="contact">
        <form class="form" (ngSubmit)="enviar()" #f="ngForm" reveal>
          <div class="row">
            <label>Nombre<input name="nombre" [(ngModel)]="form.nombre" placeholder="Tu nombre" required></label>
            <label>Teléfono<input name="telefono" [(ngModel)]="form.telefono" placeholder="Opcional"></label>
          </div>
          <label>Correo electrónico<input name="email" type="email" [(ngModel)]="form.email" placeholder="tu@correo.com" required email></label>
          <label>Mensaje<textarea name="mensaje" [(ngModel)]="form.mensaje" placeholder="¿En qué podemos ayudarte?" rows="5" required></textarea></label>
          <button class="btn" [disabled]="f.invalid || enviando()">{{ enviando() ? 'Enviando...' : 'Enviar mensaje' }}</button>
          @if (estado()) { <p class="estado" [class.error]="error()">{{ estado() }}</p> }
        </form>
        @if (info(); as n) {
          <aside class="contact-card" reveal>
            <iframe title="Mapa" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-68.1365%2C-16.5165%2C-68.1235%2C-16.5065&layer=mapnik&marker=-16.5115%2C-68.1300"></iframe>
            <div class="contact-info">
              <p><strong>📍</strong> {{ n.direccion }}</p>
              <p><strong>📞</strong> {{ n.telefono }}</p>
              <p><strong>✉️</strong> {{ n.email }}</p>
              <p><strong>🕒</strong> {{ n.horario }}</p>
            </div>
          </aside>
        }
      </div>
    </section>
  `
})
export class ContactosComponent {
  private api = inject(ApiService);
  info = toSignal(this.api.nosotros());
  form: Contacto = { nombre: '', email: '', telefono: '', mensaje: '' };
  enviando = signal(false);
  estado = signal('');
  error = signal(false);

  enviar() {
    this.enviando.set(true);
    this.api.enviarContacto(this.form).subscribe({
      next: r => { this.estado.set(r.mensaje); this.error.set(false); this.form = { nombre: '', email: '', telefono: '', mensaje: '' }; this.enviando.set(false); },
      error: e => { this.estado.set(e.error?.error || 'No se pudo enviar'); this.error.set(true); this.enviando.set(false); }
    });
  }
}
