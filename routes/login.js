const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_super_secreta';

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = rows[0];

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            user: {
                email: user.email,
                uf: user.uf,
                cidade: user.cidade
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
});

module.exports = router;
