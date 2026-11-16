import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Inicio { titulo: string; subtitulo: string; video_url: string; poster_url: string; }
export interface Servicio { id: number; nombre: string; descripcion: string; icono: string; imagen: string; }
export interface Especialidad { id: number; nombre: string; descripcion: string; especialista: string; imagen: string; }
export interface Foto { id: number; url: string; descripcion: string; }
export interface Nosotros { nombre: string; historia: string; mision: string; direccion: string; telefono: string; email: string; horario: string; fundador_nombre: string; fundador_cita: string; fundador_foto: string; fotos: Foto[]; }
export interface Precio { id: number; categoria: string; servicio: string; precio: string; detalle: string; }
export interface Contacto { nombre: string; email: string; telefono: string; mensaje: string; }
export interface MensajeChat { role: 'user' | 'assistant'; content: string; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private url = '/api';

  inicio() { return this.http.get<Inicio>(`${this.url}/inicio`); }
  servicios() { return this.http.get<Servicio[]>(`${this.url}/servicios`); }
  especialidades() { return this.http.get<Especialidad[]>(`${this.url}/especialidades`); }
  nosotros() { return this.http.get<Nosotros>(`${this.url}/nosotros`); }
  precios() { return this.http.get<Precio[]>(`${this.url}/precios`); }
  enviarContacto(c: Contacto) { return this.http.post<{ ok: boolean; mensaje: string }>(`${this.url}/contactos`, c); }
  chatbot(mensaje: string, historial: MensajeChat[]) { return this.http.post<{ respuesta: string }>(`${this.url}/chatbot`, { mensaje, historial }); }
}
