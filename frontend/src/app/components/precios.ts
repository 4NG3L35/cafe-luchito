import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, Precio } from '../services/api.service';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-precios',
  imports: [RevealDirective],
  template: `
    <section id="precios" class="section cream">
      <div class="section-head" reveal>
        <span class="eyebrow">Precios</span>
        <h2>Nuestro menú</h2>
        <p class="lead">Precios en bolivianos</p>
      </div>
      <div class="menu">
        @for (g of grupos(); track g.categoria) {
          <div class="menu-group" reveal>
            <h3>{{ g.categoria }}</h3>
            @for (p of g.items; track p.id) {
              <div class="menu-item">
                <div class="menu-line"><span class="menu-name">{{ p.servicio }}</span><span class="dots"></span><span class="menu-price">Bs {{ +p.precio }}</span></div>
                <small>{{ p.detalle }}</small>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class PreciosComponent {
  private precios = toSignal(inject(ApiService).precios(), { initialValue: [] });
  grupos = computed(() => {
    const mapa = new Map<string, Precio[]>();
    for (const p of this.precios()) mapa.set(p.categoria, [...(mapa.get(p.categoria) || []), p]);
    return [...mapa].map(([categoria, items]) => ({ categoria, items }));
  });
}
