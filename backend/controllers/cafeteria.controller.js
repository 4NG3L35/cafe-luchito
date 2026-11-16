const Cafe = require('../models/cafeteria.model');

const handle = fn => async (req, res, next) => {
  try { res.json(await fn(req)); } catch (e) { next(e); }
};

module.exports = {
  inicio: handle(() => Cafe.inicio()),
  servicios: handle(() => Cafe.servicios()),
  especialidades: handle(() => Cafe.especialidades()),
  nosotros: handle(async () => ({ ...(await Cafe.nosotros()), fotos: await Cafe.fotos() })),
  precios: handle(() => Cafe.precios()),
  listarContactos: handle(() => Cafe.contactos()),
  crearContacto: async (req, res, next) => {
    try {
      const id = await Cafe.crearContacto(req.body);
      res.status(201).json({ ok: true, id, mensaje: 'Gracias, te contactaremos pronto.' });
    } catch (e) { next(e); }
  }
};
