const express = require('express');
const router = express.Router();
const db = require('./database');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

router.post('/save-setting', async (req, res) => {
    const data = req.body;
    const user_id = data.user_id;

    try {
        const result = await db.query('SELECT * FROM personal_data WHERE user_id=$1', [user_id]);

        if (result.rowCount > 0) {
            await db.query('UPDATE personal_data SET first_name=$1, last_name=$2, gender=$3, phone=$4, birth_date=$5 WHERE user_id=$6', [data.firstName, data.lastName, data.gender, data.phone, data.birthdate, user_id]);
        } else {
            await db.query('INSERT INTO personal_data (user_id, first_name, last_name, gender, phone, birth_date) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, data.firstName, data.lastName, data.gender, data.phone, data.birthdate]);
        }

        const personal_data = await db.query('SELECT * FROM personal_data WHERE user_id=$1', [user_id])

        const user = {
            id: user_id,
            personal_data: personal_data.rows[0]
        }
        const accessToken = jwt.sign(user, 'key', { expiresIn: '10m'});

        res.status(200).json({ message: 'Данные успешно обновленны', accessToken});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', 'public', 'assets', 'user_img'));
  },      
  filename: function (req, file, cb) {
      const ext = file.originalname.split('.').pop();
      cb(null, Date.now() + '-' + file.fieldname + '.' + ext);
  },   
});

const upload = multer({ storage: storage });

router.post('/upload-photo', upload.single('file'), async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'key');
      const fileUrl = path.join('/assets/user_img', req.file.filename);
      const user_id = decodedToken.id;
      
  
      await db.query('UPDATE personal_data SET user_img=$1 WHERE user_id=$2', [fileUrl, user_id]);

      const personal_data = await db.query('SELECT * FROM personal_data WHERE user_id=$1', [user_id])

      const user = {
          id: user_id,
          personal_data: personal_data.rows[0]
      }
      const accessToken = jwt.sign(user, 'key', { expiresIn: '10m'});
  
      res.status(200).json({ message: 'Фото успешно загружено', accessToken});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка загрузки фото' });
    }
  });

module.exports = router;