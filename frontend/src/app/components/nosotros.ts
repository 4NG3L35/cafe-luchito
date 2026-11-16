import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-nosotros',
  imports: [RevealDirective],
  template: `
    <section id="nosotros" class="section">
      @if (data(); as n) {
        <div class="founder">
          <div class="founder-photo" reveal><img [src]="n.fundador_foto" [alt]="n.fundador_nombre"></div>
          <div class="founder-text" reveal>
            <span class="eyebrow">Nuestra historia</span>
            <h2>Nosotros</h2>
            <p>{{ n.historia }}</p>
            <blockquote>“{{ n.fundador_cita }}”<cite>{{ n.fundador_nombre }}, fundador</cite></blockquote>
            <div class="info-grid">
              <div><span>📍</span><div><strong>Dirección</strong><p>{{ n.direccion }}</p></div></div>
              <div><span>📞</span><div><strong>Teléfono</strong><p>{{ n.telefono }}</p></div></div>
              <div><span>✉️</span><div><strong>Email</strong><p>{{ n.email }}</p></div></div>
              <div><span>🕒</span><div><strong>Horario</strong><p>{{ n.horario }}</p></div></div>
            </div>
          </div>
        </div>
        <div class="gallery">
          @for (f of n.fotos; track f.id; let i = $index) {
            <figure reveal [style.transition-delay.ms]="i * 70"><img [src]="f.url" [alt]="f.descripcion" loading="lazy"><figcaption>{{ f.descripcion }}</figcaption></figure>
          }
        </div>
      }
    </section>
  `
})
export class NosotrosComponent {
  data = toSignal(inject(ApiService).nosotros());
}
