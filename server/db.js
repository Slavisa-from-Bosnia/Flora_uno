const Pool = require ("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Slavisa4",
    host: "localhost",
    database: "flora_uno"
});

module.exports=pool;