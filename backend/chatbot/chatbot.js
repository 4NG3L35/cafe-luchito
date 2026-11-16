const Cafe = require('../models/cafeteria.model');

async function contexto() {
  const [n, servicios, especialidades, precios] = await Promise.all([Cafe.nosotros(), Cafe.servicios(), Cafe.especialidades(), Cafe.precios()]);
  return [
    `Cafetería: ${n.nombre}. Dirección: ${n.direccion}. Teléfono: ${n.telefono}. Email: ${n.email}. Horario: ${n.horario}. Fundador: ${n.fundador_nombre}.`,
    `Servicios: ${servicios.map(s => s.nombre).join(', ')}.`,
    `Bebidas especiales: ${especialidades.map(e => e.nombre).join(', ')}.`,
    `Menú y precios: ${precios.map(p => `${p.servicio} (${p.categoria}) Bs ${p.precio}`).join('; ')}.`
  ].join('\n');
}

async function responder(mensaje, historial) {
  const system = `Eres "Barista Bot", el asistente virtual de la cafetería Café Luchito. Responde en español, breve y amable, solo sobre la cafetería, su menú, sus servicios y el café. Usa solo estos datos y no inventes precios:\n${await contexto()}\nSi preguntan algo ajeno a la cafetería, indica amablemente que solo puedes ayudar con temas de Café Luchito.`;
  const r = await fetch(`${process.env.OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL,
      stream: false,
      messages: [{ role: 'system', content: system }, ...historial.slice(-6), { role: 'user', content: mensaje }]
    })
  });
  if (!r.ok) throw new Error(`Ollama respondió ${r.status}`);
  return (await r.json()).message.content.trim();
}

module.exports = { responder };
