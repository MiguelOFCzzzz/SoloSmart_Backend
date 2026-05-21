const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const { total_deteccoes, resultado_json, imagem_base64 } = req.body;
  try {
    await db.query(
      'INSERT INTO analises_ia (user_id, total_deteccoes, resultado_json, imagem_base64) VALUES (?, ?, ?, ?)',
      [req.user.id, total_deteccoes, JSON.stringify(resultado_json), imagem_base64 || null]
    );
    res.status(201).json({ message: 'Análise salva!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao salvar análise' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, total_deteccoes, resultado_json, created_at FROM analises_ia WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ analises: rows });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar análises' });
  }
});

module.exports = router;