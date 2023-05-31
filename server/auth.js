const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./database');
const bcrypt = require('bcrypt');

router.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE login = $1',
            [username]
        );

        if (result.rows.length > 0) {
            const user_id = result.rows[0].id;
            const hashedPassword = result.rows[0].password;

            const PasswordSuccess = await bcrypt.compare(password, hashedPassword);

            if (PasswordSuccess) {
                const personalDataResult = await db.query(
                    'SELECT * FROM personal_data WHERE user_id = $1',
                    [user_id]
                );

                const user = {
                    id: user_id,
                    username: username,
                    personal_data: personalDataResult.rows[0]
                };

                const accessToken = jwt.sign(user, 'key', { expiresIn: '10m'});
                res.json({ success: true, accessToken , message: "Успешная авторизация"});
            } else {
                res.json({ success: false, error: "Неверный логин или пароль"});
            }
        } else {
            res.json({ success: false, error: "Неверный логин или пароль"});
        }
    } catch (error) {
        res.json({ success: false, message: "Ошибка базы данных" });
    }
});

router.post('/admin-login', async (req, res) => {
    const password = req.body.password;
    const login = req.body.login;
  
    try {
        const result = await db.query('SELECT password FROM admin_login WHERE username = $1', [login]);

        if (result.rows.length > 0) {
            const passwordAdmin = result.rows[0].password;
            if (passwordAdmin === password) {
                const admin = {
                    authorization: true
                }

                const adminToken = jwt.sign(admin, 'admin_key', {expiresIn: '60m'})
                res.json({ success: true, message: 'Успешная авторизация!', adminToken});
            } else {
                res.json({ success: false, message: 'Неверный пароль!' });
            }
        } else {
            res.json({ success: false, message: 'Такой учетной записи не существует!' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Ошибка сервера" });
    }
});
  

module.exports = router;
