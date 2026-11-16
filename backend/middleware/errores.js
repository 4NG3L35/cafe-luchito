exports.noEncontrado = (req, res) => res.status(404).json({ error: 'Ruta no encontrada' });

exports.manejarErrores = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
};
