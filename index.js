const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log("ENV TESTE:");
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);



const app = express();
const PORT = process.env.PORT || 3001; // ← mudei para 3001

app.use(cors());
app.use(express.json());

// Rotas
const sensor = require('./routes/sensor');
const users = require('./routes/users');
const redefsenha = require('./routes/redefsenha');
const login = require('./routes/login');
const clima = require('./routes/clima');
const analises = require('./routes/analises');

const authMiddleware = require('./middleware/authMiddleware');

// Rotas públicas
app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/redefsenha', redefsenha);
app.use('/api/sensor', sensor); // ← sensor já tem authMiddleware interno

// Rotas protegidas
app.use('/api/clima', authMiddleware, clima);
app.use('/api/analises', analises);

app.get('/', (req, res) => {
  res.send('API do SoloSmart rodando!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});