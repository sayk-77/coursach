const express = require('express');
const router = express.Router();
const db = require('./database');

router.post('/addCourse', async (req,res) =>{
    const user_id  = req.body.user_id;
    const course_id  = req.body.course_id;
    
    try {
        const result = await db.query('INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)',
            [user_id, course_id]);
        res.status(200).json({message: "Курс добавлен"});
    } catch (error) {
        res.status(500).json({error : "Ошибка сервера"});
    }
});





module.exports = router;