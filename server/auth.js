const express = require('express');
const router = express.Router();
const db = require('./database');

// Маршрут для обработки запроса на авторизацию
router.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE login = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Ошибка при запросе к базе данных:', error);
        res.json({ success: false, message: 'Ошибка базы данных' });
    }
});

module.exports = router;