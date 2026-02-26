const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
const sensor = require('./routes/sensor');
const users = require('./routes/users');
const redefsenha = require('./routes/redefsenha');
const login = require('./routes/login');
const clima = require('./routes/clima');

// Middleware de autenticação
const authMiddleware = require('./middleware/authMiddleware');

// Rotas públicas
app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/redefsenha', redefsenha);

// Rotas protegidas
app.use('/api/sensor', authMiddleware, sensor);
app.use('/api/clima', authMiddleware, clima);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API do SoloSmart rodando!');
});

// Servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
