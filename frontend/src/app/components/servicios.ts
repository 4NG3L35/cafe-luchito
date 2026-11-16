import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-servicios',
  template: `
    <section id="servicios" class="section">
      <h2>Servicios</h2>
      <p class="lead">Disfruta tu café como prefieras</p>
      <div class="grid">
        @for (s of servicios(); track s.id) {
          <article class="card">
            <img [src]="s.imagen" [alt]="s.nombre" loading="lazy">
            <div class="card-body">
              <h3>{{ s.icono }} {{ s.nombre }}</h3>
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
