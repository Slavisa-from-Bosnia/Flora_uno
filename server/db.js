const Pool = require ("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Slavisa4",
    host: "localhost",
    database: "flora_uno",
    port: 5432
});

module.exports=pool;