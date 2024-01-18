require('dotenv').config({ path: '../.env' });
const sql = require('mysql');

const db = sql.createConnection({
    host: process.env.MYSQL_HOST ?? '163.5.142.26',
    port: process.env.MYSQL_PORT ?? 3306,
    user: process.env.MYSQL_USER ?? 'sase5JUV',
    password: process.env.MYSQL_PASSWORD ?? 'JulesUgoVictor',
    database: process.env.MYSQL_DATABASE ?? 'sae5juv',
});

module.exports = db;