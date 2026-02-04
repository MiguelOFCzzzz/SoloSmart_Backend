const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Guarda a última leitura
let ultimaLeitura = { sensorId: "ESP32_1", umidade: 0 };

// 🔓 ESP32 envia dados (SEM TOKEN)
router.post('/', (req, res) => {
    console.log("📥 Dados recebidos do sensor:", req.body);

    if (req.body.umidade !== undefined) {
        ultimaLeitura = req.body;
    }

    res.json({
        message: "Dados recebidos com sucesso!",
        recebido: req.body
    });
});

// 🔐 Frontend lê dados (COM TOKEN)
router.get('/', authMiddleware, (req, res) => {
    res.json({
        message: "Dados retornados com sucesso!",
        recebido: ultimaLeitura,
        usuario: req.user
    });
});

module.exports = router;
