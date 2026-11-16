import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-precios',
  template: `
    <section id="precios" class="section alt">
      <h2>Precios</h2>
      <p class="lead">Nuestro menú</p>
      <div class="prices">
        @for (p of precios(); track p.id) {
          <div class="price">
            <div><h3>{{ p.servicio }}</h3><small>{{ p.detalle }}</small></div>
            <span>Bs {{ +p.precio }}</span>
          </div>
        }
      </div>
    </section>
  `
})
export class PreciosComponent {
  precios = toSignal(inject(ApiService).precios(), { initialValue: [] });
}
