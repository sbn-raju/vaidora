const pkg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = pkg;



const pool = new Pool({
    host:process.env.DB_HOSTNAME,
    user:process.env.DB_USER_NAME,
    port:process.env.DB_PORT,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});


async function connection(){
    try {
        await pool.connect();
        console.log("Database Successfully Connected");
    } catch (error) {
        console.log("Database not connected")
        console.log(error)
    }
}

module.exports = {
    connection,
    pool
};
