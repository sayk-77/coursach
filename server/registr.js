const express = require('express');
const router = express.Router();
const bd = require('./database')


router.post('/registr', async (req, res) => {
    const { login, email, passwordReg} = req.body;

    if (!email || !passwordReg || !login) {
        return res.status(400).send('Please fill all required fields');
    }

    try {
        const userWithEmail = await bd.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userWithEmail.rows.length) {
            return res.status(400).send('Пользователь с таким адресом электронной почты уже существует');
        }

        const userWithLogin = await bd.query('SELECT * FROM users WHERE login = $1', [login]);
        if (userWithLogin.rows.length) {
            return res.status(400).send('Пользователь с таким логином уже существует');
        }

        await bd.query('INSERT INTO users (email, password, login) VALUES ($1, $2, $3)', [
            email,
            passwordReg,
            login,
        ]);

        res.send('Пользователь успешно зарегистрирован');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
