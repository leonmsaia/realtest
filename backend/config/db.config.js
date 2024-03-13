const { Pool } = require('pg');

const pool = new Pool({
    user: 'myuser',
    host: 'database',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432,
});


module.exports = pool;