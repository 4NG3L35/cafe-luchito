import { Component } from '@angular/core';
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
    <nav class="nav">
      <a href="#inicio" class="logo">☕ Café Luchito</a>
      <div class="links">
        <a href="#inicio">Inicio</a><a href="#servicios">Servicios</a><a href="#especialidades">Especialidades</a>
        <a href="#nosotros">Nosotros</a><a href="#precios">Precios</a><a href="#contactos">Contactos</a>
      </div>
    </nav>
    <app-inicio /><app-servicios /><app-especialidades /><app-nosotros /><app-precios /><app-contactos />
    <footer>© 2026 Café Luchito · Videos e imágenes de Pexels</footer>
    <app-chatbot />
  `
})
export class App {}
