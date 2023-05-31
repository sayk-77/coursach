const express = require("express");
const router = express.Router();
const db = require("./database");
const multer = require('multer');
const path = require('path');

router.get("/fetchStudent", async (req, res) => {
    try {
        const students = await db.query("SELECT * FROM personal_data");
        if (students.rowCount === 0) {
            res.json({ message: "Студентов не найдено" });
            return;
        }

        res.json(students.rows);
    } catch (error) {
        console.log(error);
        res.json({ message: "Произошла ошибка" });
    }
});

router.get("/user-info/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.query(
            "SELECT * FROM personal_data where id = $1",
            [id]
        );

        if (user.rowCount == 0) {
            res.json({ message: "Пользователь не найден" });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.log(error);
        res.json({ error: "Ошибка на сервере" });
    }
});

router.post("/user-info/course", async (req, res) => {
    const user_id = req.body.user_id;
    try {
        const courses = await db.query(
            "SELECT courses.cours_lvl, language.language_url, courses.cours_duration, courses.course_price FROM courses INNER JOIN language ON courses.language_id = language.id WHERE courses.id IN (SELECT course_id FROM user_courses WHERE user_id = $1)",
            [user_id]
        );

        if (courses.rowCount === 0) {
            res.json({ message: "Курсов нет" });
        } else {
            res.json(courses.rows);
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error });
    }
});

router.delete("/courses/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.query("DELETE FROM courses WHERE id = $1", [
            id,
        ]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: "Курс не найден" });
        } else {
            res.json({ message: "Курс успешно удален" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ошибка на сервере" });
    }
});

router.delete("/news/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.query("DELETE FROM news WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: "Новость не найдена" });
        } else {
            res.json({ message: "Новость успешно удалена" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ошибка на сервере" });
    }
});

router.post("/fetchReviews", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT reviews.*, personal_data.user_img, personal_data.first_name, courses.cours_lvl, language.language_url FROM reviews JOIN personal_data ON reviews.user_id = personal_data.user_id JOIN courses ON reviews.course_id = courses.id JOIN language ON courses.language_id = language.id"
        );
        res.send(JSON.stringify(result.rows));
    } catch (error) {
        console.log(error);
    }
});

router.delete("/reviews/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.query("DELETE FROM reviews WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: "Коментарий не найден" });
        } else {
            res.json({ message: "Коментарий удален" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ошибка на сервере" });
    }
});

router.post("/addCourseAdmin", async(req, res) => {
    const data = req.body;
    try {
        await db.query('INSERT INTO courses (cours_lvl, cours_duration, course_price, language_id) VALUES ($1, $2, $3, $4)', [data.language_lvl, data.duration, data.price, data.language]);
        await db.query('INSERT INTO courseinfo (title, included, additionally) VALUES ($1, $2, $3)', [data.title, data.included, data.additionaly]);
        
        res.status(200).json({message: 'Курс добавлен'});
    } catch (error) {
        console.log(error);
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'public', 'assets', 'news-image'));
    },      
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, Date.now() + '-' + file.fieldname + '.' + ext);
    },   
  });
  
  const upload = multer({ storage: storage });

router.post("/addNew", upload.single('photo'), async(req, res) => {
    try {
        const { title, subtitle, mainText } = req.body;
        const fileUrl = path.join('/assets/news-image', req.file.filename);

        await db.query('INSERT INTO news (title, subtitle, img_url, content) VALUES ($1, $2, $3, $4)', [title, subtitle, fileUrl, mainText]);
        res.status(200).json('Новость добавлена');

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
