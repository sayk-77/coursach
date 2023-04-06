const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./auth');
app.use('/', authRoutes);

app.use(require('./registr'));

//маршрут для получения данных для новостей из базы данных
app.get('/news', (req, res) => {
    db.query('SELECT * FROM news', (error, results) => {
        if (error) {
            throw error;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results.rows));
    });
});

//маршрут для получения всех курсов
app.get('/courses', (req, res) => {
    db.query('SELECT * FROM courses', (error, result) => {
        if (error) {
            console.error('Ошибка при получении курсов:', error);
            res.status(500).send('Ошибка сервера');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows));
    });
});


// Запуск сервера
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});