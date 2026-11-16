import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from './services/api.service';
import { InicioComponent } from './components/inicio';
import { ServiciosComponent } from './components/servicios';
import { EspecialidadesComponent } from './components/especialidades';
import { NosotrosComponent } from './components/nosotros';
import { PreciosComponent } from './components/precios';
import { ContactosComponent } from './components/contactos';
import { ChatbotComponent } from './components/chatbot';

@Component({
  selector: 'app-root',
  imports: [InicioComponent, ServiciosComponent, EspecialidadesComponent, NosotrosComponent, PreciosComponent, ContactosComponent, ChatbotComponent],
  template: `
    <nav class="nav" [class.solid]="scrolled()">
      <a href="#inicio" class="logo"><span class="logo-icon">☕</span> Café <em>Luchito</em></a>
      <button class="burger" [class.open]="menu()" (click)="menu.set(!menu())" aria-label="Menú"><span></span><span></span><span></span></button>
      <div class="links" [class.open]="menu()">
        @for (l of links; track l.id) {
          <a [href]="'#' + l.id" [class.active]="activo() === l.id" (click)="menu.set(false)">{{ l.texto }}</a>
        }
      </div>
    </nav>
    <main>
      <app-inicio /><app-servicios /><app-especialidades /><app-nosotros /><app-precios /><app-contactos />
    </main>
    <footer class="footer">
      @if (info(); as n) {
        <div class="footer-grid">
          <div>
            <a href="#inicio" class="logo"><span class="logo-icon">☕</span> Café <em>Luchito</em></a>
            <p>{{ n.mision }}</p>
          </div>
          <div><h4>Visítanos</h4><p>{{ n.direccion }}</p></div>
          <div><h4>Horario</h4><p>{{ n.horario }}</p></div>
          <div><h4>Contacto</h4><p>{{ n.telefono }}<br>{{ n.email }}</p></div>
        </div>
      }
      <p class="copy">© 2026 Café Luchito · Videos e imágenes de Pexels</p>
    </footer>
    <app-chatbot />
  `
})
export class App {
  info = toSignal(inject(ApiService).nosotros());
  scrolled = signal(false);
  menu = signal(false);
  activo = signal('inicio');
  links = [
    { id: 'inicio', texto: 'Inicio' },
    { id: 'servicios', texto: 'Servicios' },
    { id: 'especialidades', texto: 'Especialidades' },
    { id: 'nosotros', texto: 'Nosotros' },
    { id: 'precios', texto: 'Menú' },
    { id: 'contactos', texto: 'Contacto' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
    const actual = this.links.filter(l => {
      const el = document.getElementById(l.id);
      return el && el.getBoundingClientRect().top <= 120;
    }).pop();
    if (actual) this.activo.set(actual.id);
  }
}
