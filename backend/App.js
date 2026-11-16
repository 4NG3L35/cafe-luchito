require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const { noEncontrado, manejarErrores } = require('./middleware/errores');
const api = require('./routes/api.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api', api);
app.use(noEncontrado);
app.use(manejarErrores);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend cafeteria en http://localhost:${PORT}`));
