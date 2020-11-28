const Pool = require ("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    // host: "localhost",
    host:"db_postgres",
    database: "flora_uno",
    port: 5432
});

module.exports=pool;