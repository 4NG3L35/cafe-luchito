import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-especialidades',
  imports: [RevealDirective],
  template: `
    <section id="especialidades" class="section dark">
      <div class="section-head" reveal>
        <span class="eyebrow">De la casa</span>
        <h2>Especialidades</h2>
        <p class="lead">Las bebidas que nos hicieron famosos</p>
      </div>
      <div class="specials">
        @for (e of especialidades(); track e.id; let i = $index) {
          <article class="special" reveal [style.transition-delay.ms]="i * 100">
            <img [src]="e.imagen" [alt]="e.nombre" loading="lazy">
            <div class="special-info">
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
