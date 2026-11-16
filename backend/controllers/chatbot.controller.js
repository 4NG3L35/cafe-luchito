const { responder } = require('../chatbot/chatbot');
const Cafe = require('../models/cafeteria.model');

module.exports = {
  config: async (req, res, next) => {
    try {
      const [bot, sugerencias] = await Promise.all([Cafe.chatbot(), Cafe.sugerencias()]);
      res.json({ ...bot, sugerencias: sugerencias.map(s => s.pregunta) });
    } catch (e) { next(e); }
  },
  chat: async (req, res, next) => {
    try {
      res.json({ respuesta: await responder(req.body.mensaje, req.body.historial || []) });
    } catch (e) { next(e); }
  }
};
