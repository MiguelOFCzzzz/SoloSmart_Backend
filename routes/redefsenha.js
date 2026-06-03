const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mp254914@gmail.com',
    pass: 'ajhpvwpqttruivhx'
  }
});

router.put('/', async (req, res) => {
  const { email, novaSenha } = req.body;

  if (!email || !novaSenha) {
    return res.status(400).json({ message: 'Email e nova senha são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    const [result] = await db.query(
      'UPDATE users SET senha = ? WHERE email = ?',
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await transporter.sendMail({
      from: '"SoloSmart" <mp254914@gmail.com>',
      to: email,
      subject: '🔐 SoloSmart: Sua senha foi redefinida',
      html: `
        <div style="font-family: Arial, sans-serif; color: #2A3D1D;">
          <h2 style="color: #C56D47;">Senha Redefinida</h2>
          <p>Olá! Sua senha no <strong>SoloSmart</strong> foi redefinida com sucesso.</p>
          <p>Se você não fez essa alteração, entre em contato imediatamente.</p>
          <hr/>
          <small style="color: #999;">SoloSmart — Monitore sua plantação de forma inteligente</small>
        </div>
      `
    });

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao redefinir senha' });
  }
});

module.exports = router;