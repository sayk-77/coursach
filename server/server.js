const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./auth'));
app.use(require('./registr'));
app.use(require('./news'));
app.use(require('./courses'));
app.use(require('./addCourse'));
app.use(require('./profileCourse'));
app.use(require('./save-setting'));
app.use(require('./admin'));
app.use(require('./reviews'));
app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});