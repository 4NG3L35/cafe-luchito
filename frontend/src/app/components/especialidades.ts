import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-especialidades',
  template: `
    <section id="especialidades" class="section alt">
      <h2>Especialidades</h2>
      <p class="lead">Las bebidas que nos hicieron famosos</p>
      <div class="grid">
        @for (e of especialidades(); track e.id) {
          <article class="card">
            <img [src]="e.imagen" [alt]="e.nombre" loading="lazy">
            <div class="card-body">
              <h3>{{ e.nombre }}</h3>
              <p>{{ e.descripcion }}</p>
              <span class="tag">{{ e.especialista }}</span>
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class EspecialidadesComponent {
  especialidades = toSignal(inject(ApiService).especialidades(), { initialValue: [] });
}
