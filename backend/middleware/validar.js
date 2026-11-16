const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validarContacto = (req, res, next) => {
  const { nombre, email: correo, mensaje } = req.body || {};
  if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim()) return res.status(400).json({ error: 'Nombre, email y mensaje son obligatorios' });
  if (!email.test(correo)) return res.status(400).json({ error: 'Email no válido' });
  next();
};

exports.validarChat = (req, res, next) => {
  if (!req.body?.mensaje?.trim()) return res.status(400).json({ error: 'Escribe un mensaje' });
  next();
};
