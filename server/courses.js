const express = require('express');
const router = express.Router();
const db = require('./database');

    //маршрут для получения всех курсов
    router.get('/courses', (req, res) => {
        db.query('SELECT courses.*, language.language_url FROM courses LEFT JOIN language ON courses.language_id = language.id', (error, result) => {
            if (error) {
                res.status(500).json({error:'Ошибка сервера'});
                return;
            }
            res.send(JSON.stringify(result.rows));
        });
    });

router.get('/courses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const news = await db.query('SELECT * FROM courseinfo WHERE id = $1', [id]);

        if (news.rowCount === 0) {
            return res.status(404).send('Курс не найден');
        }

        res.json(news.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка');
    }
});

module.exports = router;
