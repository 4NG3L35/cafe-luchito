const { Router } = require('express');
const cafe = require('../controllers/cafeteria.controller');
const bot = require('../controllers/chatbot.controller');
const { validarContacto, validarChat } = require('../middleware/validar');

const router = Router();

router.get('/inicio', cafe.inicio);
router.get('/servicios', cafe.servicios);
router.get('/especialidades', cafe.especialidades);
router.get('/nosotros', cafe.nosotros);
router.get('/precios', cafe.precios);
router.get('/contactos', cafe.listarContactos);
router.post('/contactos', validarContacto, cafe.crearContacto);
router.get('/chatbot', bot.config);
router.post('/chatbot', validarChat, bot.chat);

module.exports = router;
