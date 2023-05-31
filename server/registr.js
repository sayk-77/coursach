const express = require('express');
const router = express.Router();
const bd = require('./database')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/registr', async (req, res) => {
    const { login, email, passwordReg } = req.body;

    if (!email || !passwordReg || !login) {
        return res.status(400).json({ error: "Заполните все поля" });
    }

    try {
        const userEmail = await bd.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userEmail.rows.length) {
            return res.status(400).json({ error: "Пользователь с такой почтой уже существует" });
        }

        const userLogin = await bd.query('SELECT * FROM users WHERE login = $1', [login]);
        if (userLogin.rows.length) {
            return res.status(400).json({ error: "Пользователь с таким логином уже существует" });
        }

        const hashedPassword = await bcrypt.hash(passwordReg, saltRounds);
        await bd.query('INSERT INTO users (email, password, login) VALUES ($1, $2, $3)', [
            email,
            hashedPassword,
            login,
        ]);

        res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;
