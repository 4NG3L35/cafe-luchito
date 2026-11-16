import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  template: `
    <section id="inicio" class="hero">
      @if (data(); as d) {
        <video [src]="d.video_url" [muted]="true" autoplay loop playsinline preload="auto" (loadedmetadata)="reproducir($event)" (canplay)="reproducir($event)"></video>
        <div class="hero-overlay">
          <span class="eyebrow">{{ d.etiqueta }}</span>
          <h1>{{ d.titulo }}</h1>
          <p>{{ d.subtitulo }}</p>
          <div class="hero-actions">
            <a href="#precios" class="btn">Ver el menú</a>
            <a href="#contactos" class="btn ghost">Escríbenos</a>
          </div>
        </div>
        <a href="#servicios" class="scroll-hint" aria-label="Bajar"><span></span></a>
      } @else {
        <div class="hero-overlay"><div class="loader"></div></div>
      }
    </section>
  `
})
export class InicioComponent {
  data = toSignal(inject(ApiService).inicio());

  reproducir(e: Event) {
    const video = e.target as HTMLVideoElement;
    video.muted = true;
    if (video.paused) video.play().catch(() => {});
  }
}
