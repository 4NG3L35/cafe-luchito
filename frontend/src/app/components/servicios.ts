import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-servicios',
  imports: [RevealDirective],
  template: `
    <section id="servicios" class="section">
      <div class="section-head" reveal>
        <span class="eyebrow">Lo que hacemos</span>
        <h2>Servicios</h2>
        <p class="lead">Disfruta tu café como prefieras: en sala, para llevar o en casa</p>
      </div>
      <div class="grid">
        @for (s of servicios(); track s.id; let i = $index) {
          <article class="card" reveal [style.transition-delay.ms]="i * 80">
            <div class="card-img"><img [src]="s.imagen" [alt]="s.nombre" loading="lazy"><span class="card-icon">{{ s.icono }}</span></div>
            <div class="card-body">
              <h3>{{ s.nombre }}</h3>
              <p>{{ s.descripcion }}</p>
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class ServiciosComponent {
  servicios = toSignal(inject(ApiService).servicios(), { initialValue: [] });
}
