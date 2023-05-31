const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'de2.localto.net',
    database: 'Enschool',
    password: '123',
    port: 46035
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}