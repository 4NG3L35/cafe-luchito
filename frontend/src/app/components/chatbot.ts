import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, MensajeChat } from '../services/api.service';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule],
  template: `
    @if (abierto()) {
      <div class="chat">
        <header>Barista Bot <button (click)="abierto.set(false)">×</button></header>
        <div class="msgs">
          <div class="msg assistant">¡Hola! Soy Barista Bot. Pregúntame por el menú, precios u horarios.</div>
          @for (m of mensajes(); track $index) { <div class="msg" [class]="m.role">{{ m.content }}</div> }
          @if (pensando()) { <div class="msg assistant">Escribiendo...</div> }
        </div>
        <form (ngSubmit)="enviar()">
          <input name="texto" [(ngModel)]="texto" placeholder="Escribe tu pregunta" autocomplete="off">
          <button [disabled]="pensando() || !texto.trim()">Enviar</button>
        </form>
      </div>
    }
    <button class="chat-fab" (click)="abierto.set(!abierto())">☕</button>
  `
})
export class ChatbotComponent {
  private api = inject(ApiService);
  abierto = signal(false);
  pensando = signal(false);
  mensajes = signal<MensajeChat[]>([]);
  texto = '';

  enviar() {
    const mensaje = this.texto.trim();
    if (!mensaje) return;
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
