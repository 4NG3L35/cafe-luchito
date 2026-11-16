import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  template: `
    <section id="inicio" class="hero">
      @if (data(); as d) {
        <video [src]="d.video_url" [poster]="d.poster_url" autoplay muted loop playsinline></video>
        <div class="hero-overlay">
          <h1>{{ d.titulo }}</h1>
          <p>{{ d.subtitulo }}</p>
          <a href="#contactos" class="btn">Escríbenos</a>
        </div>
      }
    </section>
  `
})
export class InicioComponent {
  data = toSignal(inject(ApiService).inicio());
}
