# Café Luchito

AppWeb de una cafetería de especialidad. Frontend en Angular, backend en Node.js con Express, base de datos MySQL y chatbot con Ollama (gemma3).

## Estructura

- `frontend/` Angular 21: secciones Inicio (video en bucle de una cafetería, de Pexels), Servicios, Especialidades, Nosotros, Precios (menú) y Contactos, más el chatbot Barista Bot. Todos los datos llegan desde la API.
- `backend/` Node.js + Express:
  - `App.js` servidor
  - `.env` configuración (copiar de `.env.example`)
  - `models/` conexión MySQL y consultas
  - `controllers/` lógica de cada endpoint
  - `middleware/` logger, validaciones y manejo de errores
  - `chatbot/` asistente con Ollama + gemma3 usando los datos de la base
  - `routes/` rutas de la API
  - `database.sql` tablas y datos

## Tablas

inicio, servicios, especialidades, nosotros (datos del local, ubicación del mapa y fundador), fotos, precios (con categoría del menú), contactos, chatbot y chatbot_sugerencias. Todo el contenido de la página (textos, imágenes, video, menú, mapa y saludo del chatbot) sale de estas tablas.

## API

| Método | Ruta | Uso |
|---|---|---|
| GET | /api/inicio | Título, subtítulo y video |
| GET | /api/servicios | Servicios |
| GET | /api/especialidades | Especialidades |
| GET | /api/nosotros | Información, dirección, teléfono, historia y fotos |
| GET | /api/precios | Menú y precios |
| POST | /api/contactos | Guarda el formulario de contacto |
| GET | /api/contactos | Lista los mensajes recibidos |
| GET | /api/chatbot | Nombre, saludo y preguntas sugeridas del chatbot |
| POST | /api/chatbot | Chatbot con gemma3 |

## Cómo ejecutar

1. Requisitos: Node.js, MySQL y Ollama con `ollama pull gemma3`.
2. Backend:
   ```
   cd backend
   npm install
   cp .env.example .env
   npm run db
   npm start
   ```
3. Frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
4. Abrir http://localhost:4200 (el backend corre en el puerto 3001)
