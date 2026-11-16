import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, Contacto } from '../services/api.service';
import { RevealDirective } from '../reveal.directive';
import { IconComponent } from '../icon';

@Component({
  selector: 'app-contactos',
  imports: [FormsModule, RevealDirective, IconComponent],
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
            <iframe title="Mapa" loading="lazy" [src]="mapa()"></iframe>
            <div class="contact-info">
              <p><app-icon name="ubicacion" [size]="20" /> {{ n.direccion }}</p>
              <p><app-icon name="telefono" [size]="20" /> {{ n.telefono }}</p>
              <p><app-icon name="correo" [size]="20" /> {{ n.email }}</p>
              <p><app-icon name="reloj" [size]="20" /> {{ n.horario }}</p>
            </div>
          </aside>
        }
      </div>
    </section>
  `
})
export class ContactosComponent {
  private api = inject(ApiService);
  private sanitizer = inject(DomSanitizer);
  info = toSignal(this.api.nosotros());
  mapa = computed(() => {
    const n = this.info();
    if (!n) return null;
    const lat = +n.latitud, lng = +n.longitud, d = 0.006;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lng}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
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
