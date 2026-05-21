const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  const { umidade, temperatura, user_id } = req.body;
  if (umidade === undefined) {
    return res.status(400).json({ message: 'Umidade obrigatória' });
  }
  try {
    await db.query(
      'INSERT INTO sensor_data (user_id, umidade, temperatura) VALUES (?, ?, ?)',
      [user_id || null, umidade, temperatura || null]
    );
    res.json({ message: 'Dados salvos!', recebido: req.body });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar dados' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 1'
    );
    res.json({ recebido: rows[0] || null });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados' });
  }
});

router.get('/historico', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ historico: rows });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico' });
  }
});

module.exports = router;