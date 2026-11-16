import { Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, MensajeChat } from '../services/api.service';
import { IconComponent } from '../icon';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, IconComponent],
  template: `
    <div class="chat" [class.open]="abierto()">
      <header>
        <div class="chat-avatar"><app-icon name="taza" [size]="22" /></div>
        <div><strong>Barista Bot</strong><small>{{ pensando() ? 'Escribiendo...' : 'En línea' }}</small></div>
        <button (click)="abierto.set(false)" aria-label="Cerrar"><app-icon name="cerrar" [size]="18" /></button>
      </header>
      <div class="msgs" #lista>
        <div class="msg assistant">¡Hola! Soy Barista Bot de Café Luchito. Pregúntame por el menú, precios u horarios.</div>
        @if (!mensajes().length) {
          <div class="chips">
            @for (s of sugerencias; track s) { <button (click)="texto = s; enviar()">{{ s }}</button> }
          </div>
        }
        @for (m of mensajes(); track $index) { <div class="msg" [class]="m.role">{{ m.content }}</div> }
        @if (pensando()) { <div class="msg assistant typing"><span></span><span></span><span></span></div> }
      </div>
      <form (ngSubmit)="enviar()">
        <input #entrada name="texto" [(ngModel)]="texto" placeholder="Escribe tu pregunta..." autocomplete="off">
        <button [disabled]="pensando() || !texto.trim()" aria-label="Enviar"><app-icon name="enviar" [size]="18" /></button>
      </form>
    </div>
    <button class="chat-fab" [class.hidden]="abierto()" (click)="abrir()" aria-label="Abrir chat"><app-icon name="taza" [size]="26" /><span>¿Te ayudo?</span></button>
  `
})
export class ChatbotComponent {
  private api = inject(ApiService);
  private lista = viewChild<ElementRef<HTMLDivElement>>('lista');
  private entrada = viewChild<ElementRef<HTMLInputElement>>('entrada');
  abierto = signal(false);
  pensando = signal(false);
  mensajes = signal<MensajeChat[]>([]);
  texto = '';
  sugerencias = ['¿Cuánto cuesta un cappuccino?', '¿A qué hora abren?', '¿Qué me recomiendas?'];

  constructor() {
    effect(() => {
      this.mensajes();
      this.pensando();
      const el = this.lista()?.nativeElement;
      if (el) setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }));
    });
  }

  abrir() {
    this.abierto.set(true);
    setTimeout(() => this.entrada()?.nativeElement.focus(), 300);
  }

  enviar() {
    const mensaje = this.texto.trim();
    if (!mensaje || this.pensando()) return;
    const historial = this.mensajes();
    this.mensajes.set([...historial, { role: 'user', content: mensaje }]);
    this.texto = '';
    this.pensando.set(true);
    this.api.chatbot(mensaje, historial).subscribe({
      next: r => { this.mensajes.update(m => [...m, { role: 'assistant', content: r.respuesta }]); this.pensando.set(false); },
      error: () => { this.mensajes.update(m => [...m, { role: 'assistant', content: 'No pude responder, intenta de nuevo.' }]); this.pensando.set(false); }
    });
  }
}
