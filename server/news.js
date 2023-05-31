const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/news', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM news');
        res.send(JSON.stringify(results.rows));
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Ошибка'});
    }
});

router.get('/news/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const news = await db.query('SELECT * FROM news WHERE id = $1', [id]);
        if (news.rowCount === 0) {
            return res.status(404).json({error: 'Новость не найдена'});
        }
        res.json(news.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Ошибка'});
    }
});


module.exports = router;
