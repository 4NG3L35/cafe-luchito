import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nosotros',
  template: `
    <section id="nosotros" class="section">
      <h2>Nosotros</h2>
      @if (data(); as n) {
        <div class="about">
          <div>
            <h3>{{ n.nombre }}</h3>
            <p>{{ n.historia }}</p>
            <p><strong>Misión:</strong> {{ n.mision }}</p>
          </div>
          <ul class="info">
            <li><strong>Dirección:</strong> {{ n.direccion }}</li>
            <li><strong>Teléfono:</strong> {{ n.telefono }}</li>
            <li><strong>Email:</strong> {{ n.email }}</li>
            <li><strong>Horario:</strong> {{ n.horario }}</li>
          </ul>
        </div>
        <div class="gallery">
          @for (f of n.fotos; track f.id) {
            <figure><img [src]="f.url" [alt]="f.descripcion" loading="lazy"><figcaption>{{ f.descripcion }}</figcaption></figure>
          }
        </div>
      }
    </section>
  `
})
export class NosotrosComponent {
  data = toSignal(inject(ApiService).nosotros());
}
