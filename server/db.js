const Pool = require ("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgresslavisa8",
    // host: "localhost",
    host:"pgdb",
    database: "flora_uno",
    port: 5432
});

module.exports=pool;