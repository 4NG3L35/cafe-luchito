const { responder } = require('../chatbot/chatbot');

module.exports = {
  chat: async (req, res, next) => {
    try {
      res.json({ respuesta: await responder(req.body.mensaje, req.body.historial || []) });
    } catch (e) { next(e); }
  }
};
