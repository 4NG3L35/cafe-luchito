const db = require('./db');

const one = async (sql, params) => (await db.query(sql, params))[0][0];
const all = async (sql, params) => (await db.query(sql, params))[0];

module.exports = {
  inicio: () => one('SELECT * FROM inicio LIMIT 1'),
  servicios: () => all('SELECT * FROM servicios ORDER BY id'),
  especialidades: () => all('SELECT * FROM especialidades ORDER BY id'),
  nosotros: () => one('SELECT * FROM nosotros LIMIT 1'),
  fotos: () => all('SELECT * FROM fotos ORDER BY id'),
  precios: () => all('SELECT p.id, p.servicio, p.precio, p.detalle FROM precios p ORDER BY p.id'),
  contactos: () => all('SELECT * FROM contactos ORDER BY id DESC'),
  crearContacto: async ({ nombre, email, telefono, mensaje }) => {
    const [r] = await db.query('INSERT INTO contactos (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)', [nombre, email, telefono || null, mensaje]);
    return r.insertId;
  }
};
