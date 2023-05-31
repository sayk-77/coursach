const express = require('express');
const router = express.Router();
const db = require('./database');

router.post('/profileCourse', async (req, res) => {
    const user_id = req.body.user_id;

    try {
        const result = await db.query(
            'SELECT courses.cours_lvl, language.language_url, courses.cours_duration, courses.course_price FROM courses INNER JOIN language ON courses.language_id = language.id WHERE courses.id IN (SELECT course_id FROM user_courses WHERE user_id = $1)',
            [user_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
